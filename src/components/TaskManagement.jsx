// // src/components/Tasks.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, Plus, Filter, ChevronDown, X, CheckSquare, Clock,
//   Calendar, Mail, Phone, FileText, MoreHorizontal, Edit, Trash,
//   ChevronLeft, ChevronRight, ArrowUpDown, Tag, Monitor
// } from 'lucide-react';
// import mockApiService from '../utils/mockApi';

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showTaskDetails, setShowTaskDetails] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [filterPriority, setFilterPriority] = useState('All');
//   const [showStatusFilter, setShowStatusFilter] = useState(false);
//   const [showPriorityFilter, setShowPriorityFilter] = useState(false);
//   const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setLoading(true);
//         const response = await mockApiService.getTasks(currentPage, 10);
//         setTasks(response.data);
//         setTotalPages(response.totalPages);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [currentPage]);

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleTaskClick = async (task) => {
//     try {
//       setLoading(true);
//       const response = await mockApiService.getTaskById(task.id);
//       setSelectedTask(response.data);
//       setShowTaskDetails(true);
//     } catch (error) {
//       console.error("Error fetching task details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeTaskDetails = () => {
//     setShowTaskDetails(false);
//     setSelectedTask(null);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredTasks = tasks.filter(task => 
//     (filterStatus === 'All' || task.status === filterStatus) &&
//     (filterPriority === 'All' || task.priority === filterPriority) &&
//     (searchTerm === '' || 
//       task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // Filter options
//   const statusOptions = ['All', 'Open', 'In Progress', 'Completed', 'Deferred'];
//   const priorityOptions = ['All', 'Low', 'Medium', 'High', 'Urgent'];

//   // Get icon for task type
//   const getTaskTypeIcon = (type) => {
//     switch(type) {
//       case 'Call': return <Phone className="h-5 w-5 text-indigo-500" />;
//       case 'Email': return <Mail className="h-5 w-5 text-blue-500" />;
//       case 'Meeting': return <Calendar className="h-5 w-5 text-green-500" />;
//       case 'Follow-up': return <CheckSquare className="h-5 w-5 text-yellow-500" />;
//       case 'Proposal': return <FileText className="h-5 w-5 text-purple-500" />;
//       case 'Demo': return <Monitor className="h-5 w-5 text-red-500" />;
//       default: return <CheckSquare className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   // Get color for priority
//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'Low': return 'bg-blue-100 text-blue-800';
//       case 'Medium': return 'bg-yellow-100 text-yellow-800';
//       case 'High': return 'bg-orange-100 text-orange-800';
//       case 'Urgent': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Get color for status
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Open': return 'bg-blue-100 text-blue-800';
//       case 'In Progress': return 'bg-yellow-100 text-yellow-800';
//       case 'Completed': return 'bg-green-100 text-green-800';
//       case 'Deferred': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Check if a task is overdue
//   const isOverdue = (dueDate) => {
//     return new Date(dueDate) < new Date() && new Date(dueDate).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0);
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
//           <p className="mt-1 text-sm text-gray-500">Manage your activities and follow-ups</p>
//         </div>
//         <div className="mt-4 md:mt-0 flex space-x-3">
//           <button 
//             className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             onClick={() => setShowNewTaskModal(true)}
//           >
//             <Plus className="-ml-1 mr-2 h-5 w-5" />
//             Add Task
//           </button>
//         </div>
//       </div>

//       {/* Search and filter bar */}
//       <div className="bg-white shadow rounded-lg mb-6">
//         <div className="p-4 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
//           <div className="relative rounded-md shadow-sm w-full md:w-96">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
//               placeholder="Search tasks..."
//             />
//           </div>
          
//           <div className="flex space-x-3">
//             {/* Status filter */}
//             <div className="relative">
//               <button
//                 type="button"
//                 className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 onClick={() => {
//                   setShowStatusFilter(!showStatusFilter);
//                   if (showPriorityFilter) setShowPriorityFilter(false);
//                 }}
//               >
//                 <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
//                 Status: {filterStatus}
//                 <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
//               </button>

//               {showStatusFilter && (
//                 <div
//                   className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="menu-button"
//                 >
//                   <div className="py-1" role="none">
//                     {statusOptions.map((status) => (
//                       <button
//                         key={status}
//                         onClick={() => {
//                           setFilterStatus(status);
//                           setShowStatusFilter(false);
//                         }}
//                         className={`block w-full text-left px-4 py-2 text-sm ${
//                           filterStatus === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
//                         } hover:bg-gray-100`}
//                         role="menuitem"
//                       >
//                         {status}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Priority filter */}
//             <div className="relative">
//               <button
//                 type="button"
//                 className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 onClick={() => {
//                   setShowPriorityFilter(!showPriorityFilter);
//                   if (showStatusFilter) setShowStatusFilter(false);
//                 }}
//               >
//                 <Tag className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
//                 Priority: {filterPriority}
//                 <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
//               </button>

//               {showPriorityFilter && (
//                 <div
//                   className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="menu-button"
//                 >
//                   <div className="py-1" role="none">
//                     {priorityOptions.map((priority) => (
//                       <button
//                         key={priority}
//                         onClick={() => {
//                           setFilterPriority(priority);
//                           setShowPriorityFilter(false);
//                         }}
//                         className={`block w-full text-left px-4 py-2 text-sm ${
//                           filterPriority === priority ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
//                         } hover:bg-gray-100`}
//                         role="menuitem"
//                       >
//                         {priority}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button
//               type="button"
//               className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <ArrowUpDown className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
//               Sort
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Task list */}
//       <div className="bg-white shadow overflow-hidden sm:rounded-md">
//         {loading ? (
//           <div className="px-4 py-12 text-center">
//             <div className="flex justify-center">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-700"></div>
//             </div>
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {filteredTasks.map((task) => (
//               <li key={task.id}>
//                 <div 
//                   className="block hover:bg-gray-50 cursor-pointer"
//                   onClick={() => handleTaskClick(task)}
//                 >
//                   <div className="px-4 py-4 sm:px-6">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         {getTaskTypeIcon(task.type)}
//                         <p className="ml-3 text-sm font-medium text-gray-900">{task.title}</p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
//                           {task.priority}
//                         </span>
//                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
//                           {task.status}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="mt-2 sm:flex sm:justify-between">
//                       <div className="sm:flex">
//                         <p className="flex items-center text-sm text-gray-500">
//                           <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                           {isOverdue(task.dueDate) ? (
//                             <span className="text-red-600 font-medium">
//                               Overdue: {new Date(task.dueDate).toLocaleDateString()}
//                             </span>
//                           ) : (
//                             <span>
//                               Due: {new Date(task.dueDate).toLocaleDateString()}
//                             </span>
//                           )}
//                         </p>
//                         <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
//                           <CheckSquare className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                           Assigned to: {task.assignedTo}
//                         </p>
//                       </div>
//                       <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                         <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                         <p>
//                           Created {new Date(task.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
//                     </div>
//                     <div className="mt-2 flex justify-between">
//                       <p className="text-sm text-gray-500">
//                         Related to: <span className="font-medium">{task.relatedToName}</span> ({task.relatedTo})
//                       </p>
//                       <div className="flex space-x-2">
//                         <button 
//                           className="text-indigo-600 hover:text-indigo-900"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             // Mark as complete logic
//                           }}
//                         >
//                           <CheckSquare size={16} />
//                         </button>
//                         <button 
//                           className="text-indigo-600 hover:text-indigo-900"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             // Edit task logic
//                           }}
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button 
//                           className="text-indigo-600 hover:text-indigo-900"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <MoreHorizontal size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//             {filteredTasks.length === 0 && (
//               <li>
//                 <div className="px-4 py-12 text-center">
//                   <p className="text-gray-500">No tasks found. Try adjusting your search or filters.</p>
//                 </div>
//               </li>
//             )}
//           </ul>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
//         <div className="flex-1 flex justify-between sm:hidden">
//           <button
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//             className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//               currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//               currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             Next
//           </button>
//         </div>
//         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
//               <span className="font-medium">{Math.min(currentPage * 10, tasks.length)}</span> of{' '}
//               <span className="font-medium">{tasks.length}</span> results
//             </p>
//           </div>
//           <div>
//             <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
//                   currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
//                 }`}
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                                     key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`relative inline-flex items-center px-4 py-2 border ${
//                     page === currentPage
//                       ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
//                       : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                   } text-sm font-medium`}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
//                   currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
//                 }`}
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRight className="h-5 w-5" aria-hidden="true" />
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Task detail slide-over */}
//       {showTaskDetails && selectedTask && (
//         <div className="fixed inset-0 overflow-hidden z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeTaskDetails}></div>
//             <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
//               <div className="relative w-screen max-w-md">
//                 <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
//                   <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
//                     <div className="flex items-start justify-between">
//                       <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
//                         Task Details
//                       </h2>
//                       <div className="ml-3 h-7 flex items-center">
//                         <button
//                           type="button"
//                           className="-m-2 p-2 text-gray-400 hover:text-gray-500"
//                           onClick={closeTaskDetails}
//                         >
//                           <span className="sr-only">Close panel</span>
//                           <X className="h-6 w-6" aria-hidden="true" />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="mt-8">
//                       <div className="flow-root">
//                         <div className="flex items-center mb-6">
//                           <div className="mr-4">
//                             {getTaskTypeIcon(selectedTask.type)}
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-medium text-gray-900">{selectedTask.title}</h3>
//                             <div className="mt-1 flex space-x-2">
//                               <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(selectedTask.priority)}`}>
//                                 {selectedTask.priority}
//                               </span>
//                               <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTask.status)}`}>
//                                 {selectedTask.status}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="border-t border-gray-200 py-6">
//                           <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
//                             <div className="sm:col-span-2">
//                               <dt className="text-sm font-medium text-gray-500">Description</dt>
//                               <dd className="mt-1 text-sm text-gray-900">{selectedTask.description}</dd>
//                             </div>
//                             <div className="sm:col-span-1">
//                               <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
//                               <dd className="mt-1 text-sm text-gray-900">{selectedTask.assignedTo}</dd>
//                             </div>
//                             <div className="sm:col-span-1">
//                               <dt className="text-sm font-medium text-gray-500">Type</dt>
//                               <dd className="mt-1 text-sm text-gray-900">{selectedTask.type}</dd>
//                             </div>
//                             <div className="sm:col-span-1">
//                               <dt className="text-sm font-medium text-gray-500">Due Date</dt>
//                               <dd className="mt-1 text-sm text-gray-900">
//                                 {isOverdue(selectedTask.dueDate) ? (
//                                   <span className="text-red-600 font-medium">
//                                     Overdue: {new Date(selectedTask.dueDate).toLocaleDateString()}
//                                   </span>
//                                 ) : (
//                                   <span>
//                                     {new Date(selectedTask.dueDate).toLocaleDateString()}
//                                   </span>
//                                 )}
//                               </dd>
//                             </div>
//                             <div className="sm:col-span-1">
//                               <dt className="text-sm font-medium text-gray-500">Created</dt>
//                               <dd className="mt-1 text-sm text-gray-900">
//                                 {new Date(selectedTask.createdAt).toLocaleDateString()}
//                               </dd>
//                             </div>
//                             <div className="sm:col-span-2">
//                               <dt className="text-sm font-medium text-gray-500">Related To</dt>
//                               <dd className="mt-1 text-sm text-gray-900">
//                                 {selectedTask.relatedToName} ({selectedTask.relatedTo})
//                               </dd>
//                             </div>
//                           </dl>
//                         </div>

//                         <div className="border-t border-gray-200 py-6">
//                           <h4 className="text-sm font-medium text-gray-500 mb-4">Notes & Updates</h4>
//                           <div className="space-y-4">
//                             <div className="bg-gray-50 rounded-lg p-4">
//                               <div className="flex items-start">
//                                 <div className="ml-3">
//                                   <p className="text-sm font-medium text-gray-900">Initial discussion</p>
//                                   <p className="text-sm text-gray-500">
//                                     Scheduled the initial call with the client to discuss requirements.
//                                   </p>
//                                   <p className="text-xs text-gray-400 mt-1">2 days ago</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="mt-4">
//                             <label htmlFor="task-note" className="sr-only">Add Note</label>
//                             <textarea
//                               id="task-note"
//                               name="task-note"
//                               rows="3"
//                               className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
//                               placeholder="Add a note..."
//                             ></textarea>
//                             <div className="mt-2 flex justify-end">
//                               <button
//                                 type="button"
//                                 className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                               >
//                                 Add Note
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                     <div className="flex justify-between space-x-3">
//                       <button
//                         type="button"
//                         className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         onClick={closeTaskDetails}
//                       >
//                         Close
//                       </button>
//                       <button
//                         type="button"
//                         className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                       >
//                         Mark Complete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* New Task Modal */}
//       {showNewTaskModal && (
//         <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowNewTaskModal(false)}></div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

//             <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
//               <div className="sm:flex sm:items-start">
//                 <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
//                   <CheckSquare className="h-6 w-6 text-indigo-600" />
//                 </div>
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//                     Add New Task
//                   </h3>
//                   <div className="mt-4">
//                     <form className="space-y-4">
//                       <div>
//                         <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">
//                           Title
//                         </label>
//                         <input
//                           type="text"
//                           name="task-title"
//                           id="task-title"
//                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           placeholder="Task title"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">
//                           Description
//                         </label>
//                         <textarea
//                           id="task-description"
//                           name="task-description"
//                           rows="3"
//                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           placeholder="Task description"
//                         ></textarea>
//                       </div>
//                       <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
//                         <div>
//                           <label htmlFor="task-type" className="block text-sm font-medium text-gray-700">
//                             Type
//                           </label>
//                           <select
//                             id="task-type"
//                             name="task-type"
//                             className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           >
//                             <option value="Call">Call</option>
//                             <option value="Email">Email</option>
//                             <option value="Meeting">Meeting</option>
//                             <option value="Follow-up">Follow-up</option>
//                             <option value="Proposal">Proposal</option>
//                             <option value="Demo">Demo</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700">
//                             Priority
//                           </label>
//                           <select
//                             id="task-priority"
//                             name="task-priority"
//                             className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           >
//                             <option value="Low">Low</option>
//                             <option value="Medium">Medium</option>
//                             <option value="High">High</option>
//                             <option value="Urgent">Urgent</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label htmlFor="task-assigned" className="block text-sm font-medium text-gray-700">
//                             Assigned To
//                           </label>
//                           <select
//                             id="task-assigned"
//                             name="task-assigned"
//                             className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           >
//                             <option value="me">Me</option>
//                             <option value="john">John Doe</option>
//                             <option value="sarah">Sarah Smith</option>
//                             <option value="michael">Michael Johnson</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700">
//                             Due Date
//                           </label>
//                           <input
//                             type="date"
//                             name="task-due-date"
//                             id="task-due-date"
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           />
//                         </div>
//                         <div className="sm:col-span-2">
//                           <label htmlFor="task-related" className="block text-sm font-medium text-gray-700">
//                             Related To
//                           </label>
//                           <div className="mt-1 flex rounded-md shadow-sm">
//                             <select
//                               id="task-related-type"
//                               name="task-related-type"
//                               className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md"
//                             >
//                               <option value="Contact">Contact</option>
//                               <option value="Lead">Lead</option>
//                               <option value="Deal">Deal</option>
//                               <option value="Account">Account</option>
//                             </select>
//                             <input
//                               type="text"
//                               name="task-related-name"
//                               id="task-related-name"
//                               className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 sm:text-sm"
//                               placeholder="Search..."
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
//                 <button
//                   type="button"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
//                   onClick={() => setShowNewTaskModal(false)}
//                 >
//                   Add Task
//                 </button>
//                 <button
//                   type="button"
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
//                   onClick={() => setShowNewTaskModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tasks;







//2

// src/components/TaskManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, ChevronDown, X, CheckSquare, Clock,
  Calendar, Mail, Phone, FileText, MoreHorizontal, Edit, Trash,
  ChevronLeft, ChevronRight, ArrowUpDown, Tag, Monitor, Repeat,
  Bell, Link, Users, List, Grid, AlertCircle, Calendar as CalendarIcon,
  CheckCircle, XCircle, PlusCircle, AlertTriangle, Users as UsersIcon,
  BarChart2, Settings
} from 'lucide-react';
import mockApiService from '../utils/mockApi';
import TaskCalendarView from './tasks/TaskCalendarView';
import TaskBoardView from './tasks/TaskBoardView';
import TaskDetailsPanel from './tasks/TaskDetailsPanel';
import NewTaskModal from './tasks/NewTaskModal';
import ReminderModal from './tasks/ReminderModal';
import TaskStatistics from './tasks/TaskStatistics';    



const TaskManagement = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterAssignedTo, setFilterAssignedTo] = useState('All');
  
  // UI states for filters and menus
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showPriorityFilter, setShowPriorityFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showAssigneeFilter, setShowAssigneeFilter] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  // View mode and selection states
  const [viewMode, setViewMode] = useState('list'); // 'list', 'board', 'calendar', 'statistics'
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Data states
  const [taskDependencies, setTaskDependencies] = useState([]);
  const [categories, setCategories] = useState(['Meeting', 'Call', 'Email', 'Follow-up', 'Research', 'Administrative']);
  const [teamMembers, setTeamMembers] = useState(['Me', 'John Doe', 'Sarah Smith', 'Michael Johnson']);
  
  // Calendar states
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('week'); // day, week, month
  
  // Sorting states
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');



  // Form state for new/edit task
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    type: 'Call',
    priority: 'Medium',
    status: 'Open',
    assignedTo: 'Me',
    dueDate: '',
    dueTime: '',
    relatedTo: 'Contact',
    relatedToName: '',
    relatedToId: '',
    category: 'Call',
    isRecurring: false,
    recurringPattern: 'daily',
    recurringEvery: 1,
    recurringEndDate: '',
    recurringCount: 0,
    reminderEnabled: false,
    reminderTime: '30',
    reminderUnit: 'minutes',
    dependencies: [],
    estimatedTime: '',
    notes: '',
    attachments: []
  });

  // Reminder form
  const [reminderForm, setReminderForm] = useState({
    taskId: null,
    time: '30', // Default 30 minutes before
    unit: 'minutes', // minutes, hours, days
    method: 'app', // app, email, both
  });

  // Statistics state
  const [statistics, setStatistics] = useState({
    byCategory: [],
    byUser: [],
    timeline: []
  });



  // Load tasks on component mount and when current page changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await mockApiService.getEnhancedTasks(currentPage, 10);
        setTasks(response.data);
        setTotalPages(response.totalPages);
        
        // Fetch task dependencies
        const dependenciesResponse = await mockApiService.getTaskDependencies();
        setTaskDependencies(dependenciesResponse.data);
        
        // Fetch statistics if in statistics view
        if (viewMode === 'statistics') {
          await fetchStatistics();
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentPage, viewMode]);

  // Filter tasks when filter criteria change
  useEffect(() => {
    let result = tasks;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'All') {
      result = result.filter(task => task.status === filterStatus);
    }
    
    // Apply priority filter
    if (filterPriority !== 'All') {
      result = result.filter(task => task.priority === filterPriority);
    }
    
    // Apply category filter
    if (filterCategory !== 'All') {
      result = result.filter(task => task.category === filterCategory);
    }
    
    // Apply assignee filter
    if (filterAssignedTo !== 'All') {
      result = result.filter(task => task.assignedTo === filterAssignedTo);
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortField === 'dueDate') {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'priority') {
        const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Urgent': 4 };
        return sortDirection === 'asc' 
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortField === 'title') {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } 
      // Default sorting by creation date
      return sortDirection === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    setFilteredTasks(result);
  }, [tasks, searchTerm, filterStatus, filterPriority, filterCategory, filterAssignedTo, sortField, sortDirection]);




  // Fetch statistics data
  const fetchStatistics = async () => {
    try {
      const [byCategory, byUser, timeline] = await Promise.all([
        mockApiService.getTasksByCategory(),
        mockApiService.getTaskCompletionByUser(),
        mockApiService.getTaskTimeline()
      ]);
      
      setStatistics({
        byCategory: byCategory.data,
        byUser: byUser.data,
        timeline: timeline.data
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Task operations
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

  const handleSaveTask = async () => {
    try {
      setLoading(true);
      
      // Validate form
      if (!taskForm.title || !taskForm.dueDate) {
        alert('Please fill in all required fields');
        setLoading(false);
        return;
      }
      
      const taskData = {
        ...taskForm,
        // Format dates and add any additional data processing
        dueDate: new Date(`${taskForm.dueDate}T${taskForm.dueTime || '09:00'}`).toISOString()
      };
      
      // Call API to save task
      let response;
      if (taskForm.id) {
        // Update existing task
        response = await mockApiService.updateTask(taskData);
        
        // Update task in the list
        const updatedTasks = tasks.map(task => 
          task.id === taskForm.id ? response.data : task
        );
        setTasks(updatedTasks);
      } else {
        // Create new task
        response = await mockApiService.createTask(taskData);
        
        // Add new task to the list
        setTasks([response.data, ...tasks]);
      }
      
      // Handle recurring task creation if needed
      if (taskForm.isRecurring) {
        await mockApiService.createRecurringTasks(taskData);
      }
      
      // Close the modal
      setShowNewTaskModal(false);
      
      // If the task details are open, update the selected task
      if (selectedTask && selectedTask.id === taskForm.id) {
        setSelectedTask(response.data);
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert('Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleMarkComplete = async (taskId) => {
    try {
      setLoading(true);
      await mockApiService.updateTaskStatus(taskId, 'Completed');
      
      // Update the task in the list
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, status: 'Completed' } : task
      );
      setTasks(updatedTasks);
      
      // If the task details are open, update the selected task
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask({ ...selectedTask, status: 'Completed' });
      }
    } catch (error) {
      console.error("Error marking task as complete:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleSaveReminder = async () => {
    try {
      setLoading(true);
      
      await mockApiService.addTaskReminder(reminderForm);
      
      // Update the task in the list
      const updatedTasks = tasks.map(task => 
        task.id === reminderForm.taskId ? { 
          ...task, 
          reminderEnabled: true,
          reminderTime: reminderForm.time,
          reminderUnit: reminderForm.unit,
          reminderMethod: reminderForm.method
        } : task
      );
      setTasks(updatedTasks);
      
      // If the task details are open, update the selected task
      if (selectedTask && selectedTask.id === reminderForm.taskId) {
        setSelectedTask({ 
          ...selectedTask, 
          reminderEnabled: true,
          reminderTime: reminderForm.time,
          reminderUnit: reminderForm.unit,
          reminderMethod: reminderForm.method
        });
      }
      
      // Close the modal
      setShowReminderModal(false);
    } catch (error) {
      console.error("Error setting reminder:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Bulk action handlers
  const handleBulkAction = async (action) => {
    try {
      setLoading(true);
      
      switch (action) {
        case 'complete':
          await mockApiService.bulkUpdateTaskStatus(selectedTaskIds, 'Completed');
          // Update local task list
          const completedTasks = tasks.map(task => 
            selectedTaskIds.includes(task.id) ? { ...task, status: 'Completed' } : task
          );
          setTasks(completedTasks);
          break;
        case 'delete':
          await mockApiService.bulkDeleteTasks(selectedTaskIds);
          // Remove deleted tasks from list
          const remainingTasks = tasks.filter(task => !selectedTaskIds.includes(task.id));
          setTasks(remainingTasks);
          break;
        case 'assignToMe':
          await mockApiService.bulkAssignTasks(selectedTaskIds, 'Me');
          // Update assigned tasks
          const assignedTasks = tasks.map(task => 
            selectedTaskIds.includes(task.id) ? { ...task, assignedTo: 'Me' } : task
          );
          setTasks(assignedTasks);
          break;
        default:
          console.log(`Unsupported bulk action: ${action}`);
      }
      
      // Clear selection
      setSelectedTaskIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error(`Error performing bulk action ${action}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  // UI event handlers
  const closeTaskDetails = () => {
    setShowTaskDetails(false);
    setSelectedTask(null);
  };
  
  // Pagination handlers
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



  // Form handlers
  const handleAddNewTask = () => {
    // Reset the form
    setTaskForm({
      title: '',
      description: '',
      type: 'Call',
      priority: 'Medium',
      status: 'Open',
      assignedTo: 'Me',
      dueDate: '',
      dueTime: '',
      relatedTo: 'Contact',
      relatedToName: '',
      relatedToId: '',
      category: 'Call',
      isRecurring: false,
      recurringPattern: 'daily',
      recurringEvery: 1,
      recurringEndDate: '',
      recurringCount: 0,
      reminderEnabled: false,
      reminderTime: '30',
      reminderUnit: 'minutes',
      dependencies: [],
      estimatedTime: '',
      notes: '',
      attachments: []
    });
    setShowNewTaskModal(true);
  };
  
  const handleEditTask = (task) => {
    // Populate the form with task data
    setTaskForm({
      id: task.id,
      title: task.title,
      description: task.description,
      type: task.type,
      priority: task.priority,
      status: task.status,
      assignedTo: task.assignedTo,
      dueDate: new Date(task.dueDate).toISOString().split('T')[0],
      dueTime: task.dueTime || '09:00',
      relatedTo: task.relatedTo,
      relatedToName: task.relatedToName,
      relatedToId: task.relatedToId,
      category: task.category,
      isRecurring: task.isRecurring || false,
      recurringPattern: task.recurringPattern || 'daily',
      recurringEvery: task.recurringEvery || 1,
      recurringEndDate: task.recurringEndDate || '',
      recurringCount: task.recurringCount || 0,
      reminderEnabled: task.reminderEnabled || false,
      reminderTime: task.reminderTime || '30',
      reminderUnit: task.reminderUnit || 'minutes',
      dependencies: task.dependencies || [],
      estimatedTime: task.estimatedTime || '',
      notes: task.notes || '',
      attachments: task.attachments || []
    });
    setShowNewTaskModal(true);
  };
  
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAddReminder = (taskId) => {
    setReminderForm({
      taskId,
      time: '30',
      unit: 'minutes',
      method: 'app'
    });
    setShowReminderModal(true);
  };
  
  // Selection handlers
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (newSelectAll) {
      // Get IDs of visible tasks
      setSelectedTaskIds(getCurrentPageTasks().map(task => task.id));
    } else {
      setSelectedTaskIds([]);
    }
  };
  
  const handleSelectTask = (taskId, event) => {
    event.stopPropagation();
    
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId));
    } else {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    }
  };
  
  const getCurrentPageTasks = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return filteredTasks.slice(startIndex, endIndex);
  };




  // Search and filter handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('All');
    setFilterPriority('All');
    setFilterCategory('All');
    setFilterAssignedTo('All');
  };

  // UI helper functions
  const getTaskTypeIcon = (type) => {
    switch(type) {
      case 'Call': return <Phone className="h-5 w-5 text-indigo-500" />;
      case 'Email': return <Mail className="h-5 w-5 text-blue-500" />;
      case 'Meeting': return <CalendarIcon className="h-5 w-5 text-green-500" />;
      case 'Follow-up': return <CheckSquare className="h-5 w-5 text-yellow-500" />;
      case 'Proposal': return <FileText className="h-5 w-5 text-purple-500" />;
      case 'Demo': return <Monitor className="h-5 w-5 text-red-500" />;
      default: return <CheckSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Deferred': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0);
  };

  const getTaskDependencies = (taskId) => {
    return taskDependencies.filter(dep => dep.taskId === taskId);
  };
  
  const hasActiveDependencies = (taskId) => {
    const dependencies = getTaskDependencies(taskId);
    return dependencies.some(dep => {
      const dependentTask = tasks.find(task => task.id === dep.dependsOnTaskId);
      return dependentTask && dependentTask.status !== 'Completed';
    });
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Regular date formatting
    return date.toLocaleDateString(undefined, { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };




  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with title and view options */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Task Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your activities, follow-ups, and team assignments</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddNewTask}
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Task
          </button>
          <div className="hidden sm:flex border border-gray-300 rounded-md shadow-sm overflow-hidden">
            <button 
              onClick={() => setViewMode('list')} 
              className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                viewMode === 'list' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <List className="-ml-1 mr-2 h-4 w-4" />
              List
            </button>
            <button 
              onClick={() => setViewMode('board')} 
              className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                viewMode === 'board' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Grid className="-ml-1 mr-2 h-4 w-4" />
              Board
            </button>
            <button 
              onClick={() => setViewMode('calendar')} 
              className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                viewMode === 'calendar' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CalendarIcon className="-ml-1 mr-2 h-4 w-4" />
              Calendar
            </button>
            <button 
              onClick={() => setViewMode('statistics')} 
              className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                viewMode === 'statistics' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart2 className="-ml-1 mr-2 h-4 w-4" />
              Statistics
            </button>
          </div>
        </div>
      </div>



      {/* Search and filter bar - only show if not in statistics view */}
      {viewMode !== 'statistics' && (
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
            
            <div className="flex flex-wrap gap-2">
              {/* Status filter */}
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setShowStatusFilter(!showStatusFilter);
                    setShowPriorityFilter(false);
                    setShowCategoryFilter(false);
                    setShowAssigneeFilter(false);
                    setShowSortMenu(false);
                  }}
                >
                  <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  Status: {filterStatus}
                  <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                </button>

                {showStatusFilter && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="status-menu">
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStatus === 'All' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterStatus('All');
                          setShowStatusFilter(false);
                        }}
                      >
                        All
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStatus === 'Open' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterStatus('Open');
                          setShowStatusFilter(false);
                        }}
                      >
                        Open
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStatus === 'In Progress' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterStatus('In Progress');
                          setShowStatusFilter(false);
                        }}
                      >
                        In Progress
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStatus === 'Completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterStatus('Completed');
                          setShowStatusFilter(false);
                        }}
                      >
                        Completed
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStatus === 'Deferred' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterStatus('Deferred');
                          setShowStatusFilter(false);
                        }}
                      >
                        Deferred
                      </button>
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
                    setShowStatusFilter(false);
                    setShowCategoryFilter(false);
                    setShowAssigneeFilter(false);
                    setShowSortMenu(false);
                  }}
                >
                  <Tag className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  Priority: {filterPriority}
                  <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                </button>

                {showPriorityFilter && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="priority-menu">
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterPriority === 'All' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterPriority('All');
                          setShowPriorityFilter(false);
                        }}
                      >
                        All
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterPriority === 'Low' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterPriority('Low');
                          setShowPriorityFilter(false);
                        }}
                      >
                        Low
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterPriority === 'Medium' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterPriority('Medium');
                          setShowPriorityFilter(false);
                        }}
                      >
                        Medium
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterPriority === 'High' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterPriority('High');
                          setShowPriorityFilter(false);
                        }}
                      >
                        High
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterPriority === 'Urgent' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterPriority('Urgent');
                          setShowPriorityFilter(false);
                        }}
                      >
                        Urgent
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Category filter */}
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setShowCategoryFilter(!showCategoryFilter);
                    setShowStatusFilter(false);
                    setShowPriorityFilter(false);
                    setShowAssigneeFilter(false);
                    setShowSortMenu(false);
                  }}
                >
                  <CheckSquare className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  Category: {filterCategory}
                  <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                </button>

                {showCategoryFilter && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="category-menu">
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterCategory === 'All' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterCategory('All');
                          setShowCategoryFilter(false);
                        }}
                      >
                        All
                      </button>
                      {categories.map(category => (
                        <button
                          key={category}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            filterCategory === category ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } hover:bg-gray-100`}
                          onClick={() => {
                            setFilterCategory(category);
                            setShowCategoryFilter(false);
                          }}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>



              {/* Assignee filter */}
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setShowAssigneeFilter(!showAssigneeFilter);
                    setShowStatusFilter(false);
                    setShowPriorityFilter(false);
                    setShowCategoryFilter(false);
                    setShowSortMenu(false);
                  }}
                >
                  <UsersIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  Assigned To: {filterAssignedTo}
                  <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                </button>

                {showAssigneeFilter && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="assignee-menu">
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterAssignedTo === 'All' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterAssignedTo('All');
                          setShowAssigneeFilter(false);
                        }}
                      >
                        All
                      </button>
                      {teamMembers.map(member => (
                        <button
                          key={member}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            filterAssignedTo === member ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } hover:bg-gray-100`}
                          onClick={() => {
                            setFilterAssignedTo(member);
                            setShowAssigneeFilter(false);
                          }}
                        >
                          {member}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sort button */}
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setShowSortMenu(!showSortMenu);
                    setShowStatusFilter(false);
                    setShowPriorityFilter(false);
                    setShowCategoryFilter(false);
                    setShowAssigneeFilter(false);
                  }}
                >
                  <ArrowUpDown className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  Sort
                  <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                </button>

                {showSortMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="sort-menu">
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortField === 'dueDate' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          handleSort('dueDate');
                          setShowSortMenu(false);
                        }}
                      >
                        Due Date {sortField === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortField === 'priority' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          handleSort('priority');
                          setShowSortMenu(false);
                        }}
                      >
                        Priority {sortField === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortField === 'title' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          handleSort('title');
                          setShowSortMenu(false);
                        }}
                      >
                        Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortField === 'createdAt' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        onClick={() => {
                          handleSort('createdAt');
                          setShowSortMenu(false);
                        }}
                      >
                        Created Date {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}




      {/* Display different views based on viewMode */}
      {viewMode === 'statistics' ? (
        <TaskStatistics statistics={statistics} />
      ) : viewMode === 'calendar' ? (
        <TaskCalendarView 
          tasks={filteredTasks} 
          currentDate={calendarDate} 
          view={calendarView}
          onDateChange={setCalendarDate}
          onViewChange={setCalendarView}
          onTaskClick={handleTaskClick}
          getTaskTypeIcon={getTaskTypeIcon}
          isOverdue={isOverdue}
        />
      ) : viewMode === 'board' ? (
        <TaskBoardView 
          tasks={filteredTasks}
          onTaskClick={handleTaskClick}
          getTaskTypeIcon={getTaskTypeIcon}
          getPriorityColor={getPriorityColor}
          isOverdue={isOverdue}
          hasActiveDependencies={hasActiveDependencies}
          formatDate={formatDate}
        />
      ) : (
        // Default List view
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {loading ? (
            <div className="px-4 py-12 text-center">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-700"></div>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredTasks.length > 0 ? (
                <>
                  <li className="bg-gray-50 px-4 py-3 flex items-center">
                    <div className="w-10 flex-shrink-0">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                    <div className="flex-1 flex items-center justify-between truncate">
                      <div className="flex-1 px-4 py-2 text-sm">
                        <span className="text-gray-900 font-medium">Task</span>
                      </div>
                      <div className="flex-shrink-0 flex space-x-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Priority</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Due Date</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Assigned To</span>
                        </div>
                        <div className="w-8"></div>
                      </div>
                    </div>
                  </li>
                  {/* Task List Items */}
                  {getCurrentPageTasks().map(task => (
                    <li key={task.id}>
                      <div className="px-4 py-4 flex items-center hover:bg-gray-50">
                        <div className="w-10 flex-shrink-0">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={selectedTaskIds.includes(task.id)}
                            onChange={(e) => handleSelectTask(task.id, e)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div 
                          className="flex-1 flex items-center justify-between cursor-pointer"
                          onClick={() => handleTaskClick(task)}
                        >
                          <div className="flex-1 px-4 py-2 text-sm truncate">
                            <div className="flex items-center">
                              {getTaskTypeIcon(task.type)}
                              <span className="ml-2 font-medium text-gray-900">{task.title}</span>
                              {task.isRecurring && (
                                <Repeat className="ml-2 h-4 w-4 text-indigo-500" title="Recurring task" />
                              )}
                              {task.reminderEnabled && (
                                <Bell className="ml-2 h-4 w-4 text-indigo-500" title="Reminder set" />
                              )}
                              {hasActiveDependencies(task.id) && (
                                <Link className="ml-2 h-4 w-4 text-orange-500" title="Has dependencies" />
                              )}
                              {task.status === 'Completed' && (
                                <CheckCircle className="ml-2 h-4 w-4 text-green-500" title="Completed" />
                              )}
                            </div>
                            <p className="text-gray-500 mt-1 line-clamp-1">{task.description}</p>
                          </div>
                          <div className="flex-shrink-0 flex space-x-4">
                            <div className="flex flex-col">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <time dateTime={task.dueDate} className={`text-sm ${isOverdue(task.dueDate) && task.status !== 'Completed' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                                {formatDate(task.dueDate)}
                              </time>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500">{task.assignedTo}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {task.status !== 'Completed' ? (
                                <button
                                  className="text-gray-400 hover:text-green-500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkComplete(task.id);
                                  }}
                                  title="Mark as complete"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </button>
                              ) : (
                                <button
                                  className="text-green-500"
                                  onClick={(e) => e.stopPropagation()}
                                  title="Completed"
                                  disabled
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </button>
                              )}
                              <button
                                className="text-gray-400 hover:text-indigo-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditTask(task);
                                }}
                          title="Edit task"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <li className="py-12">
                  <div className="text-center">
                    <CheckSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm || filterStatus !== 'All' || filterPriority !== 'All' || filterCategory !== 'All' || filterAssignedTo !== 'All'
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Get started by creating a new task.'}
                    </p>
                    {(searchTerm || filterStatus !== 'All' || filterPriority !== 'All' || filterCategory !== 'All' || filterAssignedTo !== 'All') ? (
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Clear filters
                        </button>
                      </div>
                    ) : (
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={handleAddNewTask}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Plus className="-ml-1 mr-2 h-5 w-5" />
                          New Task
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              )}
            </ul>
          )}

          {/* Pagination - only show if we have tasks */}
          {filteredTasks.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                    Showing <span className="font-medium">{filteredTasks.length > 0 ? (currentPage - 1) * 10 + 1 : 0}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * 10, filteredTasks.length)}</span> of{' '}
                    <span className="font-medium">{filteredTasks.length}</span> results
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
                    {/* Show page numbers - limit to 5 pages */}
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const pageNumber = currentPage <= 3 ? i + 1 : 
                                        currentPage >= totalPages - 1 ? totalPages - 4 + i : 
                                        currentPage - 2 + i;
                      
                      if (pageNumber > 0 && pageNumber <= totalPages) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border ${
                              pageNumber === currentPage
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            } text-sm font-medium`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                      return null;
                    })}
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
          )}
        </div>
      )}




      {/* Task details panel */}
      {showTaskDetails && selectedTask && (
        <TaskDetailsPanel
          task={selectedTask}
          onClose={closeTaskDetails}
          onEdit={() => handleEditTask(selectedTask)}
          onMarkComplete={() => handleMarkComplete(selectedTask.id)}
          onAddReminder={() => handleAddReminder(selectedTask.id)}
          getTaskTypeIcon={getTaskTypeIcon}
          getPriorityColor={getPriorityColor}
          getStatusColor={getStatusColor}
          formatDate={formatDate}
          dependencies={getTaskDependencies(selectedTask.id)}
          tasks={tasks}
        />
      )}

      {/* New/Edit Task Modal */}
      {showNewTaskModal && (
        <NewTaskModal
          taskForm={taskForm}
          onClose={() => setShowNewTaskModal(false)}
          onChange={handleFormChange}
          onSave={handleSaveTask}
          categories={categories}
          teamMembers={teamMembers}
          tasks={tasks}
          isLoading={loading}
        />
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <ReminderModal
          reminderForm={reminderForm}
          onClose={() => setShowReminderModal(false)}
          onChange={(name, value) => setReminderForm({...reminderForm, [name]: value})}
          onSave={handleSaveReminder}
          isLoading={loading}
        />
      )}

      {/* If bulk selection is active, show bulk actions bar */}
      {selectedTaskIds.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-10">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <span className="flex p-2 rounded-lg bg-indigo-800">
                    <CheckSquare className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden">
                      {selectedTaskIds.length} task{selectedTaskIds.length > 1 ? 's' : ''} selected
                    </span>
                    <span className="hidden md:inline">
                      {selectedTaskIds.length} task{selectedTaskIds.length > 1 ? 's' : ''} selected. What would you like to do with them?
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleBulkAction('complete')}
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                    >
                      Mark Complete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBulkAction('assignToMe')}
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                    >
                      Assign to Me
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBulkAction('delete')}
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTaskIds([])}
                    className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Clear selection</span>
                    <X className="h-5 w-5 text-white" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;