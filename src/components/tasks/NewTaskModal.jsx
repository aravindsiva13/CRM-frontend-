// src/components/NewTaskModal.jsx
import React, { useState } from 'react';
import { X, ChevronDown, Calendar, Clock, User, Tag, Repeat, Bell, Link } from 'lucide-react';

const NewTaskModal = ({ taskForm, onClose, onChange, onSave, categories, teamMembers, tasks, isLoading }) => {
  const [showRecurringOptions, setShowRecurringOptions] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [showDependenciesOptions, setShowDependenciesOptions] = useState(false);
  
  const handleChange = (e) => {
    onChange(e);
  };
  
  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {taskForm.id ? 'Edit Task' : 'New Task'}
                  </h3>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form className="space-y-4">
                  {/* Task Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={taskForm.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  {/* Task Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows="3"
                      value={taskForm.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  
                  {/* Task Type and Priority row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <select
                        name="type"
                        id="type"
                        value={taskForm.type}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Call">Call</option>
                        <option value="Email">Email</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Demo">Demo</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <select
                        name="priority"
                        id="priority"
                        value={taskForm.priority}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Status and Assigned To row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={taskForm.status}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Deferred">Deferred</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                        Assigned To
                      </label>
                      <select
                        name="assignedTo"
                        id="assignedTo"
                        value={taskForm.assignedTo}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {teamMembers.map(member => (
                          <option key={member} value={member}>{member}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Due Date and Time row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="dueDate"
                          id="dueDate"
                          value={taskForm.dueDate}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700">
                        Due Time
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="time"
                          name="dueTime"
                          id="dueTime"
                          value={taskForm.dueTime}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={taskForm.category}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Advanced Options */}
                  <div className="space-y-3">
                    {/* Recurring Options */}
                    <div>
                      <button
                        type="button"
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                        onClick={() => setShowRecurringOptions(!showRecurringOptions)}
                      >
                        <Repeat className="h-4 w-4 mr-1" />
                        {showRecurringOptions ? 'Hide recurring options' : 'Set as recurring task'}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showRecurringOptions ? 'transform rotate-180' : ''}`} />
                      </button>
                      
                      {showRecurringOptions && (
                        <div className="mt-2 pl-5 space-y-3">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="isRecurring"
                              id="isRecurring"
                              checked={taskForm.isRecurring}
                              onChange={handleChange}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-700">
                              This is a recurring task
                            </label>
                          </div>
                          
                          {taskForm.isRecurring && (
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-700">Repeat every</span>
                                <input
                                  type="number"
                                  name="recurringEvery"
                                  min="1"
                                  value={taskForm.recurringEvery}
                                  onChange={handleChange}
                                  className="inline-block w-16 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <select
                                  name="recurringPattern"
                                  value={taskForm.recurringPattern}
                                  onChange={handleChange}
                                  className="inline-block bg-white border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option value="daily">day(s)</option>
                                  <option value="weekly">week(s)</option>
                                  <option value="monthly">month(s)</option>
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-sm text-gray-700">End recurrence</label>
                                <div className="mt-1 space-y-2">
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      id="neverEnd"
                                      name="recurringEndType"
                                      value="never"
                                      checked={!taskForm.recurringEndDate && !taskForm.recurringCount}
                                      onChange={() => {
                                        onChange({
                                          target: {
                                            name: 'recurringEndDate',
                                            value: '',
                                            type: 'text'
                                          }
                                        });
                                        onChange({
                                          target: {
                                            name: 'recurringCount',
                                            value: 0,
                                            type: 'number'
                                          }
                                        });
                                      }}
                                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <label htmlFor="neverEnd" className="ml-2 block text-sm text-gray-700">
                                      Never
                                    </label>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      id="endByDate"
                                      name="recurringEndType"
                                      value="date"
                                      checked={!!taskForm.recurringEndDate}
                                      onChange={() => {
                                        // Set a default end date 30 days from now if not set
                                        if (!taskForm.recurringEndDate) {
                                          const date = new Date();
                                          date.setDate(date.getDate() + 30);
                                          onChange({
                                            target: {
                                              name: 'recurringEndDate',
                                              value: date.toISOString().split('T')[0],
                                              type: 'text'
                                            }
                                          });
                                        }
                                        onChange({
                                          target: {
                                            name: 'recurringCount',
                                            value: 0,
                                            type: 'number'
                                          }
                                        });
                                      }}
                                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <label htmlFor="endByDate" className="ml-2 block text-sm text-gray-700">
                                      On date
                                    </label>
                                    {!!taskForm.recurringEndDate && (
                                      <input
                                        type="date"
                                        name="recurringEndDate"
                                        value={taskForm.recurringEndDate}
                                        onChange={handleChange}
                                        className="ml-2 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      id="endByCount"
                                      name="recurringEndType"
                                      value="count"
                                      checked={!!taskForm.recurringCount}
                                      onChange={() => {
                                        onChange({
                                          target: {
                                            name: 'recurringEndDate',
                                            value: '',
                                            type: 'text'
                                          }
                                        });
                                        if (!taskForm.recurringCount) {
                                          onChange({
                                            target: {
                                              name: 'recurringCount',
                                              value: 10,
                                              type: 'number'
                                            }
                                          });
                                        }
                                      }}
                                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <label htmlFor="endByCount" className="ml-2 block text-sm text-gray-700">
                                      After
                                    </label>
                                    {!!taskForm.recurringCount && (
                                      <input
                                        type="number"
                                        name="recurringCount"
                                        min="1"
                                        value={taskForm.recurringCount}
                                        onChange={handleChange}
                                        className="ml-2 w-16 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    )}
                                    {!!taskForm.recurringCount && (
                                      <span className="ml-2 text-sm text-gray-700">occurrences</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Reminder Options */}
                    <div>
                      <button
                        type="button"
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                        onClick={() => setShowReminderOptions(!showReminderOptions)}
                      >
                        <Bell className="h-4 w-4 mr-1" />
                        {showReminderOptions ? 'Hide reminder options' : 'Set reminder'}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showReminderOptions ? 'transform rotate-180' : ''}`} />
                      </button>
                      
                      {showReminderOptions && (
                        <div className="mt-2 pl-5 space-y-3">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="reminderEnabled"
                              id="reminderEnabled"
                              checked={taskForm.reminderEnabled}
                              onChange={handleChange}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="reminderEnabled" className="ml-2 block text-sm text-gray-700">
                              Enable reminder
                            </label>
                          </div>
                          
                          {taskForm.reminderEnabled && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-700">Remind</span>
                              <input
                                type="number"
                                name="reminderTime"
                                min="1"
                                value={taskForm.reminderTime}
                                onChange={handleChange}
                                className="inline-block w-16 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                              <select
                                name="reminderUnit"
                                value={taskForm.reminderUnit}
                                onChange={handleChange}
                                className="inline-block bg-white border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value="minutes">minutes</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                              </select>
                              <span className="text-sm text-gray-700">before due time</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onSave}
              disabled={isLoading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;