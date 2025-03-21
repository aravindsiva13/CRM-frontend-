// src/components/tasks/TaskDetailsPanel.jsx
import React, { useState } from 'react';
import { 
  X, CheckSquare, Bell, Repeat, Link, 
  Edit, Calendar, Clock, CheckCircle, 
  Plus, User, Briefcase, Tag
} from 'lucide-react';

const TaskDetailsPanel = ({
  task,
  onClose,
  onComplete,
  onEdit,
  onAddReminder,
  getTaskTypeIcon,
  getPriorityColor,
  getStatusColor,
  isOverdue,
  getTaskDependencies,
  tasks,
  formatDate
}) => {
  const [noteText, setNoteText] = useState('');
  
  const handleAddNote = () => {
    if (!noteText.trim()) return;
    
    // In a real app, you would send this to your API
    console.log('Adding note to task:', task.id, noteText);
    setNoteText('');
  };
  
  const taskDependencies = getTaskDependencies(task.id);
  
  return (
    <div className="fixed inset-0 overflow-hidden z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                    Task Details
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        {getTaskTypeIcon(task.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <div className="mt-1 flex space-x-2">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Description</dt>
                          <dd className="mt-1 text-sm text-gray-900">{task.description}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                          <dd className="mt-1 text-sm text-gray-900 flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-1" />
                            {task.assignedTo}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Type</dt>
                          <dd className="mt-1 text-sm text-gray-900 flex items-center">
                            {getTaskTypeIcon(task.type)}
                            <span className="ml-1">{task.type}</span>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Category</dt>
                          <dd className="mt-1 text-sm text-gray-900 flex items-center">
                            <Tag className="h-4 w-4 text-gray-400 mr-1" />
                            {task.category || 'Uncategorized'}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            {isOverdue(task.dueDate) && task.status !== 'Completed' ? (
                              <span className="text-red-600 font-medium">
                                Overdue: {formatDate(task.dueDate)}
                              </span>
                            ) : (
                              <span>
                                {formatDate(task.dueDate)}
                              </span>
                            )}
                          </dd>
                        </div>
                        
                        {task.estimatedTime && (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Estimated Time</dt>
                            <dd className="mt-1 text-sm text-gray-900 flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              {task.estimatedTime} minutes
                            </dd>
                          </div>
                        )}
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Created</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {formatDate(task.createdAt)} by {task.createdBy || 'You'}
                          </dd>
                        </div>
                        
                        {task.relatedToName && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Related To</dt>
                            <dd className="mt-1 text-sm text-gray-900 flex items-center">
                              <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                              {task.relatedToName} ({task.relatedTo})
                            </dd>
                          </div>
                        )}
                        
                        {/* Recurring information */}
                        {task.isRecurring && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Recurrence</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <div className="flex items-center">
                                <Repeat className="h-4 w-4 text-indigo-500 mr-1" />
                                <span>
                                  {task.recurringPattern === 'daily' && `Every ${task.recurringEvery > 1 ? task.recurringEvery + ' days' : 'day'}`}
                                  {task.recurringPattern === 'weekly' && `Every ${task.recurringEvery > 1 ? task.recurringEvery + ' weeks' : 'week'}`}
                                  {task.recurringPattern === 'monthly' && `Every ${task.recurringEvery > 1 ? task.recurringEvery + ' months' : 'month'}`}
                                  {task.recurringPattern === 'yearly' && `Every ${task.recurringEvery > 1 ? task.recurringEvery + ' years' : 'year'}`}
                                  {task.recurringEndDate && ` until ${formatDate(task.recurringEndDate)}`}
                                  {task.recurringCount > 0 && ` for ${task.recurringCount} occurrences`}
                                </span>
                              </div>
                            </dd>
                          </div>
                        )}
                        
                        {/* Task dependencies */}
                        {taskDependencies.length > 0 && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Dependencies</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <ul className="space-y-1">
                                {taskDependencies.map(dep => {
                                  const dependentTask = tasks.find(t => t.id === dep.dependsOnTaskId);
                                  return dependentTask ? (
                                    <li key={dep.id} className="flex items-center">
                                      <Link className="h-4 w-4 text-indigo-500 mr-1" />
                                      <span>{dependentTask.title}</span>
                                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                        dependentTask.status === 'Completed' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-orange-100 text-orange-800'
                                      }`}>
                                        {dependentTask.status}
                                      </span>
                                    </li>
                                  ) : null;
                                })}
                              </ul>
                            </dd>
                          </div>
                        )}
                        
                        {/* Tags */}
                        {task.tags && task.tags.length > 0 && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Tags</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <div className="flex flex-wrap gap-1">
                                {task.tags.map(tag => (
                                  <span 
                                    key={tag} 
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </dd>
                          </div>
                        )}
                        
                        {/* Reminders */}
                        {task.reminderEnabled && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Reminder</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <div className="flex items-center">
                                <Bell className="h-4 w-4 text-indigo-500 mr-1" />
                                <span>
                                  {task.reminderTime} {task.reminderUnit} before due date
                                  {task.reminderMethod && ` via ${task.reminderMethod === 'app' ? 'app notification' : 
                                                           task.reminderMethod === 'email' ? 'email' : 
                                                           'app and email'}`}
                                </span>
                              </div>
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    <div className="border-t border-gray-200 py-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Notes & Updates</h4>
                        {!task.reminderEnabled && task.status !== 'Completed' && (
                          <button
                            type="button"
                            onClick={() => onAddReminder(task.id)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Bell className="mr-1 h-3 w-3" />
                            Add Reminder
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {task.notes ? (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start">
                              <div className="ml-3">
                                <p className="text-sm text-gray-700">
                                  {task.notes}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500">No notes added yet.</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <label htmlFor="task-note" className="sr-only">Add Note</label>
                        <textarea
                          id="task-note"
                          name="task-note"
                          rows="3"
                          className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Add a note..."
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                        <div className="mt-2 flex justify-end">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleAddNote}
                          >
                            Add Note
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between space-x-3">
                  <button
                    type="button"
                    className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {task.status !== 'Completed' ? (
                    <button
                      type="button"
                      className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => onComplete(task.id)}
                    >
                      <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
                      Mark Complete
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => onEdit(task)}
                    >
                      <Edit className="-ml-1 mr-2 h-4 w-4" />
                      Edit Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPanel;