import React from 'react';
import { X, Download, Printer, CheckCircle, Ban } from 'lucide-react';
import type { Bill } from '../../../types/billing';
import { generatePDF } from '../../../utils/pdfGenerator';

interface BillDetailsProps {
  bill: Bill; // Bill data passed as a prop
  onClose: () => void; // Function to close the details view
  onUpdateStatus: (billId: string, status: Bill['status']) => void; // Function to update bill status (e.g., paid or cancelled)
}

const BillDetails: React.FC<BillDetailsProps> = ({
  bill,
  onClose,
  onUpdateStatus,
}) => {
  // Function to handle printing the bill
  const handlePrint = () => {
    window.print(); // Triggers the browser's print dialog
  };

  // Function to handle downloading the bill as a PDF
  const handleDownload = () => {
    generatePDF('bill', bill); // Uses the generatePDF function to generate and download the PDF
  };

  // Function to determine the appropriate styling for the bill's status
  const getStatusStyle = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'; // Green for paid
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'; // Yellow for pending
      case 'overdue':
        return 'bg-red-100 text-red-800'; // Red for overdue
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'; // Gray for cancelled
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header with actions (print, download, close) */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Bill Details</h2>
          <div className="flex items-center gap-2">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Print bill"
            >
              <Printer className="h-5 w-5" />
            </button>
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            {/* Buttons to update the bill status (mark as paid or cancel) */}
            {bill.status === 'pending' && (
              <>
                <button
                  onClick={() => onUpdateStatus(bill.id, 'paid')}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                  title="Mark as paid"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onUpdateStatus(bill.id, 'cancelled')}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Cancel bill"
                >
                  <Ban className="h-5 w-5" />
                </button>
              </>
            )}
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bill Details Content */}
        <div id="printable-content" className="space-y-6">
          {/* Bill and Patient Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Bill Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Bill ID:</span> {bill.id}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {bill.billDate}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span> {bill.dueDate}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      bill.status
                    )}`}
                  >
                    {bill.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Patient Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Patient ID:</span>{' '}
                  {bill.patientId}
                </p>
                <p>
                  <span className="font-medium">Name:</span> {bill.patientName}
                </p>
              </div>
            </div>
          </div>

          {/* Bill Items Table */}
          <div>
            <h3 className="text-lg font-medium mb-4">Bill Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bill.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Calculations */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>₹{bill.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>₹{bill.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount:</span>
                <span>₹{bill.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>₹{bill.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Information (if the bill is paid) */}
          {bill.status === 'paid' && (
            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-medium mb-2">Payment Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Payment Date:</span>{' '}
                  {bill.paymentDate}
                </p>
                <p>
                  <span className="font-medium">Payment Method:</span>{' '}
                  {bill.paymentMethod}
                </p>
              </div>
            </div>
          )}

          {/* Notes Section (if present) */}
          {bill.notes && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2">Notes</h3>
              <p className="text-sm text-gray-600">{bill.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
