// // src/utils/mockApi.js
// import { faker } from '@faker-js/faker';

// // Generate random contacts
// const generateContacts = (count) => {
//   const contacts = [];
//   for (let i = 0; i < count; i++) {
//     contacts.push({
//       id: faker.string.uuid(),
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       phone: faker.phone.number(),
//       company: faker.company.name(),
//       position: faker.person.jobTitle(),
//       status: faker.helpers.arrayElement(['Active', 'Inactive', 'Lead']),
//       lastContact: faker.date.recent(),
//       avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
//       notes: faker.lorem.paragraph(),
//       createdAt: faker.date.past(),
//     });
//   }
//   return contacts;
// };

// // Generate random leads
// const generateLeads = (count) => {
//   const leads = [];
//   const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
  
//   for (let i = 0; i < count; i++) {
//     leads.push({
//       id: faker.string.uuid(),
//       contactName: faker.person.fullName(),
//       company: faker.company.name(),
//       email: faker.internet.email(),
//       phone: faker.phone.number(),
//       value: faker.number.float({ min: 1000, max: 100000, precision: 2 }),
//       stage: faker.helpers.arrayElement(stages),
//       probability: faker.number.int({ min: 10, max: 100 }),
//       expectedCloseDate: faker.date.future(),
//       owner: faker.person.fullName(),
//       source: faker.helpers.arrayElement(['Website', 'Referral', 'Conference', 'Cold Call', 'Social Media']),
//       createdAt: faker.date.past(),
//     });
//   }
//   return leads;
// };

// // Generate random tasks
// const generateTasks = (count) => {
//   const tasks = [];
//   const priorities = ['Low', 'Medium', 'High', 'Urgent'];
//   const statuses = ['Open', 'In Progress', 'Completed', 'Deferred'];
//   const types = ['Call', 'Email', 'Meeting', 'Follow-up', 'Proposal', 'Demo'];
  
//   for (let i = 0; i < count; i++) {
//     tasks.push({
//       id: faker.string.uuid(),
//       title: faker.lorem.sentence({ min: 3, max: 7 }),
//       description: faker.lorem.paragraph(),
//       type: faker.helpers.arrayElement(types),
//       assignedTo: faker.person.fullName(),
//       priority: faker.helpers.arrayElement(priorities),
//       status: faker.helpers.arrayElement(statuses),
//       dueDate: faker.date.future(),
//       relatedTo: faker.helpers.arrayElement(['Contact', 'Lead', 'Deal', 'Account']),
//       relatedToName: faker.company.name(),
//       createdAt: faker.date.past(),
//     });
//   }
//   return tasks;
// };

// // Generate dashboard data
// const generateDashboardData = () => {
//   return {
//     summary: {
//       totalContacts: faker.number.int({ min: 200, max: 1000 }),
//       totalLeads: faker.number.int({ min: 50, max: 200 }),
//       openDeals: faker.number.int({ min: 10, max: 50 }),
//       closedDeals: faker.number.int({ min: 5, max: 40 }),
//       totalRevenue: faker.number.float({ min: 50000, max: 1000000, precision: 2 }),
//       conversionRate: faker.number.float({ min: 10, max: 30, precision: 1 }),
//     },
//     recentActivities: Array.from({ length: 5 }, () => ({
//       id: faker.string.uuid(),
//       type: faker.helpers.arrayElement(['Call', 'Email', 'Meeting', 'Note', 'Task']),
//       subject: faker.lorem.sentence(),
//       date: faker.date.recent(),
//       user: faker.person.fullName(),
//     })),
//     topDeals: Array.from({ length: 5 }, () => ({
//       id: faker.string.uuid(),
//       company: faker.company.name(),
//       value: faker.number.float({ min: 10000, max: 500000, precision: 2 }),
//       stage: faker.helpers.arrayElement(['Proposal', 'Negotiation', 'Closed Won']),
//       probability: faker.number.int({ min: 50, max: 100 }),
//     })),
//     salesForecast: Array.from({ length: 12 }, (_, i) => {
//       const month = new Date();
//       month.setMonth(month.getMonth() - 6 + i);
//       return {
//         month: month.toLocaleString('default', { month: 'short' }),
//         predicted: faker.number.float({ min: 50000, max: 200000, precision: 2 }),
//         actual: i < 6 ? faker.number.float({ min: 40000, max: 220000, precision: 2 }) : null,
//       };
//     }),
//   };
// };

// // Mock API service
// const mockApiService = {
//   // Contacts API
//   getContacts: (page = 1, limit = 10) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const allContacts = generateContacts(100);
//         const paginatedContacts = allContacts.slice((page - 1) * limit, page * limit);
//         resolve({
//           data: paginatedContacts,
//           total: allContacts.length,
//           page,
//           limit,
//           totalPages: Math.ceil(allContacts.length / limit)
//         });
//       }, 500);
//     });
//   },
  
//   getContactById: (id) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const contact = generateContacts(1)[0];
//         contact.id = id;
//         resolve({ data: contact });
//       }, 300);
//     });
//   },
  
//   // Leads API
//   getLeads: (page = 1, limit = 10) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const allLeads = generateLeads(80);
//         const paginatedLeads = allLeads.slice((page - 1) * limit, page * limit);
//         resolve({
//           data: paginatedLeads,
//           total: allLeads.length,
//           page,
//           limit,
//           totalPages: Math.ceil(allLeads.length / limit)
//         });
//       }, 500);
//     });
//   },
  
//   getLeadById: (id) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const lead = generateLeads(1)[0];
//         lead.id = id;
//         resolve({ data: lead });
//       }, 300);
//     });
//   },
  
//   // Tasks API
//   getTasks: (page = 1, limit = 10) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const allTasks = generateTasks(120);
//         const paginatedTasks = allTasks.slice((page - 1) * limit, page * limit);
//         resolve({
//           data: paginatedTasks,
//           total: allTasks.length,
//           page,
//           limit,
//           totalPages: Math.ceil(allTasks.length / limit)
//         });
//       }, 500);
//     });
//   },
  
//   getTaskById: (id) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const task = generateTasks(1)[0];
//         task.id = id;
//         resolve({ data: task });
//       }, 300);
//     });
//   },
  
//   // Dashboard API
//   getDashboardData: () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ data: generateDashboardData() });
//       }, 700);
//     });
//   },
  
//   // Charts data
//   getLeadsBySource: () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           data: [
//             { source: 'Website', count: faker.number.int({ min: 20, max: 100 }) },
//             { source: 'Referral', count: faker.number.int({ min: 15, max: 70 }) },
//             { source: 'Conference', count: faker.number.int({ min: 10, max: 50 }) },
//             { source: 'Cold Call', count: faker.number.int({ min: 5, max: 40 }) },
//             { source: 'Social Media', count: faker.number.int({ min: 10, max: 60 }) },
//           ]
//         });
//       }, 400);
//     });
//   },
  
//   getSalesByMonth: () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         resolve({
//           data: months.map(month => ({
//             month,
//             amount: faker.number.float({ min: 50000, max: 200000, precision: 2 })
//           }))
//         });
//       }, 400);
//     });
//   }
// };

// export default mockApiService;




//2





// src/utils/mockApi.js
import { faker } from '@faker-js/faker';

// Generate random contacts
const generateContacts = (count) => {
  const contacts = [];
  for (let i = 0; i < count; i++) {
    contacts.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      company: faker.company.name(),
      position: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'Lead']),
      lastContact: faker.date.recent(),
      avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
      notes: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
    });
  }
  return contacts;
};

// Generate random leads
const generateLeads = (count) => {
  const leads = [];
  const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
  
  for (let i = 0; i < count; i++) {
    leads.push({
      id: faker.string.uuid(),
      contactName: faker.person.fullName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      value: faker.number.float({ min: 1000, max: 100000, precision: 2 }),
      stage: faker.helpers.arrayElement(stages),
      probability: faker.number.int({ min: 10, max: 100 }),
      expectedCloseDate: faker.date.future(),
      owner: faker.person.fullName(),
      source: faker.helpers.arrayElement(['Website', 'Referral', 'Conference', 'Cold Call', 'Social Media']),
      createdAt: faker.date.past(),
    });
  }
  return leads;
};

// Generate random tasks
const generateTasks = (count) => {
  const tasks = [];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const statuses = ['Open', 'In Progress', 'Completed', 'Deferred'];
  const types = ['Call', 'Email', 'Meeting', 'Follow-up', 'Proposal', 'Demo'];
  const categories = ['Meeting', 'Call', 'Email', 'Follow-up', 'Research', 'Administrative'];
  const teamMembers = ['Me', 'John Doe', 'Sarah Smith', 'Michael Johnson'];
  
  for (let i = 0; i < count; i++) {
    const isRecurring = faker.datatype.boolean(0.2);
    const reminderEnabled = faker.datatype.boolean(0.3);
    const dueDate = faker.date.future();
    
    tasks.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 3, max: 7 }),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement(types),
      assignedTo: faker.helpers.arrayElement(teamMembers),
      priority: faker.helpers.arrayElement(priorities),
      status: faker.helpers.arrayElement(statuses),
      dueDate: dueDate,
      dueTime: `${faker.number.int({ min: 8, max: 17 })}:${faker.helpers.arrayElement(['00', '15', '30', '45'])}`,
      relatedTo: faker.helpers.arrayElement(['Contact', 'Lead', 'Deal', 'Account']),
      relatedToName: faker.company.name(),
      relatedToId: faker.string.uuid(),
      category: faker.helpers.arrayElement(categories),
      isRecurring: isRecurring,
      recurringPattern: isRecurring ? faker.helpers.arrayElement(['daily', 'weekly', 'monthly']) : null,
      recurringEvery: isRecurring ? faker.number.int({ min: 1, max: 4 }) : null,
      recurringEndDate: isRecurring ? faker.date.future({ years: 1, refDate: dueDate }) : null,
      recurringCount: isRecurring ? faker.number.int({ min: 0, max: 12 }) : 0,
      reminderEnabled: reminderEnabled,
      reminderTime: reminderEnabled ? faker.number.int({ min: 5, max: 60 }).toString() : null,
      reminderUnit: reminderEnabled ? faker.helpers.arrayElement(['minutes', 'hours', 'days']) : null,
      reminderMethod: reminderEnabled ? faker.helpers.arrayElement(['app', 'email', 'both']) : null,
      estimatedTime: faker.number.int({ min: 15, max: 180 }),
      notes: faker.lorem.paragraph(),
      attachments: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
        id: faker.string.uuid(),
        name: `${faker.system.fileName()}.${faker.system.fileExt()}`,
        size: faker.number.int({ min: 10, max: 5000 }),
        uploadedAt: faker.date.recent(),
      })),
      createdAt: faker.date.past(),
    });
  }
  return tasks;
};

// Generate task dependencies
const generateTaskDependencies = (taskCount = 50) => {
  const dependencies = [];
  const taskIds = Array.from({ length: taskCount }, () => faker.string.uuid());
  
  // Create random dependencies between tasks (about 20% of tasks will have dependencies)
  for (let i = 0; i < taskCount * 0.2; i++) {
    const taskId = faker.helpers.arrayElement(taskIds);
    const dependsOnTaskId = faker.helpers.arrayElement(taskIds.filter(id => id !== taskId));
    
    dependencies.push({
      id: faker.string.uuid(),
      taskId,
      dependsOnTaskId,
      type: faker.helpers.arrayElement(['blocks', 'requires']),
      createdAt: faker.date.past(),
    });
  }
  
  return dependencies;
};

// Generate statistics data for tasks
const generateTaskStatistics = () => {
  const categories = ['Meeting', 'Call', 'Email', 'Follow-up', 'Research', 'Administrative'];
  const teamMembers = ['Me', 'John Doe', 'Sarah Smith', 'Michael Johnson'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return {
    byCategory: categories.map(category => ({
      category,
      total: faker.number.int({ min: 5, max: 30 }),
      completed: faker.number.int({ min: 2, max: 20 }),
    })),
    byUser: teamMembers.map(user => ({
      user,
      assigned: faker.number.int({ min: 10, max: 50 }),
      completed: faker.number.int({ min: 5, max: 40 }),
      overdue: faker.number.int({ min: 0, max: 10 }),
    })),
    timeline: months.map(month => ({
      month,
      created: faker.number.int({ min: 5, max: 30 }),
      completed: faker.number.int({ min: 3, max: 25 }),
    })),
  };
};

// Generate dashboard data
const generateDashboardData = () => {
  return {
    summary: {
      totalContacts: faker.number.int({ min: 200, max: 1000 }),
      totalLeads: faker.number.int({ min: 50, max: 200 }),
      openDeals: faker.number.int({ min: 10, max: 50 }),
      closedDeals: faker.number.int({ min: 5, max: 40 }),
      totalRevenue: faker.number.float({ min: 50000, max: 1000000, precision: 2 }),
      conversionRate: faker.number.float({ min: 10, max: 30, precision: 1 }),
    },
    recentActivities: Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['Call', 'Email', 'Meeting', 'Note', 'Task']),
      subject: faker.lorem.sentence(),
      date: faker.date.recent(),
      user: faker.person.fullName(),
    })),
    topDeals: Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      company: faker.company.name(),
      value: faker.number.float({ min: 10000, max: 500000, precision: 2 }),
      stage: faker.helpers.arrayElement(['Proposal', 'Negotiation', 'Closed Won']),
      probability: faker.number.int({ min: 50, max: 100 }),
    })),
    salesForecast: Array.from({ length: 12 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - 6 + i);
      return {
        month: month.toLocaleString('default', { month: 'short' }),
        predicted: faker.number.float({ min: 50000, max: 200000, precision: 2 }),
        actual: i < 6 ? faker.number.float({ min: 40000, max: 220000, precision: 2 }) : null,
      };
    }),
  };
};

// Cached data to maintain consistency between calls
const cachedTasks = generateTasks(120);
const cachedTaskDependencies = generateTaskDependencies(cachedTasks.length);

// Mock API service
const mockApiService = {
  // Contacts API
  getContacts: (page = 1, limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allContacts = generateContacts(100);
        const paginatedContacts = allContacts.slice((page - 1) * limit, page * limit);
        resolve({
          data: paginatedContacts,
          total: allContacts.length,
          page,
          limit,
          totalPages: Math.ceil(allContacts.length / limit)
        });
      }, 500);
    });
  },
  
  getContactById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contact = generateContacts(1)[0];
        contact.id = id;
        resolve({ data: contact });
      }, 300);
    });
  },
  
  // Leads API
  getLeads: (page = 1, limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allLeads = generateLeads(80);
        const paginatedLeads = allLeads.slice((page - 1) * limit, page * limit);
        resolve({
          data: paginatedLeads,
          total: allLeads.length,
          page,
          limit,
          totalPages: Math.ceil(allLeads.length / limit)
        });
      }, 500);
    });
  },
  
  getLeadById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lead = generateLeads(1)[0];
        lead.id = id;
        resolve({ data: lead });
      }, 300);
    });
  },
  
  // Tasks API
  getTasks: (page = 1, limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const paginatedTasks = cachedTasks.slice((page - 1) * limit, page * limit);
        resolve({
          data: paginatedTasks,
          total: cachedTasks.length,
          page,
          limit,
          totalPages: Math.ceil(cachedTasks.length / limit)
        });
      }, 500);
    });
  },
  
  // Enhanced tasks API with filtering capabilities
  getEnhancedTasks: (page = 1, limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const paginatedTasks = cachedTasks.slice((page - 1) * limit, page * limit);
        resolve({
          data: paginatedTasks,
          total: cachedTasks.length,
          page,
          limit,
          totalPages: Math.ceil(cachedTasks.length / limit)
        });
      }, 500);
    });
  },
  
  getTaskById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = cachedTasks.find(task => task.id === id) || cachedTasks[0];
        task.id = id; // Ensure ID matches
        resolve({ data: task });
      }, 300);
    });
  },
  
  createTask: (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: faker.string.uuid(),
          ...taskData,
          createdAt: new Date().toISOString()
        };
        
        // Add to cached tasks
        cachedTasks.unshift(newTask);
        
        resolve({ data: newTask, success: true });
      }, 600);
    });
  },
  
  updateTask: (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find and update the task
        const index = cachedTasks.findIndex(task => task.id === taskData.id);
        if (index !== -1) {
          cachedTasks[index] = { ...cachedTasks[index], ...taskData, updatedAt: new Date().toISOString() };
          resolve({ data: cachedTasks[index], success: true });
        } else {
          resolve({ data: null, success: false, message: 'Task not found' });
        }
      }, 600);
    });
  },
  
  updateTaskStatus: (taskId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find and update the task status
        const task = cachedTasks.find(task => task.id === taskId);
        if (task) {
          task.status = status;
          task.updatedAt = new Date().toISOString();
          resolve({ data: task, success: true });
        } else {
          resolve({ data: null, success: false, message: 'Task not found' });
        }
      }, 400);
    });
  },
  
  deleteTask: (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = cachedTasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
          cachedTasks.splice(index, 1);
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Task not found' });
        }
      }, 500);
    });
  },
  
  // Task dependencies
  getTaskDependencies: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: cachedTaskDependencies });
      }, 400);
    });
  },
  
  addTaskDependency: (dependency) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDependency = {
          id: faker.string.uuid(),
          ...dependency,
          createdAt: new Date().toISOString()
        };
        
        cachedTaskDependencies.push(newDependency);
        resolve({ data: newDependency, success: true });
      }, 400);
    });
  },
  
  removeTaskDependency: (dependencyId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = cachedTaskDependencies.findIndex(dep => dep.id === dependencyId);
        if (index !== -1) {
          cachedTaskDependencies.splice(index, 1);
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Dependency not found' });
        }
      }, 400);
    });
  },
  
  // Task reminders
  addTaskReminder: (reminderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = cachedTasks.find(task => task.id === reminderData.taskId);
        if (task) {
          task.reminderEnabled = true;
          task.reminderTime = reminderData.time;
          task.reminderUnit = reminderData.unit;
          task.reminderMethod = reminderData.method;
          resolve({ data: task, success: true });
        } else {
          resolve({ success: false, message: 'Task not found' });
        }
      }, 400);
    });
  },
  
  // Bulk actions
  bulkUpdateTaskStatus: (taskIds, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let updatedCount = 0;
        taskIds.forEach(id => {
          const task = cachedTasks.find(task => task.id === id);
          if (task) {
            task.status = status;
            task.updatedAt = new Date().toISOString();
            updatedCount++;
          }
        });
        
        resolve({ success: true, updatedCount });
      }, 600);
    });
  },
  
  bulkDeleteTasks: (taskIds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let deletedCount = 0;
        taskIds.forEach(id => {
          const index = cachedTasks.findIndex(task => task.id === id);
          if (index !== -1) {
            cachedTasks.splice(index, 1);
            deletedCount++;
          }
        });
        
        resolve({ success: true, deletedCount });
      }, 600);
    });
  },
  
  bulkAssignTasks: (taskIds, assignee) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let updatedCount = 0;
        taskIds.forEach(id => {
          const task = cachedTasks.find(task => task.id === id);
          if (task) {
            task.assignedTo = assignee;
            task.updatedAt = new Date().toISOString();
            updatedCount++;
          }
        });
        
        resolve({ success: true, updatedCount });
      }, 600);
    });
  },
  
  // Recurring tasks
  createRecurringTasks: (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would normally create multiple instances of recurring tasks
        // Here we just simulate the success
        resolve({ success: true, message: 'Recurring tasks scheduled' });
      }, 500);
    });
  },
  
  // Task statistics 
  getTasksByCategory: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = generateTaskStatistics().byCategory;
        resolve({ data: stats });
      }, 400);
    });
  },
  
  getTaskCompletionByUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = generateTaskStatistics().byUser;
        resolve({ data: stats });
      }, 400);
    });
  },
  
  getTaskTimeline: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = generateTaskStatistics().timeline;
        resolve({ data: stats });
      }, 400);
    });
  },
  
  // Dashboard API
  getDashboardData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: generateDashboardData() });
      }, 700);
    });
  },
  
  // Charts data
  getLeadsBySource: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { source: 'Website', count: faker.number.int({ min: 20, max: 100 }) },
            { source: 'Referral', count: faker.number.int({ min: 15, max: 70 }) },
            { source: 'Conference', count: faker.number.int({ min: 10, max: 50 }) },
            { source: 'Cold Call', count: faker.number.int({ min: 5, max: 40 }) },
            { source: 'Social Media', count: faker.number.int({ min: 10, max: 60 }) },
          ]
        });
      }, 400);
    });
  },
  
  getSalesByMonth: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        resolve({
          data: months.map(month => ({
            month,
            amount: faker.number.float({ min: 50000, max: 200000, precision: 2 })
          }))
        });
      }, 400);
    });
  }
};

export default mockApiService;