// src/components/email/EmailComposer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, Paperclip, ChevronDown, Plus, 
  Save, Clock, User, Users, Trash, Template,List
} from 'lucide-react';

const EmailComposer = ({ 
  isOpen, 
  onClose, 
  initialRecipient = '',
  initialSubject = '',
  initialContent = '',
  contactId = null,
  dealId = null,
  mode = 'compose', // 'compose', 'reply', 'forward'
  emailToReply = null
}) => {
  // State for email composition
  const [to, setTo] = useState(initialRecipient);
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [content, setContent] = useState(initialContent);
  const [attachments, setAttachments] = useState([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  // Prepare templates data
  useEffect(() => {
    // In a real app, these would come from your API
    setTemplates([
      { id: 1, name: 'Welcome Email', subject: 'Welcome to our service', content: 'Thank you for choosing our service...' },
      { id: 2, name: 'Follow-up', subject: 'Following up on our conversation', content: 'I wanted to follow up on our recent discussion...' },
      { id: 3, name: 'Meeting Request', subject: 'Request for a meeting', content: 'I would like to schedule a meeting to discuss...' },
      { id: 4, name: 'Thank You', subject: 'Thank you for your time', content: 'I appreciate you taking the time to meet with me...' },
    ]);
  }, []);

  // Prepare reply or forward data
  useEffect(() => {
    if (mode === 'reply' && emailToReply) {
      setTo(emailToReply.from);
      setSubject(`Re: ${emailToReply.subject}`);
      setContent(`\n\n-------- Original Message --------\nFrom: ${emailToReply.from}\nDate: ${new Date(emailToReply.date).toLocaleString()}\nSubject: ${emailToReply.subject}\n\n${emailToReply.content}`);
    } else if (mode === 'forward' && emailToReply) {
      setSubject(`Fwd: ${emailToReply.subject}`);
      setContent(`\n\n-------- Forwarded Message --------\nFrom: ${emailToReply.from}\nDate: ${new Date(emailToReply.date).toLocaleString()}\nSubject: ${emailToReply.subject}\n\n${emailToReply.content}`);
    }
  }, [mode, emailToReply]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // Add new attachments to the list
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }));
    
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };

  const applyTemplate = (template) => {
    setSubject(template.subject);
    setContent(template.content);
    setShowTemplates(false);
  };

  const handleSend = async () => {
    if (!to.trim()) {
      alert('Please enter at least one recipient.');
      return;
    }

    try {
      setIsSending(true);

      // In a real app, you would send the email through your API
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const emailData = {
        to,
        cc,
        bcc,
        subject,
        content,
        attachments: attachments.map(att => ({
          id: att.id,
          name: att.name,
          size: att.size,
          type: att.type
        })),
        sentAt: new Date().toISOString(),
        contactId,
        dealId,
        status: scheduleDate ? 'scheduled' : 'sent',
        scheduledFor: scheduleDate && scheduleTime ? 
          new Date(`${scheduleDate}T${scheduleTime}`).toISOString() : null
      };

      console.log('Email sent:', emailData);
      
      // Close the composer after sending
      onClose();
      
      // In a real app, you might want to show a success message or update the UI
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      alert('Please select both date and time for scheduling.');
      return;
    }
    
    handleSend();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50" aria-labelledby="email-composer" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div className="pointer-events-auto w-screen max-w-2xl">
            <div className="flex h-full flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {mode === 'compose' ? 'New Email' : mode === 'reply' ? 'Reply' : 'Forward Email'}
                </h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Email Form */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {/* Recipients */}
                  <div>
                    <div className="flex items-center">
                      <label htmlFor="email-to" className="block text-sm font-medium text-gray-700 w-16">To:</label>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          id="email-to"
                          className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                          placeholder="Enter recipients"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        />
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-700 hover:text-indigo-900"
                          onClick={() => {
                            setShowCc(!showCc);
                            setShowBcc(false);
                          }}
                        >
                          {showCc ? 'Hide CC' : 'CC'}
                        </button>
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-700 hover:text-indigo-900"
                          onClick={() => {
                            setShowBcc(!showBcc);
                            setShowCc(false);
                          }}
                        >
                          {showBcc ? 'Hide BCC' : 'BCC'}
                        </button>
                      </div>
                    </div>
                    
                    {showCc && (
                      <div className="mt-2 flex items-center">
                        <label htmlFor="email-cc" className="block text-sm font-medium text-gray-700 w-16">CC:</label>
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            id="email-cc"
                            className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                            placeholder="Enter CC recipients"
                            value={cc}
                            onChange={(e) => setCc(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    
                    {showBcc && (
                      <div className="mt-2 flex items-center">
                        <label htmlFor="email-bcc" className="block text-sm font-medium text-gray-700 w-16">BCC:</label>
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            id="email-bcc"
                            className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                            placeholder="Enter BCC recipients"
                            value={bcc}
                            onChange={(e) => setBcc(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Subject */}
                  <div className="flex items-center">
                    <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 w-16">Subject:</label>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        id="email-subject"
                        className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                        placeholder="Email subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Email Body */}
                  <div className="mt-4">
                    <label htmlFor="email-body" className="sr-only">Email content</label>
                    <div className="bg-white rounded-md border border-gray-300">
                      {/* Basic toolbar - in a real app, you'd use a rich text editor */}
                      <div className="border-b border-gray-200 px-3 py-2 flex flex-wrap justify-between">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                          >
                            B
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <i>I</i>
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <u>U</u>
                          </button>
                          <div className="border-r border-gray-300 mx-2 h-6"></div>
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                            onClick={() => setShowTemplates(!showTemplates)}
                          >
                            <List className="h-4 w-4 mr-1" />
                            Templates
                          </button>
                        </div>
                      </div>
                      
                      {/* Templates dropdown */}
                      {showTemplates && (
                        <div className="absolute mt-1 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 max-h-60 overflow-y-auto">
                          <div className="py-1">
                            {templates.map((template) => (
                              <button
                                key={template.id}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => applyTemplate(template)}
                              >
                                {template.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Email content area */}
                      <textarea
                        id="email-body"
                        rows={15}
                        className="block w-full border-0 focus:ring-0 sm:text-sm"
                        placeholder="Write your email here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        ref={editorRef}
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Attachments */}
                  {attachments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700">Attachments</h3>
                      <ul className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                        {attachments.map((attachment) => (
                          <li key={attachment.id} className="py-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{attachment.name}</span>
                              <span className="ml-2 text-xs text-gray-500">
                                {(attachment.size / 1024).toFixed(1)} KB
                              </span>
                            </div>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeAttachment(attachment.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Schedule Options */}
                  {showSchedule && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Schedule Email</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="schedule-date" className="block text-xs font-medium text-gray-700">Date</label>
                          <input
                            type="date"
                            id="schedule-date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label htmlFor="schedule-time" className="block text-xs font-medium text-gray-700">Time</label>
                          <input
                            type="time"
                            id="schedule-time"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setShowSchedule(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={handleSchedule}
                          disabled={isSending || !scheduleDate || !scheduleTime}
                        >
                          {isSending ? 'Scheduling...' : 'Schedule Email'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Footer with actions */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <div className="flex">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Paperclip className="-ml-0.5 mr-2 h-4 w-4" />
                    Attach
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                  />
                  
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setShowSchedule(!showSchedule)}
                  >
                    <Clock className="-ml-0.5 mr-2 h-4 w-4" />
                    Schedule
                  </button>
                  
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Save className="-ml-0.5 mr-2 h-4 w-4" />
                    Save Draft
                  </button>
                </div>
                
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSend}
                  disabled={isSending}
                >
                  <Send className="-ml-1 mr-2 h-4 w-4" />
                  {isSending ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;