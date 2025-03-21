// src/components/Settings.jsx
import React, { useState } from 'react';
import { 
  User, Users, Bell, Lock, Database, Globe, 
  CreditCard, Mail, Phone, LogOut, Check, 
  Save, UserPlus, Briefcase
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    push: true,
    sms: false,
    leadAssigned: true,
    taskReminders: true,
    dealUpdates: true
  });

  const handleNotificationChange = (key) => {
    setNotificationsEnabled({
      ...notificationsEnabled,
      [key]: !notificationsEnabled[key]
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account and application preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 lg:shrink-0 mb-6 lg:mb-0">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 flex items-center text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-3 flex items-center text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-3 flex items-center text-sm font-medium ${
                  activeTab === 'security'
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                Security & Password
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-4 py-3 flex items-center text-sm font-medium ${
                  activeTab === 'team'
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Team Members
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`px-4 py-3 flex items-center text-sm font-medium ${
                  activeTab === 'data'
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Database className="mr-3 h-5 w-5" />
                Data Management
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`px-4 py-3 flex items-center text-sm font-medium ${
                  activeTab === 'integrations'
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Globe className="mr-3 h-5 w-5" />
                Integrations
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-4 py-3 flex items-center text-sm font-medium ${
                  activeTab === 'billing'
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <CreditCard className="mr-3 h-5 w-5" />
                Billing & Subscription
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 lg:ml-6">
          <div className="bg-white shadow rounded-lg">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">Update your personal information</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-5 mb-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          className="h-24 w-24 rounded-full object-cover"
                          src="https://i.pravatar.cc/150?img=68"
                          alt="Profile"
                        />
                        <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900">Emma Wilson</h2>
                      <p className="text-sm text-gray-500">Sales Manager</p>
                      <button className="mt-2 px-3 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            defaultValue="Emma"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            defaultValue="Wilson"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue="emma.wilson@example.com"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone number
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            defaultValue="+1 (555) 987-6543"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">
                          Job title
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="job-title"
                            id="job-title"
                            defaultValue="Sales Manager"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            defaultValue="I'm a sales manager with 5+ years of experience in the SaaS industry. Specialized in building and leading high-performing sales teams."
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          ></textarea>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-4 py-2 mr-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Save className="-ml-1 mr-2 h-4 w-4" />
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div>
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage how you receive notifications</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900">Notification Methods</h4>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleNotificationChange('email')}
                            className={`${
                              notificationsEnabled.email
                                ? 'bg-indigo-600'
                                : 'bg-gray-200'
                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <span className="sr-only">Enable email notifications</span>
                            <span
                              className={`${
                                notificationsEnabled.email ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                            >
                              <span
                                className={`${
                                  notificationsEnabled.email
                                    ? 'opacity-0 ease-out duration-100'
                                    : 'opacity-100 ease-in duration-200'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              ></span>
                              <span
                                className={`${
                                  notificationsEnabled.email
                                    ? 'opacity-100 ease-in duration-200'
                                    : 'opacity-0 ease-out duration-100'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              >
                                <Check className="h-3 w-3 text-indigo-600" />
                              </span>
                            </span>
                          </button>
                          <Mail className="ml-3 h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
                        </div>

                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleNotificationChange('push')}
                            className={`${
                              notificationsEnabled.push
                                ? 'bg-indigo-600'
                                : 'bg-gray-200'
                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <span className="sr-only">Enable push notifications</span>
                            <span
                              className={`${
                                notificationsEnabled.push ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                            >
                              <span
                                className={`${
                                  notificationsEnabled.push
                                    ? 'opacity-0 ease-out duration-100'
                                    : 'opacity-100 ease-in duration-200'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              ></span>
                              <span
                                className={`${
                                  notificationsEnabled.push
                                    ? 'opacity-100 ease-in duration-200'
                                    : 'opacity-0 ease-out duration-100'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              >
                                <Check className="h-3 w-3 text-indigo-600" />
                              </span>
                            </span>
                          </button>
                          <Bell className="ml-3 h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
                        </div>

                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleNotificationChange('sms')}
                            className={`${
                              notificationsEnabled.sms
                                ? 'bg-indigo-600'
                                : 'bg-gray-200'
                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <span className="sr-only">Enable SMS notifications</span>
                            <span
                              className={`${
                                notificationsEnabled.sms ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                            >
                              <span
                                className={`${
                                  notificationsEnabled.sms
                                    ? 'opacity-0 ease-out duration-100'
                                    : 'opacity-100 ease-in duration-200'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              ></span>
                              <span
                                className={`${
                                  notificationsEnabled.sms
                                    ? 'opacity-100 ease-in duration-200'
                                    : 'opacity-0 ease-out duration-100'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              >
                                <Check className="h-3 w-3 text-indigo-600" />
                              </span>
                            </span>
                          </button>
                          <Phone className="ml-3 h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-700">SMS Notifications</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-md font-medium text-gray-900">Notification Preferences</h4>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleNotificationChange('leadAssigned')}
                            className={`${
                              notificationsEnabled.leadAssigned
                                ? 'bg-indigo-600'
                                : 'bg-gray-200'
                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <span className="sr-only">Enable lead assigned notifications</span>
                            <span
                              className={`${
                                notificationsEnabled.leadAssigned ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                            >
                              <span
                                className={`${
                                  notificationsEnabled.leadAssigned
                                    ? 'opacity-0 ease-out duration-100'
                                    : 'opacity-100 ease-in duration-200'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              ></span>
                              <span
                                className={`${
                                  notificationsEnabled.leadAssigned
                                    ? 'opacity-100 ease-in duration-200'
                                    : 'opacity-0 ease-out duration-100'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              >
                                <Check className="h-3 w-3 text-indigo-600" />
                              </span>
                            </span>
                          </button>
                          <span className="ml-3 text-sm text-gray-700">New lead assigned to you</span>
                        </div>

                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleNotificationChange('taskReminders')}
                            className={`${
                              notificationsEnabled.taskReminders
                                ? 'bg-indigo-600'
                                : 'bg-gray-200'
                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <span className="sr-only">Enable task reminder notifications</span>
                            <span
                              className={`${
                                notificationsEnabled.taskReminders ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                            >
                              <span
                                className={`${
                                  notificationsEnabled.taskReminders
                                    ? 'opacity-0 ease-out duration-100'
                                    : 'opacity-100 ease-in duration-200'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              ></span>
                              <span
                                className={`${
                                  notificationsEnabled.taskReminders
                                    ? 'opacity-100 ease-in duration-200'
                                    : 'opacity-0 ease-out duration-100'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              >
                                <Check className="h-3 w-3 text-indigo-600" />
                              </span>
                            </span>
                          </button>
                          <span className="ml-3 text-sm text-gray-700">Task reminders</span>
                        </div>

                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleNotificationChange('dealUpdates')}
                            className={`${
                              notificationsEnabled.dealUpdates
                                ? 'bg-indigo-600'
                                : 'bg-gray-200'
                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <span className="sr-only">Enable deal update notifications</span>
                            <span
                              className={`${
                                notificationsEnabled.dealUpdates ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                            >
                              <span
                                className={`${
                                  notificationsEnabled.dealUpdates
                                    ? 'opacity-0 ease-out duration-100'
                                    : 'opacity-100 ease-in duration-200'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              ></span>
                              <span
                                className={`${
                                  notificationsEnabled.dealUpdates
                                    ? 'opacity-100 ease-in duration-200'
                                    : 'opacity-0 ease-out duration-100'
                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                aria-hidden="true"
                              >
                                <Check className="h-3 w-3 text-indigo-600" />
                              </span>
                            </span>
                          </button>
                          <span className="ml-3 text-sm text-gray-700">Deal status updates</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Save className="-ml-1 mr-2 h-4 w-4" />
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Members */}
            {activeTab === 'team' && (
              <div>
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Team Members</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage your team and user permissions</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900">Current Team Members</h4>
                      <p className="text-sm text-gray-500">Total members: 5</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <UserPlus className="-ml-1 mr-2 h-4 w-4" />
                      Invite User
                    </button>
                  </div>

                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Role
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Email
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://i.pravatar.cc/150?img=68"
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">Emma Wilson</div>
                                <div className="text-gray-500">You</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">Sales Manager</div>
                            <div className="text-gray-500">Admin</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            emma.wilson@example.com
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://i.pravatar.cc/150?img=12"
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">Michael Johnson</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">Sales Representative</div>
                            <div className="text-gray-500">Member</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            michael.johnson@example.com
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://i.pravatar.cc/150?img=32"
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">Sarah Smith</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">Marketing Specialist</div>
                            <div className="text-gray-500">Member</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            sarah.smith@example.com
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Content for other tabs can be added here */}
            {(activeTab === 'security' || activeTab === 'data' || activeTab === 'integrations' || activeTab === 'billing') && (
              <div className="px-4 py-16 sm:px-6 text-center">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">This section is under development</h3>
                <p className="mt-1 text-sm text-gray-500">
                  We're working on this feature and it will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;