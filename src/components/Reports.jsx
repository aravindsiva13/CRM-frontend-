// src/components/Reports.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart, LineChart, PieChart, Area, Bar, Line, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Pie 
} from 'recharts';
import { 
  Download, Filter, ChevronDown, Calendar, ArrowRight,
  TrendingUp, TrendingDown, Users, DollarSign, Briefcase, BarChart2,
  Layers, PieChart as PieChartIcon
} from 'lucide-react';
import mockApiService from '../utils/mockApi';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [leadsBySource, setLeadsBySource] = useState([]);
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState('thisYear');
  const [showDateRangeFilter, setShowDateRangeFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leadsResponse, salesResponse] = await Promise.all([
          mockApiService.getLeadsBySource(),
          mockApiService.getSalesByMonth()
        ]);
        
        setLeadsBySource(leadsResponse.data);
        setSalesByMonth(salesResponse.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fake data for additional charts
  const conversionRateData = [
    { month: 'Jan', rate: 25 },
    { month: 'Feb', rate: 27 },
    { month: 'Mar', rate: 26 },
    { month: 'Apr', rate: 28 },
    { month: 'May', rate: 30 },
    { month: 'Jun', rate: 32 },
    { month: 'Jul', rate: 31 },
    { month: 'Aug', rate: 34 },
    { month: 'Sep', rate: 35 },
    { month: 'Oct', rate: 33 },
    { month: 'Nov', rate: 36 },
    { month: 'Dec', rate: 38 },
  ];

  const salesPerformanceData = [
    { name: 'John Doe', sales: 120000, target: 100000 },
    { name: 'Sarah Smith', sales: 85000, target: 90000 },
    { name: 'Michael Johnson', sales: 95000, target: 80000 },
    { name: 'Emma Wilson', sales: 110000, target: 100000 },
    { name: 'David Brown', sales: 78000, target: 85000 },
  ];

  const dealValueByStageData = [
    { stage: 'Qualified', value: 250000 },
    { stage: 'Proposal', value: 500000 },
    { stage: 'Negotiation', value: 350000 },
    { stage: 'Closed Won', value: 750000 },
  ];

  // Date range options
  const dateRangeOptions = [
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisQuarter', label: 'This Quarter' },
    { value: 'thisYear', label: 'This Year' },
  ];

  // Get date range label
  const getDateRangeLabel = () => {
    const option = dateRangeOptions.find(opt => opt.value === dateRange);
    return option ? option.label : 'Select Date Range';
  };

  // COLORS for charts
  const CHART_COLORS = ['#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81'];
  const PIE_COLORS = ['#6366F1', '#EC4899', '#8B5CF6', '#10B981', '#F59E0B'];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Track your sales performance and customer metrics</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowDateRangeFilter(!showDateRangeFilter)}
            >
              <Calendar className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
              {getDateRangeLabel()}
              <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
            </button>

            {showDateRangeFilter && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDateRange(option.value);
                        setShowDateRangeFilter(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        dateRange === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Download className="-ml-1 mr-2 h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      {/* Report tabs */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              className={`px-1 py-2 text-sm font-medium flex items-center ${
                activeTab === 'sales'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('sales')}
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              Sales Performance
            </button>
            <button
              className={`px-1 py-2 text-sm font-medium flex items-center ${
                activeTab === 'leads'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('leads')}
            >
              <Users className="mr-2 h-5 w-5" />
              Lead Analytics
            </button>
            <button
              className={`px-1 py-2 text-sm font-medium flex items-center ${
                activeTab === 'deals'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('deals')}
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Deal Tracking
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
        </div>
      ) : (
        <>
          {/* Sales Performance Tab */}
          {activeTab === 'sales' && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <DollarSign className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Closed Deals</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">152</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              8%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">32.5%</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              4%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Average Deal Size</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">$8,450</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              5%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Monthly Sales</h3>
                    <div className="mt-2 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salesByMonth}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value.toLocaleString()}`, 'Amount']}
                            labelFormatter={(value) => `Month: ${value}`}
                          />
                          <Legend />
                          <Bar dataKey="amount" name="Sales" fill="#6366F1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Conversion Rate Trend</h3>
                    <div className="mt-2 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={conversionRateData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Conversion Rate']}
                            labelFormatter={(value) => `Month: ${value}`}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="rate" 
                            name="Conversion Rate" 
                            stroke="#6366F1" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Sales Performance by Rep</h3>
                  <div className="mt-2 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salesPerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()}`, 'Amount']}
                        />
                        <Legend />
                        <Bar dataKey="sales" name="Actual Sales" fill="#6366F1" />
                        <Bar dataKey="target" name="Target" fill="#C7D2FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lead Analytics Tab */}
          {activeTab === 'leads' && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Leads</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">1,253</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              15%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Qualified Leads</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">428</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              8%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Qualification Rate</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">34.2%</div>
                            <div className="ml-2 flex items-center text-sm text-red-600">
                              <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                              <span className="sr-only">Decreased by</span>
                              2%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Avg. Response Time</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">2.5 hrs</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Improved by</span>
                              10%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Leads by Source</h3>
                    <div className="mt-2 h-64 flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={leadsBySource}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="source"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {leadsBySource.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name, props) => [value, props.payload.source]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Lead Qualification Trend</h3>
                    <div className="mt-2 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={conversionRateData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="rate" 
                            name="Qualification Rate" 
                            stroke="#6366F1" 
                            fill="#C7D2FE" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deal Tracking Tab */}
          {activeTab === 'deals' && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <Briefcase className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Open Deals</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">85</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              12%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <DollarSign className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Pipeline Value</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">$1.2M</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              8%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Win Rate</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">42.5%</div>
                            <div className="ml-2 flex items-center text-sm text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="sr-only">Increased by</span>
                              5%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <Layers className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Avg. Sales Cycle</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">45 days</div>
                            <div className="ml-2 flex items-center text-sm text-red-600">
                              <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                              <span className="sr-only">Increased by</span>
                              2 days
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Deal Value by Stage</h3>
                    <div className="mt-2 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={dealValueByStageData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="stage" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value.toLocaleString()}`, 'Amount']}
                          />
                          <Legend />
                          <Bar dataKey="value" name="Deal Value" fill="#6366F1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Deal Probability Distribution</h3>
                    <div className="mt-2 h-64 flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: '< 25%', value: 15 },
                              { name: '25-50%', value: 25 },
                              { name: '50-75%', value: 35 },
                              { name: '> 75%', value: 25 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {PIE_COLORS.map((color, index) => (
                              <Cell key={`cell-${index}`} fill={color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reports;