// src/components/email/EmailDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Mail, Eye, Clock, ArrowUp, ArrowDown, 
  Filter, Download, Calendar, RefreshCw,
  Send, Inbox, Star, AlertTriangle
} from 'lucide-react';

const EmailDashboard = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [isLoading, setIsLoading] = useState(true);
  const [emailStats, setEmailStats] = useState(null);
  const [emailVolume, setEmailVolume] = useState([]);
  const [openRates, setOpenRates] = useState([]);
  const [emailsByCategory, setEmailsByCategory] = useState([]);
  const [topTemplates, setTopTemplates] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch email statistics
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for the dashboard
      const stats = {
        totalSent: 2456,
        totalOpened: 1845,
        openRate: 75.1,
        averageResponseTime: '3.2 hours',
        bounceRate: 1.2,
        clickThroughRate: 24.5
      };
      
      const volumeData = [
        { date: '2023-08-01', sent: 68, opened: 49, replied: 23 },
        { date: '2023-08-02', sent: 72, opened: 53, replied: 28 },
        { date: '2023-08-03', sent: 65, opened: 50, replied: 21 },
        { date: '2023-08-04', sent: 58, opened: 42, replied: 18 },
        { date: '2023-08-05', sent: 48, opened: 35, replied: 15 },
        { date: '2023-08-06', sent: 42, opened: 32, replied: 13 },
        { date: '2023-08-07', sent: 76, opened: 58, replied: 32 },
        { date: '2023-08-08', sent: 84, opened: 65, replied: 36 },
        { date: '2023-08-09', sent: 89, opened: 71, replied: 40 },
        { date: '2023-08-10', sent: 92, opened: 74, replied: 42 },
        { date: '2023-08-11', sent: 88, opened: 69, replied: 38 },
        { date: '2023-08-12', sent: 75, opened: 59, replied: 31 },
        { date: '2023-08-13', sent: 62, opened: 48, replied: 25 },
        { date: '2023-08-14', sent: 90, opened: 72, replied: 39 },
        { date: '2023-08-15', sent: 95, opened: 78, replied: 43 },
        { date: '2023-08-16', sent: 97, opened: 80, replied: 46 },
        { date: '2023-08-17', sent: 94, opened: 77, replied: 41 },
        { date: '2023-08-18', sent: 88, opened: 73, replied: 37 },
        { date: '2023-08-19', sent: 76, opened: 61, replied: 33 },
        { date: '2023-08-20', sent: 65, opened: 52, replied: 27 },
        { date: '2023-08-21', sent: 82, opened: 67, replied: 34 },
        { date: '2023-08-22', sent: 87, opened: 71, replied: 37 },
        { date: '2023-08-23', sent: 91, opened: 74, replied: 39 },
        { date: '2023-08-24', sent: 93, opened: 76, replied: 42 },
        { date: '2023-08-25', sent: 95, opened: 79, replied: 44 },
        { date: '2023-08-26', sent: 85, opened: 70, replied: 38 },
        { date: '2023-08-27', sent: 75, opened: 60, replied: 32 },
        { date: '2023-08-28', sent: 85, opened: 68, replied: 36 },
        { date: '2023-08-29', sent: 92, opened: 76, replied: 40 },
        { date: '2023-08-30', sent: 96, opened: 80, replied: 43 },
      ];
      
      const openRateData = [
        { date: 'Week 1', rate: 69.5 },
        { date: 'Week 2', rate: 73.2 },
        { date: 'Week 3', rate: 75.8 },
        { date: 'Week 4', rate: 77.1 },
        { date: 'Week 5', rate: 75.0 },
      ];
      
      const categoryData = [
        { name: 'Prospecting', value: 36 },
        { name: 'Follow-up', value: 25 },
        { name: 'Meetings', value: 15 },
        { name: 'Proposals', value: 12 },
        { name: 'Other', value: 12 },
      ];
      
      const templatesData = [
        { name: 'Follow-up Email', count: 156, openRate: 78.2 },
        { name: 'Product Demo Request', count: 124, openRate: 82.5 },
        { name: 'Meeting Confirmation', count: 98, openRate: 90.1 },
        { name: 'Welcome Email', count: 87, openRate: 85.3 },
        { name: 'Proposal Follow-up', count: 76, openRate: 72.8 },
      ];
      
      const activityData = [
        { id: 1, type: 'sent', to: 'john.doe@example.com', subject: 'Proposal for Q3 Marketing Campaign', timestamp: '2023-08-30T14:25:00Z', status: 'opened' },
        { id: 2, type: 'sent', to: 'sarah.smith@company.co', subject: 'Follow-up from our meeting yesterday', timestamp: '2023-08-30T11:18:00Z', status: 'replied' },
        { id: 3, type: 'scheduled', to: 'mike.johnson@corp.com', subject: 'Product demo scheduling', timestamp: '2023-08-31T09:00:00Z', status: 'scheduled' },
        { id: 4, type: 'sent', to: 'lisa.wong@business.org', subject: 'Monthly service report', timestamp: '2023-08-30T09:45:00Z', status: 'opened' },
        { id: 5, type: 'sent', to: 'david.miller@example.net', subject: 'Price quote for new services', timestamp: '2023-08-29T16:32:00Z', status: 'unopened' },
        { id: 6, type: 'sent', to: 'emma.wilson@startup.io', subject: 'Welcome to our service', timestamp: '2023-08-29T14:10:00Z', status: 'replied' },
        { id: 7, type: 'sent', to: 'james.taylor@enterprise.com', subject: 'Your invoice for August 2023', timestamp: '2023-08-29T10:22:00Z', status: 'unopened' },
      ];
      
      setEmailStats(stats);
      setEmailVolume(volumeData);
      setOpenRates(openRateData);
      setEmailsByCategory(categoryData);
      setTopTemplates(templatesData);
      setRecentActivity(activityData);
      setIsLoading(false);
    };
    
    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const refreshData = () => {
    // Normally would refresh data from the server
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'opened':
        return <Eye className="h-4 w-4 text-green-500" />;
      case 'replied':
        return <ArrowUp className="h-4 w-4 text-blue-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-purple-500" />;
      case 'unopened':
        return <Mail className="h-4 w-4 text-gray-400" />;
      default:
        return <Mail className="h-4 w-4 text-gray-400" />;
    }
  };

  const COLORS = ['#6366F1', '#EC4899', '#8B5CF6', '#10B981', '#F59E0B'];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Email Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Track and analyze your email performance</p>
        </div>
        <div className="flex space-x-4">
          <div>
            <select
              id="date-range"
              name="date-range"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={dateRange}
              onChange={handleDateRangeChange}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={refreshData}
          >
            <RefreshCw className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Export
          </button>
        </div>
      </div>

      {/* Email stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <Send className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Sent</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{emailStats.totalSent.toLocaleString()}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Opened</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{emailStats.totalOpened.toLocaleString()}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Open Rate</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{emailStats.openRate}%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg. Response Time</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{emailStats.averageResponseTime}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <ArrowUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Click-Through Rate</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{emailStats.clickThroughRate}%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Bounce Rate</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{emailStats.bounceRate}%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-6">
        {/* Email Volume Chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Email Volume</h3>
            <div className="mt-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={emailVolume}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.getDate();
                    }}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'sent' ? 'Sent' : name === 'opened' ? 'Opened' : 'Replied']}
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString();
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sent" name="Sent" fill="#6366F1" />
                  <Bar dataKey="opened" name="Opened" fill="#10B981" />
                  <Bar dataKey="replied" name="Replied" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Open Rate Trend */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Open Rate Trend</h3>
            <div className="mt-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={openRates}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[60, 85]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Open Rate']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Open Rate" 
                    stroke="#6366F1" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mb-6">
        {/* Email by Category */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Emails by Category</h3>
            <div className="mt-2 h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emailsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {emailsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performing Templates */}
        <div className="bg-white overflow-hidden shadow rounded-lg col-span-2">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Top Performing Templates</h3>
            <div className="mt-4">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Template Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Usage Count
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Open Rate
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {topTemplates.map((template) => (
                            <tr key={template.name}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{template.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{template.count}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{template.openRate}%</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Email Activity</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <li key={activity.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {activity.type === 'sent' ? (
                        <Send className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.type === 'sent' ? 'Sent to: ' : 'Scheduled for: '}
                        <span className="text-indigo-600">{activity.to}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.subject}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {getStatusIcon(activity.status)}
                      <span className="ml-1.5 text-xs text-gray-500 capitalize">{activity.status}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTimestamp(activity.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{recentActivity.length}</span> of{' '}
                <span className="font-medium">125</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  {/* Replace with chevron-left icon */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  {/* Replace with chevron-right icon */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default EmailDashboard;