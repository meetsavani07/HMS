import React from 'react';
// Importing the necessary icons from lucide-react
import {
  Shield,
  CheckCircle,
  XCircle,
  Edit2,
  RefreshCw,
  Trash2,
} from 'lucide-react';
// Importing the type definition for Insurance
import type { Insurance } from '../../../types/insurance';

// Define the type for the component props
interface InsuranceListProps {
  insurances: Insurance[];  // List of insurance objects passed as props
  onEdit: (insurance: Insurance) => void;  // Function to handle edit action
  onDelete: (id: string) => void;  // Function to handle delete action
  onRenew: (id: string) => void;  // Function to handle renew action
}

// Functional component to display a list of insurance policies
const InsuranceList: React.FC<InsuranceListProps> = ({
  insurances,
  onEdit,
  onDelete,
  onRenew,
}) => {
  return (
    <div className="overflow-x-auto">
      {/* Table to display insurance information */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {/* Table Header: Specifies the columns */}
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Buyer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Provider
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Coverage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Validity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Loop through the insurance list and render each row */}
          {insurances.map((insurance) => (
            <tr key={insurance.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Display buyer name and contact */}
                <div className="text-sm font-medium text-gray-900">
                  {insurance.buyerName}
                </div>
                <div className="text-sm text-gray-500">
                  {insurance.buyerContact}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Display provider name */}
                {insurance.provider}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Display insurance plan */}
                {insurance.planName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Display coverage details */}
                {insurance.coverage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Display status with different styling based on status value */}
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    insurance.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {insurance.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Display the validity period of the insurance */}
                <div>{insurance.startDate}</div>
                <div>to</div>
                <div>{insurance.endDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Action buttons for edit, renew, and delete */}
                <div className="flex space-x-2">
                  {/* Edit button */}
                  <button
                    onClick={() => onEdit(insurance)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Edit insurance"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  {/* Renew button */}
                  <button
                    onClick={() => onRenew(insurance.id)}
                    className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                    title="Renew insurance"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => onDelete(insurance.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete insurance"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the InsuranceList component as the default export
export default InsuranceList;
