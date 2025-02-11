import { Bill } from '../types/billing';

export const mockBills: Bill[] = [
  {
    id: 'BILL001',
    patientId: 'p1',
    patientName: 'John Doe',
    billDate: '2024-03-15',
    dueDate: '2024-03-30',
    items: [
      {
        id: 'item1',
        description: 'Consultation Fee',
        quantity: 1,
        unitPrice: 100,
        total: 100
      },
      {
        id: 'item2',
        description: 'Blood Test',
        quantity: 1,
        unitPrice: 50,
        total: 50
      }
    ],
    subtotal: 150,
    tax: 15,
    discount: 0,
    total: 165,
    status: 'pending'
  },
  {
    id: 'BILL002',
    patientId: 'p2',
    patientName: 'Jane Smith',
    billDate: '2024-03-14',
    dueDate: '2024-03-29',
    items: [
      {
        id: 'item1',
        description: 'Room Charges',
        quantity: 2,
        unitPrice: 200,
        total: 400
      },
      {
        id: 'item2',
        description: 'Medication',
        quantity: 1,
        unitPrice: 75,
        total: 75
      }
    ],
    subtotal: 475,
    tax: 47.50,
    discount: 50,
    total: 472.50,
    status: 'paid',
    paymentMethod: 'Credit Card',
    paymentDate: '2024-03-15'
  }
];