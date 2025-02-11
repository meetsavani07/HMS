import React from 'react'; // Importing React to use JSX and create the component
import { Users } from 'lucide-react'; // Importing the 'Users' icon from lucide-react for UI
import type { Staff, StaffRole } from '../../../types/staff'; // Importing Staff and StaffRole types for type-checking
import StaffTable from './StaffTable'; // Importing the StaffTable component to display staff members in a table

// Defining the props for the StaffList component
interface StaffListProps {
  role: StaffRole; // Role of the staff members ('doctor' or 'nurse')
  staffMembers: Staff[]; // List of staff members to be displayed
  onEdit: (staff: Staff) => void; // Function to handle editing a staff member
  onDelete: (id: string) => void; // Function to handle deleting a staff member
}

const StaffList: React.FC<StaffListProps> = ({
  role, // Role of the staff members (doctor or nurse)
  staffMembers, // List of staff members passed as a prop
  onEdit, // Function to call when editing a staff member
  onDelete, // Function to call when deleting a staff member
}) => {
  // Dynamically set the title based on the role
  const title = role === 'doctor' ? 'Doctors' : 'Nurses';

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        {/* Section Title */}
        <div className="flex items-center space-x-2">
          {/* Users Icon for the list */}
          <Users className="h-6 w-6 text-lime-600" />
          {/* Title based on role */}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>

      {/* Staff Table Component */}
      <StaffTable
        staffMembers={staffMembers} // Passing staff members to the StaffTable component
        onEdit={onEdit} // Passing the onEdit function to handle staff edits
        onDelete={onDelete} // Passing the onDelete function to handle staff deletions
      />
    </div>
  );
};

export default StaffList;
