// src/components/tasks/TaskStatistics.jsx
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  CheckSquare, Clock, Users, Award, TrendingUp, Flag
} from 'lucide-react';

const TaskStatistics = ({ statistics }) => {
  const { byCategory, byUser, timeline } = statistics;
  
  // Colors for charts
  const COLORS = ['#6366F1', '#EC4899', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
  
  // Generate summary statistics
  const generateSummary = () => {
    // Calculate total tasks
    const totalTasks = byUser.reduce((sum, user) => sum + user.completed + user.pending + user.overdue, 0);
    
    // Calculate completed tasks
    const completedTasks = byUser.reduce((sum, user) => sum + user.completed, 0);
    
    // Calculate overdue tasks
    const overdueTasks = byUser.reduce((sum, user) => sum + user.overdue, 0);
    
    // Calculate completion rate
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Calculate tasks created today
    const createdToday = timeline.length > 0 ? timeline[timeline.length - 1].created : 0;
    
    // Calculate tasks completed today
    const completedToday = timeline.length > 0 ? timeline[timeline.length - 1].completed : 0;
    
    return {
      totalTasks,
      completedTasks,
      overdueTasks,
      completionRate,
      createdToday,
      completedToday
    };
  };
  
  const summary = generateSummary();

  return (
    <div className="space-y-6">
      {/* Summary statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <CheckSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Tasks</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{summary.totalTasks}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Tasks</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{summary.completedTasks}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Overdue Tasks</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{summary.overdueTasks}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{summary.completionRate}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Flag className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Created Today</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{summary.createdToday}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Today</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{summary.completedToday}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Tasks by Category */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Tasks by Category</h3>
            <div className="mt-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="category"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {byCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, "Count"]}
                    labelFormatter={(value) => byCategory.find(item => item.category === value)?.category || ""}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Task Timeline */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Task Activity (Last 30 Days)</h3>
            <div className="mt-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={timeline}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString();
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="created" 
                    name="Created" 
                    stroke="#6366F1" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    name="Completed" 
                    stroke="#10B981" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      {/* Task Completion by User */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Task Distribution by User</h3>
          <div className="mt-2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={byUser}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed" stackId="a" fill="#10B981" />
                <Bar dataKey="pending" name="In Progress" stackId="a" fill="#6366F1" />
                <Bar dataKey="overdue" name="Overdue" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Additional insights section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Insights</h3>
            <div className="mt-4 divide-y divide-gray-200">
              <div className="py-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-500">Task Completion Rate</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    summary.completionRate >= 70 ? 'bg-green-100 text-green-800' : 
                    summary.completionRate >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {summary.completionRate}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      summary.completionRate >= 70 ? 'bg-green-600' : 
                      summary.completionRate >= 50 ? 'bg-yellow-400' : 
                      'bg-red-600'
                    }`} 
                    style={{ width: `${summary.completionRate}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {summary.completionRate >= 70 ? 'Great job! Your team is completing tasks efficiently.' : 
                   summary.completionRate >= 50 ? 'Moderate performance. Consider reviewing task allocation.' : 
                   'Low completion rate. Team might be overloaded or facing blockers.'}
                </p>
              </div>
              
              <div className="py-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-500">Overdue Rate</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    summary.overdueTasks / summary.totalTasks <= 0.1 ? 'bg-green-100 text-green-800' : 
                    summary.overdueTasks / summary.totalTasks <= 0.2 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {summary.totalTasks > 0 ? Math.round((summary.overdueTasks / summary.totalTasks) * 100) : 0}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {summary.totalTasks > 0 && summary.overdueTasks / summary.totalTasks <= 0.1 ? 
                    'Very few overdue tasks. Team is maintaining good deadlines.' : 
                   summary.totalTasks > 0 && summary.overdueTasks / summary.totalTasks <= 0.2 ? 
                    'Some tasks are overdue. Consider prioritizing these.' : 
                    'High number of overdue tasks. Review deadlines and capacity.'}
                </p>
              </div>
              
              <div className="py-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-500">Activity Trend</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Last 7 Days
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {timeline.length >= 7 && 
                    timeline.slice(-7).reduce((sum, day) => sum + day.completed, 0) > 
                    timeline.slice(-14, -7).reduce((sum, day) => sum + day.completed, 0) ? 
                    'Positive trend - Task completion has increased in the last week.' : 
                    'Task completion is down compared to the previous week.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Productivity Tips</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex">
                <div className="flex-shrink-0">
                  <CheckSquare className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Break down complex tasks</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Consider splitting large tasks into smaller, more manageable subtasks for better tracking.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Set realistic deadlines</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Avoid overdue tasks by allocating sufficient time for completion and considering dependencies.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Balance workload across team</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {byUser.length > 0 && 
                     Math.max(...byUser.map(u => u.pending + u.overdue)) / 
                     Math.min(...byUser.map(u => u.pending + u.overdue)) > 2 ?
                     'Current workload is unevenly distributed. Consider rebalancing tasks among team members.' :
                     'Task distribution looks balanced. Continue monitoring for optimal productivity.'}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;