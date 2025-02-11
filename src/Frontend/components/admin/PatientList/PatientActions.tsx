import React from 'react';
import { Trash2, Edit } from 'lucide-react';

interface PatientActionsProps {
  onDelete: () => void;
  onEdit: () => void;
}

const PatientActions: React.FC<PatientActionsProps> = ({ onDelete, onEdit }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
        title="Edit patient"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        title="Delete patient"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default PatientActions;