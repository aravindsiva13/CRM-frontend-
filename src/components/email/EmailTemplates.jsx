// src/components/email/EmailTemplates.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit, Trash, File, Check,
  X, ChevronDown, ChevronUp, Folder, Copy
} from 'lucide-react';

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Form state for adding/editing template
  const [formState, setFormState] = useState({
    name: '',
    category: '',
    subject: '',
    content: '',
    isActive: true
  });

  // Mock template data
  useEffect(() => {
    // In a real app, this would be fetched from your API
    const mockTemplates = [
      { id: 1, name: 'Welcome Email', category: 'Onboarding', subject: 'Welcome to our service!', content: 'Dear {firstName},\n\nThank you for choosing our service. We\'re excited to have you on board!\n\nBest regards,\n{yourName}', isActive: true, lastUsed: '2023-08-15T12:30:00Z', createdAt: '2023-01-10T09:00:00Z' },
      { id: 2, name: 'Follow-up', category: 'Sales', subject: 'Following up on our conversation', content: 'Hello {firstName},\n\nI wanted to follow up on our recent discussion about {topic}.\n\nLooking forward to your response,\n{yourName}', isActive: true, lastUsed: '2023-09-01T15:45:00Z', createdAt: '2023-02-05T14:20:00Z' },
      { id: 3, name: 'Meeting Request', category: 'Sales', subject: 'Request for a meeting', content: 'Hello {firstName},\n\nI would like to schedule a meeting to discuss {topic}.\n\nWould you be available on {proposedDate} at {proposedTime}?\n\nBest regards,\n{yourName}', isActive: true, lastUsed: '2023-08-28T10:15:00Z', createdAt: '2023-03-18T11:30:00Z' },
      { id: 4, name: 'Thank You', category: 'General', subject: 'Thank you for your time', content: 'Dear {firstName},\n\nI appreciate you taking the time to meet with me yesterday. It was a pleasure discussing {topic}.\n\nBest regards,\n{yourName}', isActive: true, lastUsed: '2023-08-10T09:30:00Z', createdAt: '2023-04-22T16:45:00Z' },
      { id: 5, name: 'Proposal', category: 'Sales', subject: 'Proposal for {company}', content: 'Dear {firstName},\n\nPlease find attached our proposal for {project}.\n\nFeel free to reach out if you have any questions.\n\nBest regards,\n{yourName}', isActive: true, lastUsed: null, createdAt: '2023-05-15T13:10:00Z' },
      { id: 6, name: 'Invoice', category: 'Billing', subject: 'Invoice {invoiceNumber} for {company}', content: 'Dear {firstName},\n\nPlease find attached your invoice {invoiceNumber} for {service}.\n\nPayment is due by {dueDate}.\n\nThank you for your business,\n{yourName}', isActive: false, lastUsed: '2023-07-05T08:20:00Z', createdAt: '2023-06-01T10:00:00Z' },
    ];

    setTemplates(mockTemplates);
    setFilteredTemplates(mockTemplates);
    
    // Extract unique categories
    const uniqueCategories = ['All', ...new Set(mockTemplates.map(template => template.category))];
    setCategories(uniqueCategories);
  }, []);

  // Filter templates based on search term and category
  useEffect(() => {
    let filtered = templates;
    
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(template => template.category === categoryFilter);
    }
    
    setFilteredTemplates(filtered);
  }, [searchTerm, categoryFilter, templates]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNew = () => {
    setTemplateToEdit(null);
    setFormState({
      name: '',
      category: '',
      subject: '',
      content: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleEdit = (template) => {
    setTemplateToEdit(template);
    setFormState({
      name: template.name,
      category: template.category,
      subject: template.subject,
      content: template.content,
      isActive: template.isActive
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveTemplate = () => {
    // Validate form
    if (!formState.name.trim() || !formState.subject.trim() || !formState.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (templateToEdit) {
      // Update existing template
      const updatedTemplates = templates.map(template => 
        template.id === templateToEdit.id ? { ...template, ...formState } : template
      );
      setTemplates(updatedTemplates);
    } else {
      // Add new template
      const newTemplate = {
        id: Date.now(),
        ...formState,
        createdAt: new Date().toISOString(),
        lastUsed: null
      };
      setTemplates([...templates, newTemplate]);
      
      // Add new category if it doesn't exist
      if (formState.category && !categories.includes(formState.category)) {
        setCategories([...categories, formState.category]);
      }
    }
    
    setShowModal(false);
  };

  const handleDeleteClick = (template) => {
    setTemplateToDelete(template);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      setTemplates(templates.filter(template => template.id !== templateToDelete.id));
      setIsDeleteModalOpen(false);
      setTemplateToDelete(null);
    }
  };

  const duplicateTemplate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      lastUsed: null
    };
    setTemplates([...templates, duplicatedTemplate]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Email Templates</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage reusable email templates</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleAddNew}
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Template
        </button>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative rounded-md shadow-sm flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Folder className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
              {categoryFilter}
              <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
            </button>
          </div>

          {showCategoryDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      categoryFilter === category ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } hover:bg-gray-100 hover:text-gray-900`}
                    role="menuitem"
                    onClick={() => {
                      setCategoryFilter(category);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Templates list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <li key={template.id} className={`${!template.isActive ? 'bg-gray-50' : ''}`}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <File className={`flex-shrink-0 h-5 w-5 ${template.isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <p className="ml-2 text-sm font-medium text-gray-900">{template.name}</p>
                      {!template.isActive && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => duplicateTemplate(template)}
                        title="Duplicate template"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleEdit(template)}
                        title="Edit template"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => handleDeleteClick(template)}
                        title="Delete template"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Subject: {template.subject}
                      </p>
                      {template.category && (
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          Category: {template.category}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Last used: {formatDate(template.lastUsed)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {template.content}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="py-12">
              <div className="text-center">
                <File className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No templates found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || categoryFilter !== 'All'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by creating a new template.'}
                </p>
                {(searchTerm || categoryFilter !== 'All') ? (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setCategoryFilter('All');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleAddNew}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="-ml-1 mr-2 h-5 w-5" />
                      New Template
                    </button>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Add/Edit Template Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {templateToEdit ? 'Edit Template' : 'New Template'}
                  </h3>
                  <div className="mt-4">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Template Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formState.name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <input
                          type="text"
                          name="category"
                          id="category"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formState.category}
                          onChange={handleFormChange}
                          list="category-options"
                        />
                        <datalist id="category-options">
                          {categories.filter(c => c !== 'All').map(category => (
                            <option key={category} value={category} />
                          ))}
                        </datalist>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Email Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formState.subject}
                          onChange={handleFormChange}
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Use {'{placeholder}'} for dynamic content (e.g., {'{firstName}'})
                        </p>
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                          Email Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          rows={8}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formState.content}
                          onChange={handleFormChange}
                          required
                        ></textarea>
                        <p className="mt-1 text-xs text-gray-500">
                          Use {'{placeholder}'} for dynamic content (e.g., {'{firstName}'}, {'{company}'})
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="is-active"
                          name="isActive"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={formState.isActive}
                          onChange={handleFormChange}
                        />
                        <label htmlFor="is-active" className="ml-2 block text-sm text-gray-900">
                          Template is active
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveTemplate}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && templateToDelete && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsDeleteModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Trash className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete Template
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the template "{templateToDelete.name}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
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

export default EmailTemplates;