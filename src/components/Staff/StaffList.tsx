import React from 'react';
import { Users } from 'lucide-react';
import type { Staff, StaffRole } from '../../types/staff';
import StaffTable from './StaffTable';

interface StaffListProps {
  role: StaffRole;
  staffMembers: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffList: React.FC<StaffListProps> = ({
  role,
  staffMembers,
  onEdit,
  onDelete,
}) => {
  const title = role === 'doctor' ? 'Doctors' : 'Nurses';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>

      <StaffTable
        staffMembers={staffMembers}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default StaffList;