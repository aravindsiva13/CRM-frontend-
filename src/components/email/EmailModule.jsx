// src/components/email/EmailModule.jsx
import React, { useState } from 'react';
import { 
  Send, Inbox, Clock, BarChart2, 
  FileText, Settings, Plus, X
} from 'lucide-react';
import EmailDashboard from './EmailDashboard';
import EmailHistory from './EmailHistory';
import EmailTemplates from './EmailTemplates';
import EmailComposer from './EmailComposer';

const EmailModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showComposer, setShowComposer] = useState(false);
  const [emailToCompose, setEmailToCompose] = useState({
    recipient: '',
    subject: '',
    content: '',
    mode: 'compose'
  });

  const handleOpenComposer = (mode = 'compose', data = {}) => {
    setEmailToCompose({
      recipient: data.recipient || '',
      subject: data.subject || '',
      content: data.content || '',
      mode,
      emailToReply: data.emailToReply || null
    });
    setShowComposer(true);
  };

  const closeComposer = () => {
    setShowComposer(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Email</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => handleOpenComposer()}
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Compose Email
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="dashboard">Dashboard</option>
            <option value="inbox">Inbox</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="templates">Templates</option>
            <option value="settings">Settings</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`${
                  activeTab === 'dashboard'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('inbox')}
                className={`${
                  activeTab === 'inbox'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Inbox className="mr-2 h-5 w-5" />
                Inbox
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`${
                  activeTab === 'sent'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Send className="mr-2 h-5 w-5" />
                Sent
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`${
                  activeTab === 'scheduled'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Clock className="mr-2 h-5 w-5" />
                Scheduled
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`${
                  activeTab === 'templates'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FileText className="mr-2 h-5 w-5" />
                Templates
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'dashboard' && <EmailDashboard />}
        {activeTab === 'inbox' && <EmailHistory filterType="received" />}
        {activeTab === 'sent' && <EmailHistory filterType="sent" />}
        {activeTab === 'scheduled' && <EmailHistory filterType="scheduled" />}
        {activeTab === 'templates' && <EmailTemplates />}
        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Email Settings</h2>
            
            <div className="space-y-6">
              {/* Email Account Settings */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Email Accounts</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">you@yourcompany.com</p>
                      <p className="text-xs text-gray-500">Primary account</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-0.5 mr-2 h-4 w-4" />
                    Add Account
                  </button>
                </div>
              </div>
              
              {/* Email Signature */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Email Signature</h3>
                <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4">
                  <div className="prose prose-sm">
                    <p><strong>Your Name</strong></p>
                    <p>Position | Company</p>
                    <p>Email: you@yourcompany.com</p>
                    <p>Phone: (123) 456-7890</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Signature
                  </button>
                </div>
              </div>
              
              {/* Notification Preferences */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        Email notifications
                      </label>
                      <p className="text-gray-500">
                        Receive notifications for new emails, replies, and email opens.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="browser-notifications"
                        name="browser-notifications"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="browser-notifications" className="font-medium text-gray-700">
                        Browser notifications
                      </label>
                      <p className="text-gray-500">
                        Show browser notifications when new emails arrive.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="daily-digest"
                        name="daily-digest"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="daily-digest" className="font-medium text-gray-700">
                        Daily digest
                      </label>
                      <p className="text-gray-500">
                        Receive a daily summary of your email activity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Save button */}
              <div className="border-t border-gray-200 pt-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Email Composer */}
      {showComposer && (
        <EmailComposer
          isOpen={showComposer}
          onClose={closeComposer}
          initialRecipient={emailToCompose.recipient}
          initialSubject={emailToCompose.subject}
          initialContent={emailToCompose.content}
          mode={emailToCompose.mode}
          emailToReply={emailToCompose.emailToReply}
        />
      )}
    </div>
  );
};

export default EmailModule;