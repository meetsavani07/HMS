import React from 'react';
import { Eye, Ban, CheckCircle, AlertCircle } from 'lucide-react';
import type { Bill } from '../../../types/billing';

interface BillListProps {
  bills: Bill[]; // Array of bill objects to be displayed
  onViewDetails: (bill: Bill) => void; // Function to view detailed information for a specific bill
  onUpdateStatus: (billId: string, status: Bill['status']) => void; // Function to update the status of a bill
}

const BillList: React.FC<BillListProps> = ({
  bills,
  onViewDetails,
  onUpdateStatus,
}) => {
  // Function to determine the styling for each bill's status
  const getStatusStyle = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'; // Green for 'paid' status
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'; // Yellow for 'pending' status
      case 'overdue':
        return 'bg-red-100 text-red-800'; // Red for 'overdue' status
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'; // Gray for 'cancelled' status
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {/* Table header containing the column names */}
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Bill ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Iterating over the bills and displaying each one in a row */}
          {bills.map((bill) => (
            <tr key={bill.id} className="hover:bg-gray-50">
              {/* Bill ID */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {bill.id}
              </td>

              {/* Patient Name */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {bill.patientName}
              </td>

              {/* Bill Date and Due Date */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{bill.billDate}</div>
                <div className="text-xs text-gray-400">Due: {bill.dueDate}</div>
              </td>

              {/* Total Amount */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{bill.total.toFixed(2)}
              </td>

              {/* Status Badge with dynamic styling */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
                    bill.status
                  )}`}
                >
                  {bill.status}
                </span>
              </td>

              {/* Action Buttons */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  {/* View Details Button */}
                  <button
                    onClick={() => onViewDetails(bill)} // Trigger view details
                    className="text-gray-400 hover:text-blue-500"
                    title="View details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>

                  {/* Mark as Paid / Cancel buttons for Pending bills */}
                  {bill.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(bill.id, 'paid')} // Trigger mark as paid
                        className="text-gray-400 hover:text-green-500"
                        title="Mark as paid"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(bill.id, 'cancelled')} // Trigger mark as cancelled
                        className="text-gray-400 hover:text-red-500"
                        title="Cancel bill"
                      >
                        <Ban className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Mark as Overdue button for Pending bills that are past the due date */}
                  {bill.status === 'pending' &&
                    new Date(bill.dueDate) < new Date() && (
                      <button
                        onClick={() => onUpdateStatus(bill.id, 'overdue')} // Trigger mark as overdue
                        className="text-gray-400 hover:text-orange-500"
                        title="Mark as overdue"
                      >
                        <AlertCircle className="h-5 w-5" />
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
