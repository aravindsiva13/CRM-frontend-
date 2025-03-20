// src/components/Tasks.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, ChevronDown, X, CheckSquare, Clock,
  Calendar, Mail, Phone, FileText, MoreHorizontal, Edit, Trash,
  ChevronLeft, ChevronRight, ArrowUpDown, Tag, Monitor
} from 'lucide-react';
import mockApiService from '../utils/mockApi';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showPriorityFilter, setShowPriorityFilter] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await mockApiService.getTasks(currentPage, 10);
        setTasks(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleTaskClick = async (task) => {
    try {
      setLoading(true);
      const response = await mockApiService.getTaskById(task.id);
      setSelectedTask(response.data);
      setShowTaskDetails(true);
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeTaskDetails = () => {
    setShowTaskDetails(false);
    setSelectedTask(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter(task => 
    (filterStatus === 'All' || task.status === filterStatus) &&
    (filterPriority === 'All' || task.priority === filterPriority) &&
    (searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter options
  const statusOptions = ['All', 'Open', 'In Progress', 'Completed', 'Deferred'];
  const priorityOptions = ['All', 'Low', 'Medium', 'High', 'Urgent'];

  // Get icon for task type
  const getTaskTypeIcon = (type) => {
    switch(type) {
      case 'Call': return <Phone className="h-5 w-5 text-indigo-500" />;
      case 'Email': return <Mail className="h-5 w-5 text-blue-500" />;
      case 'Meeting': return <Calendar className="h-5 w-5 text-green-500" />;
      case 'Follow-up': return <CheckSquare className="h-5 w-5 text-yellow-500" />;
      case 'Proposal': return <FileText className="h-5 w-5 text-purple-500" />;
      case 'Demo': return <Monitor className="h-5 w-5 text-red-500" />;
      default: return <CheckSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get color for priority
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get color for status
  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Deferred': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if a task is overdue
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your activities and follow-ups</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setShowNewTaskModal(true)}
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Task
          </button>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-4 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="relative rounded-md shadow-sm w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search tasks..."
            />
          </div>
          
          <div className="flex space-x-3">
            {/* Status filter */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setShowStatusFilter(!showStatusFilter);
                  if (showPriorityFilter) setShowPriorityFilter(false);
                }}
              >
                <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                Status: {filterStatus}
                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
              </button>

              {showStatusFilter && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilterStatus(status);
                          setShowStatusFilter(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStatus === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        role="menuitem"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Priority filter */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setShowPriorityFilter(!showPriorityFilter);
                  if (showStatusFilter) setShowStatusFilter(false);
                }}
              >
                <Tag className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                Priority: {filterPriority}
                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
              </button>

              {showPriorityFilter && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {priorityOptions.map((priority) => (
                      <button
                        key={priority}
                        onClick={() => {
                          setFilterPriority(priority);
                          setShowPriorityFilter(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterPriority === priority ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        role="menuitem"
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowUpDown className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {loading ? (
          <div className="px-4 py-12 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-700"></div>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <div 
                  className="block hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getTaskTypeIcon(task.type)}
                        <p className="ml-3 text-sm font-medium text-gray-900">{task.title}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {isOverdue(task.dueDate) ? (
                            <span className="text-red-600 font-medium">
                              Overdue: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          ) : (
                            <span>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <CheckSquare className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Assigned to: {task.assignedTo}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          Created {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="text-sm text-gray-500">
                        Related to: <span className="font-medium">{task.relatedToName}</span> ({task.relatedTo})
                      </p>
                      <div className="flex space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Mark as complete logic
                          }}
                        >
                          <CheckSquare size={16} />
                        </button>
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Edit task logic
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {filteredTasks.length === 0 && (
              <li>
                <div className="px-4 py-12 text-center">
                  <p className="text-gray-500">No tasks found. Try adjusting your search or filters.</p>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * 10, tasks.length)}</span> of{' '}
              <span className="font-medium">{tasks.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                                    key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    page === currentPage
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } text-sm font-medium`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Task detail slide-over */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 overflow-hidden z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeTaskDetails}></div>
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
                          onClick={closeTaskDetails}
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
                            {getTaskTypeIcon(selectedTask.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{selectedTask.title}</h3>
                            <div className="mt-1 flex space-x-2">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                                {selectedTask.priority}
                              </span>
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTask.status)}`}>
                                {selectedTask.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Description</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedTask.description}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedTask.assignedTo}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Type</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedTask.type}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {isOverdue(selectedTask.dueDate) ? (
                                  <span className="text-red-600 font-medium">
                                    Overdue: {new Date(selectedTask.dueDate).toLocaleDateString()}
                                  </span>
                                ) : (
                                  <span>
                                    {new Date(selectedTask.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Created</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {new Date(selectedTask.createdAt).toLocaleDateString()}
                              </dd>
                            </div>
                            <div className="sm:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Related To</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {selectedTask.relatedToName} ({selectedTask.relatedTo})
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Notes & Updates</h4>
                          <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start">
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">Initial discussion</p>
                                  <p className="text-sm text-gray-500">
                                    Scheduled the initial call with the client to discuss requirements.
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <label htmlFor="task-note" className="sr-only">Add Note</label>
                            <textarea
                              id="task-note"
                              name="task-note"
                              rows="3"
                              className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Add a note..."
                            ></textarea>
                            <div className="mt-2 flex justify-end">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                        onClick={closeTaskDetails}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowNewTaskModal(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Task
                  </h3>
                  <div className="mt-4">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          name="task-title"
                          id="task-title"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Task title"
                        />
                      </div>
                      <div>
                        <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="task-description"
                          name="task-description"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Task description"
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="task-type" className="block text-sm font-medium text-gray-700">
                            Type
                          </label>
                          <select
                            id="task-type"
                            name="task-type"
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
                          <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700">
                            Priority
                          </label>
                          <select
                            id="task-priority"
                            name="task-priority"
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="task-assigned" className="block text-sm font-medium text-gray-700">
                            Assigned To
                          </label>
                          <select
                            id="task-assigned"
                            name="task-assigned"
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="me">Me</option>
                            <option value="john">John Doe</option>
                            <option value="sarah">Sarah Smith</option>
                            <option value="michael">Michael Johnson</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700">
                            Due Date
                          </label>
                          <input
                            type="date"
                            name="task-due-date"
                            id="task-due-date"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="task-related" className="block text-sm font-medium text-gray-700">
                            Related To
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <select
                              id="task-related-type"
                              name="task-related-type"
                              className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md"
                            >
                              <option value="Contact">Contact</option>
                              <option value="Lead">Lead</option>
                              <option value="Deal">Deal</option>
                              <option value="Account">Account</option>
                            </select>
                            <input
                              type="text"
                              name="task-related-name"
                              id="task-related-name"
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 sm:text-sm"
                              placeholder="Search..."
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowNewTaskModal(false)}
                >
                  Add Task
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowNewTaskModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;