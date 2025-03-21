// src/components/tasks/TaskBoardView.jsx
import React from 'react';
import { 
  Clock, Repeat, Bell, Link, AlertCircle 
} from 'lucide-react';

const TaskBoardView = ({
  tasks,
  onTaskClick,
  getTaskTypeIcon,
  getPriorityColor,
  isOverdue,
  hasActiveDependencies,
  formatDate
}) => {
  // Group tasks by status
  const statusGroups = {
    'Open': tasks.filter(task => task.status === 'Open'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Completed': tasks.filter(task => task.status === 'Completed'),
    'Deferred': tasks.filter(task => task.status === 'Deferred')
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Object.entries(statusGroups).map(([status, statusTasks]) => (
        <div key={status} className="bg-white shadow rounded-lg flex flex-col">
          <div className={`px-4 py-3 border-b border-gray-200 rounded-t-lg ${
            status === 'Open' ? 'bg-blue-50' : 
            status === 'In Progress' ? 'bg-yellow-50' : 
            status === 'Completed' ? 'bg-green-50' : 'bg-gray-50'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">{status}</h3>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-gray-500 bg-gray-200 rounded-full">
                {statusTasks.length}
              </span>
            </div>
          </div>
          <div className="p-2 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {statusTasks.length > 0 ? (
              <div className="space-y-2">
                {statusTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="bg-white border border-gray-200 rounded p-3 shadow-sm hover:shadow cursor-pointer"
                    onClick={() => onTaskClick(task)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getTaskTypeIcon(task.type)}
                        <h4 className="text-sm font-medium ml-2 line-clamp-1">{task.title}</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{task.description}</p>
                    
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className={isOverdue(task.dueDate) && status !== 'Completed' ? 'text-red-600 font-medium' : ''}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">{task.assignedTo}</span>
                      </div>
                    </div>
                    
                    {/* Task indicators */}
                    {(task.isRecurring || task.reminderEnabled || hasActiveDependencies(task.id)) && (
                      <div className="mt-2 flex items-center space-x-2 text-xs">
                        {task.isRecurring && (
                          <div className="flex items-center text-indigo-500">
                            <Repeat className="h-3 w-3 mr-1" />
                            <span>Recurring</span>
                          </div>
                        )}
                        
                        {task.reminderEnabled && (
                          <div className="flex items-center text-indigo-500">
                            <Bell className="h-3 w-3 mr-1" />
                            <span>Reminder</span>
                          </div>
                        )}
                        
                        {hasActiveDependencies(task.id) && (
                          <div className="flex items-center text-orange-500">
                            <Link className="h-3 w-3 mr-1" />
                            <span>Dependencies</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Task category tags if available */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {task.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-gray-500">No tasks</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoardView;