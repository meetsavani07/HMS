// Import necessary modules and components
// import { showToast } from '../../utils/toast'; // Utility function for showing toast messages
import React, { useState } from 'react'; // React library to build the component and manage state
import { Plus } from 'lucide-react'; // Icon for the "Add" button
import type { Staff } from '../../../types/staff'; // Type definition for Staff
import StaffList from './StaffList'; // StaffList component to display the list of staff members
import AddDoctorForm from './AddDoctorForm'; // Form component for adding a doctor
import AddNurseForm from './AddNurseForm'; // Form component for adding a nurse
import UpdateStaffForm from './UpdateStaffForm'; // Form component for updating staff details
import { useLoading } from '../../../hooks/useLoading'; // Custom hook to manage loading states
import LoadingOverlay from '../../common/LoadingOverlay'; // Loading overlay component
import SearchInput from '../../common/SearchInput'; // Search input component
import { mockStaff } from '../../../data/mockStaff'; // Mock data for initial staff

const StaffPage: React.FC = () => {
  // State hooks for managing different parts of the staff page
  const [staff, setStaff] = useState<Staff[]>(mockStaff); // Holds the list of staff members
  const [activeTab, setActiveTab] = useState<'doctors' | 'nurses'>('doctors'); // Tracks which tab is active (Doctors or Nurses)
  const [isDoctorFormOpen, setIsDoctorFormOpen] = useState(false); // State for controlling the doctor form visibility
  const [isNurseFormOpen, setIsNurseFormOpen] = useState(false); // State for controlling the nurse form visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for handling the search input value
  const [updateForm, setUpdateForm] = useState<{
    isOpen: boolean; // Controls if the update form is visible
    staff: Staff | null; // Stores the staff member to be updated
  }>({ isOpen: false, staff: null });
  const { isLoading, withLoading } = useLoading(); // Custom hook to manage loading state

  // Function to handle the editing of a staff member
  const handleEdit = async (staffMember: Staff) => {
    setUpdateForm({ isOpen: true, staff: staffMember }); // Open the update form and set the staff to be updated
  };

  // Function to handle the deletion of a staff member
  const handleDelete = async (id: string) => {
    await withLoading(async () => {
      setStaff((prev) => prev.filter((s) => s.id !== id)); // Filter out the deleted staff member from the staff list
    });
  };

  // Function to handle the addition of new staff (Doctor or Nurse)
  const handleAddStaff = async (newStaff: Omit<Staff, 'id'>) => {
    await withLoading(async () => {
      const staffMember: Staff = {
        ...newStaff,
        id: `${newStaff.role}${Date.now()}`, // Generate a unique ID based on the role and current timestamp
      };
      setStaff((prev) => [...prev, staffMember]); // Add the new staff member to the list
      setIsDoctorFormOpen(false); // Close the doctor form
      setIsNurseFormOpen(false); // Close the nurse form
    });
  };

  // Function to handle the update of an existing staff member
  const handleUpdateStaff = async (
    id: string,
    updatedStaff: Omit<Staff, 'id'>
  ) => {
    await withLoading(async () => {
      setStaff((prev) =>
        prev.map((s) => (s.id === id ? { ...updatedStaff, id } : s)) // Update the staff member in the list
      );
      setUpdateForm({ isOpen: false, staff: null }); // Close the update form
    });
  };

  // Filtering staff members based on search term and active tab (Doctors or Nurses)
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
      {/* Header section with title and add staff button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">Staff Management</h2>
        <button
          onClick={() =>
            activeTab === 'doctors'
              ? setIsDoctorFormOpen(true) // Open doctor form if the active tab is doctors
              : setIsNurseFormOpen(true) // Open nurse form if the active tab is nurses
          }
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-300 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5 "/> {/* Plus icon */}
          <span>Add {activeTab === 'doctors' ? 'Doctor' : 'Nurse'}</span>
        </button>
      </div>

      {/* Tab navigation for Doctors and Nurses */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b overflow-x-auto ">
          <nav className="flex min-w-max">
            <button
              onClick={() => setActiveTab('doctors')} // Switch to doctors tab
              className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'doctors'
                  ? 'border-b-2 border-lime-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab('nurses')} // Switch to nurses tab
              className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'nurses'
                  ? 'border-b-2 border-lime-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Nurses
            </button>
          </nav>
        </div>

        {/* Search bar for filtering staff */}
        <div className="p-4 border-b">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm} // Update search term on change
            placeholder={`Search ${activeTab}...`} // Placeholder based on the active tab (Doctors or Nurses)
          />
        </div>

        {/* Staff list display with loading overlay */}
        <LoadingOverlay isLoading={isLoading}>
          <div className="p-6">
            <StaffList
              role={activeTab === 'doctors' ? 'doctor' : 'nurse'} // Set role based on the active tab
              staffMembers={filteredStaff} // Pass the filtered staff to the StaffList component
              onEdit={handleEdit} // Pass the edit handler to the StaffList
              onDelete={handleDelete} // Pass the delete handler to the StaffList
            />
          </div>
        </LoadingOverlay>
      </div>

      {/* Forms for adding or updating staff */}
      <AddDoctorForm
        isOpen={isDoctorFormOpen} // Pass form visibility state for adding a doctor
        onClose={() => setIsDoctorFormOpen(false)} // Close the doctor form
        onSubmit={handleAddStaff} // Handle form submission for adding staff
      />

      <AddNurseForm
        isOpen={isNurseFormOpen} // Pass form visibility state for adding a nurse
        onClose={() => setIsNurseFormOpen(false)} // Close the nurse form
        onSubmit={handleAddStaff} // Handle form submission for adding staff
      />

      {/* Update form for updating staff details */}
      {updateForm.staff && (
        <UpdateStaffForm
          isOpen={updateForm.isOpen} // Pass form visibility state for updating staff
          onClose={() => setUpdateForm({ isOpen: false, staff: null })} // Close the update form
          onUpdate={handleUpdateStaff} // Handle staff update
          staff={updateForm.staff} // Pass the staff member to be updated
        />
      )}
    </div>
  );
};

export default StaffPage;
