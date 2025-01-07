import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Staff } from '../../types/staff';
import StaffList from './StaffList';
import AddDoctorForm from './AddDoctorForm';
import AddNurseForm from './AddNurseForm';
import UpdateStaffForm from './UpdateStaffForm';
import { useLoading } from '../../hooks/useLoading';
import LoadingOverlay from '../common/LoadingOverlay';
import SearchInput from '../common/SearchInput';
import { mockStaff } from '../../data/mockStaff';

const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [activeTab, setActiveTab] = useState<'doctors' | 'nurses'>('doctors');
  const [isDoctorFormOpen, setIsDoctorFormOpen] = useState(false);
  const [isNurseFormOpen, setIsNurseFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [updateForm, setUpdateForm] = useState<{
    isOpen: boolean;
    staff: Staff | null;
  }>({ isOpen: false, staff: null });
  const { isLoading, withLoading } = useLoading();

  const handleEdit = async (staffMember: Staff) => {
    setUpdateForm({ isOpen: true, staff: staffMember });
  };

  const handleDelete = async (id: string) => {
    await withLoading(async () => {
      setStaff((prev) => prev.filter((s) => s.id !== id));
    });
  };

  const handleAddStaff = async (newStaff: Omit<Staff, 'id'>) => {
    await withLoading(async () => {
      const staffMember: Staff = {
        ...newStaff,
        id: `${newStaff.role}${Date.now()}`,
      };
      setStaff((prev) => [...prev, staffMember]);
      setIsDoctorFormOpen(false);
      setIsNurseFormOpen(false);
    });
  };

  const handleUpdateStaff = async (id: string, updatedStaff: Omit<Staff, 'id'>) => {
    await withLoading(async () => {
      setStaff((prev) =>
        prev.map((s) => (s.id === id ? { ...updatedStaff, id } : s))
      );
      setUpdateForm({ isOpen: false, staff: null });
    });
  };

  const filteredStaff = staff.filter((s) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      s.role === (activeTab === 'doctors' ? 'doctor' : 'nurse') &&
      (s.name.toLowerCase().includes(searchLower) ||
        s.specialization.toLowerCase().includes(searchLower) ||
        s.contact.toLowerCase().includes(searchLower) ||
        s.email.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <button 
          onClick={() => activeTab === 'doctors' ? setIsDoctorFormOpen(true) : setIsNurseFormOpen(true)}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add {activeTab === 'doctors' ? 'Doctor' : 'Nurse'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b overflow-x-auto">
          <nav className="flex min-w-max">
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'doctors'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab('nurses')}
              className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'nurses'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Nurses
            </button>
          </nav>
        </div>

        <div className="p-4 border-b">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={`Search ${activeTab}...`}
          />
        </div>

        <LoadingOverlay isLoading={isLoading}>
          <div className="p-6">
            <StaffList
              role={activeTab === 'doctors' ? 'doctor' : 'nurse'}
              staffMembers={filteredStaff}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </LoadingOverlay>
      </div>

      <AddDoctorForm
        isOpen={isDoctorFormOpen}
        onClose={() => setIsDoctorFormOpen(false)}
        onSubmit={handleAddStaff}
      />

      <AddNurseForm
        isOpen={isNurseFormOpen}
        onClose={() => setIsNurseFormOpen(false)}
        onSubmit={handleAddStaff}
      />

      {updateForm.staff && (
        <UpdateStaffForm
          isOpen={updateForm.isOpen}
          onClose={() => setUpdateForm({ isOpen: false, staff: null })}
          onUpdate={handleUpdateStaff}
          staff={updateForm.staff}
        />
      )}
    </div>
  );
};

export default StaffPage;