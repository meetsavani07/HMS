import React, { useState } from 'react';
// Importing necessary components and icons
import { Plus } from 'lucide-react';
import type { Insurance } from '../../../types/insurance';
import InsuranceList from './InsuranceList';
import SearchInput from '../../common/SearchInput';
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal';
import EditInsuranceForm from './EditInsuranceForm';
import AddInsuranceForm from './AddInsuranceForm';
import { mockInsurance } from '../../../data/mockInsurance';
import { showToast } from '../../../utils/toast';

const InsurancePage: React.FC = () => {
  // State hooks to manage various states of the page
  const [insurance, setInsurance] = useState(mockInsurance); // Holds the list of insurance data
  const [searchTerm, setSearchTerm] = useState(''); // Holds the search term for filtering
  const [isAddFormOpen, setIsAddFormOpen] = useState(false); // Controls the visibility of the add form
  const [editForm, setEditForm] = useState<{
    isOpen: boolean;
    insurance: any;
  }>({
    isOpen: false,
    insurance: null,
  }); // Controls the visibility of the edit form and the selected insurance for editing
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    insuranceId: string;
    planName: string;
  }>({
    isOpen: false,
    insuranceId: '',
    planName: '',
  }); // Controls the visibility and details of the delete confirmation modal

  // Handler to add a new insurance plan
  const handleAddInsurance = (newInsurance: Omit<Insurance, 'id'>) => {
    // Create a new insurance object with a unique ID based on timestamp
    const insurance = {
      ...newInsurance,
      id: `i${Date.now()}`,
    };
    // Update the state with the new insurance plan
    setInsurance((prev) => [...prev, insurance]);
    // Show a success toast notification
    showToast.success('Insurance plan added successfully');
  };

  // Handler to open the edit form with the selected insurance data
  const handleEdit = (insurance: any) => {
    setEditForm({ isOpen: true, insurance });
  };

  // Handler to update an existing insurance plan
  const handleUpdate = (id: string, updatedInsurance: any) => {
    // Map over the existing insurance list and update the modified insurance plan
    setInsurance((prev) =>
      prev.map((ins) => (ins.id === id ? updatedInsurance : ins))
    );
    // Show a success toast notification
    showToast.success('Insurance plan updated successfully');
  };

  // Handler to open the delete confirmation modal
  const handleDeleteClick = (id: string, planName: string) => {
    setDeleteConfirmation({
      isOpen: true,
      insuranceId: id,
      planName,
    });
  };

  // Handler to delete an insurance plan from the list
  const handleDelete = () => {
    // Filter out the insurance plan with the given ID
    setInsurance((prev) => prev.filter((i) => i.id !== deleteConfirmation.insuranceId));
    // Show a success toast notification
    showToast.success('Insurance plan deleted successfully');
  };

  // Handler to renew an insurance plan (extend its end date by one year)
  const handleRenew = (id: string) => {
    // Update the end date of the selected insurance plan
    setInsurance((prev) =>
      prev.map((ins) =>
        ins.id === id
          ? {
              ...ins,
              endDate: new Date(
                new Date(ins.endDate).setFullYear(
                  new Date(ins.endDate).getFullYear() + 1
                )
              ).toISOString().split('T')[0], // Format the new end date
            }
          : ins
      )
    );
    // Show a success toast notification
    showToast.success('Insurance plan renewed successfully');
  };

  // Filtering the insurance list based on the search term (search by provider, plan name, or coverage)
  const filteredInsurance = insurance.filter((ins) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ins.provider.toLowerCase().includes(searchLower) ||
      ins.planName.toLowerCase().includes(searchLower) ||
      ins.coverage.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header and Add Insurance button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">Insurance</h2>
        {/* Button to open the add insurance form */}
        <button 
          onClick={() => setIsAddFormOpen(true)}
          className="w-full sm:w-auto text-white bg-gradient-to-r from-emerald-600 to-emerald-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Add Insurance
        </button>
      </div>

      {/* Search and Insurance List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          {/* Search input component */}
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search insurance plans..."
          />
        </div>

        {/* Insurance list component with filtered data */}
        <InsuranceList
          insurances={filteredInsurance}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onRenew={handleRenew}
        />
      </div>

      {/* Add insurance form modal */}
      <AddInsuranceForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)} // Close the form
        onSubmit={handleAddInsurance} // Submit handler
      />

      {/* Edit insurance form modal */}
      {editForm.insurance && (
        <EditInsuranceForm
          isOpen={editForm.isOpen}
          onClose={() => setEditForm({ isOpen: false, insurance: null })} // Close the form
          onUpdate={handleUpdate} // Update handler
          insurance={editForm.insurance} // Pass the insurance to be edited
        />
      )}

      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, insuranceId: '', planName: '' }) // Close the modal
        }
        onConfirm={handleDelete} // Confirm delete handler
        title="Delete Insurance Plan"
        message={`Are you sure you want to delete the insurance plan "${deleteConfirmation.planName}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default InsurancePage;
