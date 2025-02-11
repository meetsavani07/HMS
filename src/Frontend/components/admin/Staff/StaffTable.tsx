import React from 'react';
import { Edit2, Trash2 } from 'lucide-react'; // Importing icons for editing and deleting staff
import type { Staff } from '../../../types/staff'; // Importing the Staff type for type-checking

// Defining the props for the StaffTable component
interface StaffTableProps {
  staffMembers: Staff[]; // Array of staff members to be displayed
  onEdit: (staff: Staff) => void; // Function to handle editing a staff member
  onDelete: (id: string) => void; // Function to handle deleting a staff member
}

const StaffTable: React.FC<StaffTableProps> = ({
  staffMembers, // List of staff members
  onEdit, // Function to call when editing a staff member
  onDelete, // Function to call when deleting a staff member
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table container with horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header with column names */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          {/* Table body with staff data */}
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Mapping over the staff members to create a row for each */}
            {staffMembers.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50">
                {/* Staff Name and Email */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                  <div className="text-sm text-gray-500">{staff.email}</div>
                </td>
                {/* Staff Specialization or Department */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.specialization}
                </td>
                {/* Staff Experience */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.experience} years
                </td>
                {/* Staff Contact Number */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.contact}
                </td>
                {/* Staff Availability Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Dynamically changing background color based on availability */}
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    staff.isAvailable
                      ? 'bg-green-100 text-green-800' // Available staff will have a green label
                      : 'bg-red-100 text-red-800' // Unavailable staff will have a red label
                  }`}>
                    {staff.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                {/* Actions Column (Edit and Delete buttons) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {/* Edit button */}
                    <button
                      onClick={() => onEdit(staff)} // Call onEdit with the current staff object
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-4 w-4" /> {/* Edit icon */}
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => onDelete(staff.id)} // Call onDelete with the current staff id
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" /> {/* Trash icon */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;
