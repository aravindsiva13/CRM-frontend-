// src/components/tasks/TaskCalendarView.jsx
import React from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar,
  Bell, Repeat, Link, AlertCircle
} from 'lucide-react';

const TaskCalendarView = ({
  tasks,
  currentDate,
  view,
  onDateChange,
  onViewChange,
  onTaskClick,
  getTaskTypeIcon,
  isOverdue
}) => {
  // Helper functions for calendar rendering
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const getWeekDays = () => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  };
  
  const getDaysForWeekView = (date) => {
    const result = [];
    const day = date.getDay();
    
    // Get the first day of the week (Sunday)
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() - day);
    
    // Create an array of 7 days
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(firstDay);
      currentDay.setDate(firstDay.getDate() + i);
      result.push(currentDay);
    }
    
    return result;
  };
  
  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      return taskDate === dateString;
    });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };
  
  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };
  
  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    onDateChange(newDate);
  };
  
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    onDateChange(newDate);
  };
  
  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };
  
  const handleToday = () => {
    onDateChange(new Date());
  };
  
  // Render the month view calendar
  const renderMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const weekDays = getWeekDays();
    
    // Create calendar grid
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border-t border-l border-gray-200 bg-gray-50"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === today.toDateString();
      const dayTasks = getTasksForDate(date);
      
      days.push(
        <div 
          key={dateString} 
          className={`h-32 border-t border-l border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-white'} p-2 overflow-y-auto`}
        >
          <div className="font-medium text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {dayTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => onTaskClick(task)}
                className={`text-xs p-1 rounded cursor-pointer flex items-center truncate ${
                  task.status === 'Completed' ? 'bg-green-50 text-green-800' : 
                  isOverdue(task.dueDate) ? 'bg-red-50 text-red-800' : 'bg-indigo-50 text-indigo-800'
                }`}
              >
                {getTaskTypeIcon(task.type)}
                <span className="ml-1 truncate">{task.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="mt-4">
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 border-b border-gray-200 pb-1">
          {weekDays.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-r border-b border-gray-200">
          {days}
        </div>
      </div>
    );
  };
  
  // Render the week view calendar
  const renderWeek = () => {
    const weekDays = getDaysForWeekView(currentDate);
    const weekDayLabels = getWeekDays();
    const today = new Date();
    
    return (
      <div className="mt-4">
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 border-b border-gray-200 pb-1">
          {weekDayLabels.map((day, index) => (
            <div key={day} className="font-medium">
              <div>{day}</div>
              <div className="mt-1 text-sm text-gray-900">
                {weekDays[index].getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-r border-b border-gray-200">
          {weekDays.map((date, index) => {
            const isToday = date.toDateString() === today.toDateString();
            const dayTasks = getTasksForDate(date);
            
            return (
              <div
                key={index}
                className={`min-h-40 border-t border-l border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-white'} p-2 overflow-y-auto`}
              >
                <div className="space-y-1">
                  {dayTasks.map(task => (
                    <div 
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className={`text-xs p-2 rounded cursor-pointer ${
                        task.status === 'Completed' ? 'bg-green-50 text-green-800' : 
                        isOverdue(task.dueDate) ? 'bg-red-50 text-red-800' : 'bg-indigo-50 text-indigo-800'
                      }`}
                    >
                      <div className="flex items-center">
                        {getTaskTypeIcon(task.type)}
                        <span className="ml-1 font-medium">{task.title}</span>
                      </div>
                      <div className="mt-1 truncate">{task.description}</div>
                      <div className="mt-1 flex items-center space-x-1">
                        <span className="text-xs">
                          {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {task.isRecurring && <Repeat className="h-3 w-3" />}
                        {task.reminderEnabled && <Bell className="h-3 w-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render the day view calendar
  const renderDay = () => {
    const date = new Date(currentDate);
    const dayTasks = getTasksForDate(date);
    const isToday = date.toDateString() === new Date().toDateString();
    
    // Sort tasks by due time
    const sortedTasks = [...dayTasks].sort((a, b) => {
      const timeA = a.dueTime || '00:00';
      const timeB = b.dueTime || '00:00';
      return timeA.localeCompare(timeB);
    });
    
    return (
      <div className="mt-4">
        <div className={`p-4 ${isToday ? 'bg-blue-50' : 'bg-white'} border border-gray-200 rounded-lg`}>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          
          {sortedTasks.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {sortedTasks.map(task => (
                <div 
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className={`py-3 cursor-pointer group hover:bg-gray-50 ${
                    task.status === 'Completed' ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getTaskTypeIcon(task.type)}
                      <span className="ml-2 font-medium text-gray-900">{task.title}</span>
                      {task.isRecurring && (
                        <Repeat className="ml-2 h-4 w-4 text-indigo-500" title="Recurring task" />
                      )}
                      {task.reminderEnabled && (
                        <Bell className="ml-2 h-4 w-4 text-indigo-500" title="Reminder set" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {task.dueTime || '—'}
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{task.description}</div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span>Assigned to: {task.assignedTo}</span>
                    <span className="mx-2">•</span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      isOverdue(task.dueDate) ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">No tasks are scheduled for this day.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {view === 'month' 
              ? currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
              : view === 'week'
                ? `Week of ${formatDate(getDaysForWeekView(currentDate)[0])}`
                : currentDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
            }
          </h3>
        </div>
        <div className="flex space-x-2">
          <button 
            className="px-2 py-1 border border-gray-300 rounded-md"
            onClick={view === 'month' ? handlePreviousMonth : view === 'week' ? handlePreviousWeek : handlePreviousDay}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="px-2 py-1 border border-gray-300 rounded-md"
            onClick={handleToday}
          >
            Today
          </button>
          <button
            className="px-2 py-1 border border-gray-300 rounded-md"
            onClick={view === 'month' ? handleNextMonth : view === 'week' ? handleNextWeek : handleNextDay}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="border-l border-gray-300 ml-2 pl-2">
            <button
              className={`px-2 py-1 ${view === 'day' ? 'bg-indigo-100 text-indigo-800' : 'bg-white'} border border-gray-300 rounded-l-md`}
              onClick={() => onViewChange('day')}
            >
              Day
            </button>
            <button
              className={`px-2 py-1 ${view === 'week' ? 'bg-indigo-100 text-indigo-800' : 'bg-white'} border-t border-b border-gray-300`}
              onClick={() => onViewChange('week')}
            >
              Week
            </button>
            <button
              className={`px-2 py-1 ${view === 'month' ? 'bg-indigo-100 text-indigo-800' : 'bg-white'} border border-gray-300 rounded-r-md`}
              onClick={() => onViewChange('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      
      {view === 'month' && renderMonth()}
      {view === 'week' && renderWeek()}
      {view === 'day' && renderDay()}
    </div>
  );
};

export default TaskCalendarView;