// src/components/email/EmailHistory.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal,
  Mail, Eye, Clock, Send, Reply, ArrowUp, Star, Download, Calendar,
  Trash, Archive, Tag, X, ArrowUpRight, RefreshCw, Inbox, AlertTriangle,Paperclip
} from 'lucide-react';

const EmailHistory = ({ contactId = null, dealId = null, showAll = true }) => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterTypeMenu, setShowFilterTypeMenu] = useState(false);
  const [showFilterStatusMenu, setShowFilterStatusMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showEmailDetail, setShowEmailDetail] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch emails (this would be an API call in a real app)
    const fetchEmails = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate mock emails data
      const mockEmails = generateMockEmails(50, contactId, dealId);
      
      setEmails(mockEmails);
      setTotalPages(Math.ceil(mockEmails.length / itemsPerPage));
      setLoading(false);
    };

    fetchEmails();
  }, [contactId, dealId]);

  // Filter and paginate emails whenever filters or search change
  useEffect(() => {
    let result = emails;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(email => 
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (email.from && email.from.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (email.content && email.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(email => email.type === filterType);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(email => email.status === filterStatus);
    }

    // Update filteredEmails
    setFilteredEmails(result);
    
    // Reset to first page whenever filters change
    setCurrentPage(1);
    
    // Update total pages
    setTotalPages(Math.ceil(result.length / itemsPerPage));
  }, [emails, searchTerm, filterType, filterStatus]);

  // Generate mock emails for the demo
  const generateMockEmails = (count, contactId = null, dealId = null) => {
    const types = ['sent', 'received', 'scheduled'];
    const statuses = ['opened', 'unopened', 'replied', 'bounced'];
    const subjects = [
      'Follow-up on our conversation',
      'Product demo request',
      'Meeting confirmation',
      'Your proposal',
      'Invoice for services',
      'Welcome to our platform',
      'Monthly report',
      'Account update required',
      'New feature announcement',
      'Reminder: Upcoming webinar'
    ];
    const domains = ['example.com', 'company.co', 'business.org', 'startup.io', 'enterprise.com'];
    const names = [
      'John Doe', 'Sarah Smith', 'Michael Johnson', 'Emily Wilson', 'David Brown',
      'Jennifer Davis', 'Robert Miller', 'Lisa White', 'James Taylor', 'Amanda Martin'
    ];

    return Array.from({ length: count }, (_, index) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      const firstName = name.split(' ')[0];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const email = `${firstName.toLowerCase()}@${domain}`;
      
      // Create a date within the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      // For scheduled emails, set a future date
      if (type === 'scheduled') {
        date.setDate(new Date().getDate() + Math.floor(Math.random() * 7) + 1);
      }
      
      return {
        id: index + 1,
        type,
        status: type === 'scheduled' ? 'scheduled' : statuses[Math.floor(Math.random() * statuses.length)],
        from: type === 'received' ? email : 'you@yourcompany.com',
        to: type === 'received' ? 'you@yourcompany.com' : email,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        content: `Dear ${firstName},\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl.\n\nBest regards,\nYour Name`,
        date: date.toISOString(),
        hasAttachments: Math.random() > 0.7,
        isStarred: Math.random() > 0.8,
        threadId: Math.floor(Math.random() * 20) + 1,
        contactId: contactId || Math.floor(Math.random() * 100) + 1,
        dealId: dealId || (Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 1 : null),
        template: Math.random() > 0.7 ? subjects[Math.floor(Math.random() * subjects.length)] : null
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilterChange = (type) => {
    setFilterType(type);
    setShowFilterTypeMenu(false);
  };

  const handleStatusFilterChange = (status) => {
    setFilterStatus(status);
    setShowFilterStatusMenu(false);
  };

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

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowEmailDetail(true);
  };

  const closeEmailDetail = () => {
    setShowEmailDetail(false);
    setSelectedEmail(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }
    
    // This year
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    
    // Different year
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'opened':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Eye className="mr-1 h-3 w-3" />
            Opened
          </span>
        );
      case 'unopened':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Mail className="mr-1 h-3 w-3" />
            Unopened
          </span>
        );
      case 'replied':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Reply className="mr-1 h-3 w-3" />
            Replied
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </span>
        );
      case 'bounced':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Bounced
          </span>
        );
      default:
        return null;
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (newSelectAll) {
      // Get IDs of all emails in the current page
      const currentPageEmails = getCurrentPageEmails();
      setSelectedEmails(currentPageEmails.map(email => email.id));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleSelectEmail = (emailId) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  const getCurrentPageEmails = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmails.slice(startIndex, endIndex);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on emails:`, selectedEmails);
    // In a real app, you would call an API to perform the action
    // Then refresh the emails list
    
    // For demo purposes, let's just deselect all
    setSelectedEmails([]);
    setSelectAll(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'sent':
        return <Send className="h-4 w-4 text-indigo-600" />;
      case 'received':
        return <Inbox className="h-4 w-4 text-green-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-purple-600" />;
      default:
        return <Mail className="h-4 w-4 text-gray-400" />;
    }
  };

  const hasBulkSelection = selectedEmails.length > 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Email History</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage your email communications</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="-ml-1 mr-2 h-5 w-5" />
            Refresh
          </button>
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => console.log('Compose new email')}
          >
            <Send className="-ml-1 mr-2 h-5 w-5" />
            New Email
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
              placeholder="Search emails..."
            />
          </div>
          
          <div className="flex space-x-3">
            {/* Type filter */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setShowFilterTypeMenu(!showFilterTypeMenu);
                  if (showFilterStatusMenu) setShowFilterStatusMenu(false);
                }}
              >
                <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                {filterType === 'all' ? 'All Types' : 
                 filterType === 'sent' ? 'Sent' : 
                 filterType === 'received' ? 'Received' : 'Scheduled'}
                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
              </button>

              {showFilterTypeMenu && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterType === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleTypeFilterChange('all')}
                    >
                      All Types
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterType === 'sent' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleTypeFilterChange('sent')}
                    >
                      Sent
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterType === 'received' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleTypeFilterChange('received')}
                    >
                      Received
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterType === 'scheduled' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleTypeFilterChange('scheduled')}
                    >
                      Scheduled
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Status filter */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setShowFilterStatusMenu(!showFilterStatusMenu);
                  if (showFilterTypeMenu) setShowFilterTypeMenu(false);
                }}
              >
                <Tag className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                {filterStatus === 'all' ? 'All Statuses' : 
                 filterStatus === 'opened' ? 'Opened' : 
                 filterStatus === 'unopened' ? 'Unopened' : 
                 filterStatus === 'replied' ? 'Replied' : 
                 filterStatus === 'scheduled' ? 'Scheduled' : 'Bounced'}
                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
              </button>

              {showFilterStatusMenu && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterStatus === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleStatusFilterChange('all')}
                    >
                      All Statuses
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterStatus === 'opened' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleStatusFilterChange('opened')}
                    >
                      Opened
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterStatus === 'unopened' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleStatusFilterChange('unopened')}
                    >
                      Unopened
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterStatus === 'replied' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleStatusFilterChange('replied')}
                    >
                      Replied
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterStatus === 'scheduled' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleStatusFilterChange('scheduled')}
                    >
                      Scheduled
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filterStatus === 'bounced' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      role="menuitem"
                      onClick={() => handleStatusFilterChange('bounced')}
                    >
                      Bounced
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      {hasBulkSelection && (
        <div className="bg-indigo-50 shadow rounded-lg mb-4 p-4 flex justify-between items-center">
          <div className="text-sm text-indigo-700">
            <span className="font-medium">{selectedEmails.length}</span> emails selected
          </div>
          <div className="flex space-x-2">
            <button
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleBulkAction('archive')}
            >
              <Archive className="mr-1.5 h-4 w-4" />
              Archive
            </button>
            <button
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => handleBulkAction('delete')}
            >
              <Trash className="mr-1.5 h-4 w-4" />
              Delete
            </button>
            <button
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={() => handleBulkAction('markAsRead')}
            >
              <Eye className="mr-1.5 h-4 w-4" />
              Mark as Read
            </button>
          </div>
        </div>
      )}

      {/* Email list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="py-12 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-700"></div>
            </div>
            <p className="mt-4 text-gray-500">Loading emails...</p>
          </div>
        ) : (
          <>
            {filteredEmails.length > 0 ? (
              <>
                <div className="min-w-full divide-y divide-gray-200">
                  <div className="bg-gray-50 border-b">
                    <div className="flex py-3 px-4">
                      <div className="w-10 flex-shrink-0">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                      <div className="w-44 sm:w-64 flex-shrink-0 flex items-center">
                        <span className="text-xs font-medium text-gray-500 uppercase">From / To</span>
                      </div>
                      <div className="flex-1 flex items-center">
                        <span className="text-xs font-medium text-gray-500 uppercase">Subject</span>
                      </div>
                      <div className="w-24 flex-shrink-0 flex items-center justify-end">
                        <span className="text-xs font-medium text-gray-500 uppercase">Date</span>
                      </div>
                      <div className="w-20 flex-shrink-0"></div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {getCurrentPageEmails().map((email) => (
                      <div
                        key={email.id}
                        className={`cursor-pointer hover:bg-gray-50 ${selectedEmails.includes(email.id) ? 'bg-indigo-50' : ''}`}
                      >
                        <div className="flex py-4 px-4">
                          <div className="w-10 flex-shrink-0 flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              checked={selectedEmails.includes(email.id)}
                              onChange={() => handleSelectEmail(email.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div
                            className="flex-1 flex items-center"
                            onClick={() => handleEmailClick(email)}
                          >
                            <div className="w-44 sm:w-64 flex-shrink-0">
                              <div className="flex items-center">
                                {getTypeIcon(email.type)}
                                <div className="ml-2 overflow-hidden">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {email.type === 'received' ? email.from : email.to}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {email.type === 'received' ? 'From' : 'To'}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 mr-4">
                              <p className="text-sm font-medium text-gray-900">{email.subject}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {email.content.substring(0, 100)}...
                              </p>
                            </div>
                            <div className="w-24 flex-shrink-0 text-right">
                              <p className="text-sm text-gray-500">{formatDate(email.date)}</p>
                            </div>
                            <div className="w-20 flex-shrink-0 flex justify-end items-center space-x-2">
                              {email.hasAttachments && (
                                <Paperclip className="h-4 w-4 text-gray-400" />
                              )}
                              {getStatusBadge(email.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination */}
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
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * itemsPerPage, filteredEmails.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredEmails.length}</span> results
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
                        {/* Show page numbers */}
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => 
                          currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i
                        ).map((page) => (
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
              </>
            ) : (
              <div className="py-12 text-center">
                <Mail className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No emails found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'Your email history will appear here.'}
                </p>
                {(searchTerm || filterType !== 'all' || filterStatus !== 'all') && (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setFilterType('all');
                        setFilterStatus('all');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Email detail slide-over */}
      {showEmailDetail && selectedEmail && (
        <div className="fixed inset-0 overflow-hidden z-50" aria-labelledby="email-detail" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeEmailDetail}></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-screen max-w-2xl">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                        Email Details
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={closeEmailDetail}
                        >
                          <span className="sr-only">Close panel</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="border-b border-gray-200 pb-5">
                        <h3 className="text-lg font-medium text-gray-900">{selectedEmail.subject}</h3>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500">
                              {selectedEmail.type === 'received' ? 'From: ' : 'To: '}
                              <span className="font-medium">
                                {selectedEmail.type === 'received' ? selectedEmail.from : selectedEmail.to}
                              </span>
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(selectedEmail.date).toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-1 flex items-center space-x-4">
                          {getStatusBadge(selectedEmail.status)}
                          {selectedEmail.template && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Template: {selectedEmail.template}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6 prose prose-sm max-w-none text-gray-500">
                        {selectedEmail.content.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                      
                      {selectedEmail.hasAttachments && (
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-900">Attachments</h4>
                          <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                            <li className="py-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <Paperclip className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                <span className="ml-2 flex-1 truncate text-sm">
                                  document.pdf
                                </span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Download
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => console.log('Reply to email', selectedEmail.id)}
                      >
                        <Reply className="-ml-1 mr-2 h-5 w-5" />
                        Reply
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => console.log('Forward email', selectedEmail.id)}
                      >
                        <ArrowUpRight className="-ml-1 mr-2 h-5 w-5" />
                        Forward
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => console.log('Delete email', selectedEmail.id)}
                      >
                        <Trash className="-ml-1 mr-2 h-5 w-5" />
                        Delete
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

export default EmailHistory;