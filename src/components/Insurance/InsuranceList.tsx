import React from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  Edit2,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import type { Insurance } from '../../types/insurance';

interface InsuranceListProps {
  insurances: Insurance[];
  onEdit: (insurance: Insurance) => void;
  onDelete: (id: string) => void;
  onRenew: (id: string) => void;
}

const InsuranceList: React.FC<InsuranceListProps> = ({
  insurances,
  onEdit,
  onDelete,
  onRenew,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
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
          {insurances.map((insurance) => (
            <tr key={insurance.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {insurance.buyerName}
                </div>
                <div className="text-sm text-gray-500">
                  {insurance.buyerContact}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {insurance.provider}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {insurance.planName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {insurance.coverage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
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
                <div>{insurance.startDate}</div>
                <div>to</div>
                <div>{insurance.endDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(insurance)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Edit insurance"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onRenew(insurance.id)}
                    className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                    title="Renew insurance"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
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

export default InsuranceList;
