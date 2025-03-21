// src/components/Leads.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal,
  Phone, Mail, Edit, Trash, ArrowUpDown, X, Users, Briefcase, DollarSign,
  Calendar, Clock, Clipboard
} from 'lucide-react';
import mockApiService from '../utils/mockApi';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [view, setView] = useState('list'); // 'list' or 'kanban'

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await mockApiService.getLeads(currentPage, 10);
        setLeads(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
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

  const handleLeadClick = async (lead) => {
    try {
      setLoading(true);
      const response = await mockApiService.getLeadById(lead.id);
      setSelectedLead(response.data);
      setShowLeadDetails(true);
    } catch (error) {
      console.error("Error fetching lead details:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeLeadDetails = () => {
    setShowLeadDetails(false);
    setSelectedLead(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLeads = leads.filter(lead => 
    (filterStage === 'All' || lead.stage === filterStage) &&
    (searchTerm === '' || 
      lead.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // All possible stages for filtering
  const stageOptions = ['All', 'New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  // Group leads by stage for kanban view
  const leadsByStage = stageOptions.slice(1).reduce((acc, stage) => {
    acc[stage] = filteredLeads.filter(lead => lead.stage === stage);
    return acc;
  }, {});

  const getStageColor = (stage) => {
    switch(stage) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Qualified': return 'bg-purple-100 text-purple-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leads & Deals</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your sales pipeline</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Lead
          </button>
          <div className="flex border border-gray-300 rounded-md shadow-sm overflow-hidden">
            <button 
              onClick={() => setView('list')} 
              className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                view === 'list' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clipboard className="-ml-1 mr-2 h-5 w-5" />
              List
            </button>
            <button 
              onClick={() => setView('kanban')} 
              className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                view === 'kanban' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Briefcase className="-ml-1 mr-2 h-5 w-5" />
              Pipeline
            </button>
          </div>
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
              placeholder="Search leads and deals..."
            />
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                {filterStage === 'All' ? 'All Stages' : filterStage}
                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
              </button>

              {showFilterMenu && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {stageOptions.map((stage) => (
                      <button
                        key={stage}
                        onClick={() => {
                          setFilterStage(stage);
                          setShowFilterMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStage === stage ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        role="menuitem"
                      >
                        {stage}
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

      {/* List View */}
      {view === 'list' && (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {loading ? (
                  <div className="bg-white px-4 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-700"></div>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lead
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stage
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expected Close
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeads.map((lead) => (
                        <tr 
                          key={lead.id} 
                          onClick={() => handleLeadClick(lead)}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-700 font-medium">{lead.company.charAt(0)}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{lead.company}</div>
                                <div className="text-sm text-gray-500">{lead.contactName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${lead.value.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(lead.stage)}`}>
                              {lead.stage}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lead.owner}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(lead.expectedCloseDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900" onClick={(e) => e.stopPropagation()}>
                                <Phone size={16} />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900" onClick={(e) => e.stopPropagation()}>
                                <Mail size={16} />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {!loading && filteredLeads.length === 0 && (
                  <div className="bg-white px-4 py-12 text-center">
                    <p className="text-gray-500">No leads found. Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            </div>
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
                  <span className="font-medium">{Math.min(currentPage * 10, leads.length)}</span> of{' '}
                  <span className="font-medium">{leads.length}</span> results
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
        </div>
      )}

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="flex overflow-x-auto pb-4 space-x-4" style={{ minHeight: '60vh' }}>
          {Object.entries(leadsByStage).map(([stage, stageLeads]) => (
            <div key={stage} className="flex-shrink-0 w-72">
              <div className="bg-gray-100 rounded-lg shadow">
                <div className="p-3 flex justify-between items-center border-b border-gray-200">
                  <h3 className="text-sm font-medium">
                    <span className={`px-2 py-1 rounded-full ${getStageColor(stage)}`}>{stage}</span>
                    <span className="ml-2 text-gray-600">{stageLeads.length}</span>
                  </h3>
                  {stage !== 'Closed Won' && stage !== 'Closed Lost' && (
                    <button className="text-gray-400 hover:text-gray-500">
                      <Plus size={16} />
                    </button>
                  )}
                </div>
                <div className="p-2 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                  {stageLeads.map((lead) => (
                    <div 
                      key={lead.id}
                      onClick={() => handleLeadClick(lead)}
                      className="bg-white p-3 rounded shadow-sm cursor-pointer hover:shadow-md"
                    >
                      <div className="font-medium text-gray-900">{lead.company}</div>
                      <div className="text-sm text-gray-500 mt-1">{lead.contactName}</div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm font-medium text-gray-900">${lead.value.toLocaleString()}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          {new Date(lead.expectedCloseDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center mt-3 text-xs">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-indigo-600 h-1.5 rounded-full" 
                            style={{ width: `${lead.probability}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-gray-600">{lead.probability}%</span>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="bg-white p-3 rounded shadow-sm text-gray-500 text-sm text-center">
                      No leads in this stage
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lead detail slide-over */}
      {showLeadDetails && selectedLead && (
        <div className="fixed inset-0 overflow-hidden z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeLeadDetails}></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                        Deal Details
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={closeLeadDetails}
                        >
                          <span className="sr-only">Close panel</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <div className="flex items-center mb-6">
                          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                            <span className="text-indigo-700 text-xl font-bold">{selectedLead.company.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{selectedLead.company}</h3>
                            <p className="text-sm text-gray-500">{selectedLead.contactName}</p>
                          </div>
                        </div>

                        <div className="flex space-x-3 mb-6">
                          <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </button>
                          <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </button>
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                          <div className="mb-6">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(selectedLead.stage)}`}>
                              {selectedLead.stage}
                            </span>
                            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${selectedLead.probability}%` }}
                              ></div>
                            </div>
                            <div className="mt-1 text-sm text-gray-500 flex justify-between">
                              <span>{selectedLead.probability}% probability</span>
                              <span>Expected close: {new Date(selectedLead.expectedCloseDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedLead.contactName}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Email</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedLead.email}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Phone</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedLead.phone}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Owner</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedLead.owner}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Source</dt>
                              <dd className="mt-1 text-sm text-gray-900">{selectedLead.source}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Deal Value</dt>
                              <dd className="mt-1 text-sm text-gray-900">${selectedLead.value.toLocaleString()}</dd>
                            </div>
                            <div className="sm:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Created Date</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {new Date(selectedLead.createdAt).toLocaleString()}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Activities</h4>
                          <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">Email sent</p>
                                  <p className="text-sm text-gray-500">
                                    Proposal document shared with client
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">Call completed</p>
                                  <p className="text-sm text-gray-500">
                                    Initial discovery call with decision makers
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">1 week ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="mt-4 block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            View all activity
                          </button>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Next Steps</h4>
                          <div className="space-y-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                  <span className="text-sm font-medium text-gray-900">Follow-up Meeting</span>
                                </div>
                                <span className="text-xs text-gray-500">Tomorrow, 10:00 AM</span>
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                Discuss technical requirements and implementation timeline
                              </p>
                            </div>
                          </div>
                          <button className="mt-4 block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Add task
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between space-x-3">
                      <button
                        type="button"
                        className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={closeLeadDetails}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Move to Next Stage
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;