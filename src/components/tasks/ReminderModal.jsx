// src/components/ReminderModal.jsx
import React from 'react';
import { X, Bell, Mail } from 'lucide-react';

const ReminderModal = ({ reminderForm, onClose, onChange, onSave, isLoading }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Set Reminder
                </h3>
                <div className="mt-4">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Remind me
                      </label>
                      <div className="mt-1 grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="number"
                            name="time"
                            min="1"
                            value={reminderForm.time}
                            onChange={(e) => onChange('time', e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <select
                            name="unit"
                            value={reminderForm.unit}
                            onChange={(e) => onChange('unit', e.target.value)}
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="minutes">minutes</option>
                            <option value="hours">hours</option>
                            <option value="days">days</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        before the task is due
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Notification method
                      </label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="method-app"
                            name="method"
                            type="radio"
                            value="app"
                            checked={reminderForm.method === 'app'}
                            onChange={(e) => onChange('method', e.target.value)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="method-app" className="ml-3 block text-sm font-medium text-gray-700">
                            In-app notification
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="method-email"
                            name="method"
                            type="radio"
                            value="email"
                            checked={reminderForm.method === 'email'}
                            onChange={(e) => onChange('method', e.target.value)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="method-email" className="ml-3 block text-sm font-medium text-gray-700">
                            Email notification
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="method-both"
                            name="method"
                            type="radio"
                            value="both"
                            checked={reminderForm.method === 'both'}
                            onChange={(e) => onChange('method', e.target.value)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="method-both" className="ml-3 block text-sm font-medium text-gray-700">
                            Both
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onSave}
              disabled={isLoading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {isLoading ? 'Saving...' : 'Save Reminder'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;