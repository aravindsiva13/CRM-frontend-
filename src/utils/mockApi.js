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
  
  for (let i = 0; i < count; i++) {
    tasks.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 3, max: 7 }),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement(types),
      assignedTo: faker.person.fullName(),
      priority: faker.helpers.arrayElement(priorities),
      status: faker.helpers.arrayElement(statuses),
      dueDate: faker.date.future(),
      relatedTo: faker.helpers.arrayElement(['Contact', 'Lead', 'Deal', 'Account']),
      relatedToName: faker.company.name(),
      createdAt: faker.date.past(),
    });
  }
  return tasks;
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
        const allTasks = generateTasks(120);
        const paginatedTasks = allTasks.slice((page - 1) * limit, page * limit);
        resolve({
          data: paginatedTasks,
          total: allTasks.length,
          page,
          limit,
          totalPages: Math.ceil(allTasks.length / limit)
        });
      }, 500);
    });
  },
  
  getTaskById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = generateTasks(1)[0];
        task.id = id;
        resolve({ data: task });
      }, 300);
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