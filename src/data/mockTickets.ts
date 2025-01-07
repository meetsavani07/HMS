export const mockTickets = [
  {
    id: 't1',
    subject: 'System Access Issue',
    department: 'IT Support',
    priority: 'high' as const,
    status: 'open' as const,
    createdAt: '2024-03-15',
    lastUpdated: '2024-03-15'
  },
  {
    id: 't2',
    subject: 'Equipment Maintenance',
    department: 'Maintenance',
    priority: 'medium' as const,
    status: 'in-progress' as const,
    createdAt: '2024-03-14',
    lastUpdated: '2024-03-15'
  }
];