import React, { useState } from 'react'; // Importing React and useState hook
import { Plus } from 'lucide-react'; // Importing Plus icon from lucide-react
import SupplyList from './SupplyList'; // Component for displaying the supply list
import SearchInput from '../../common/SearchInput'; // Reusable search input component
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal'; // Modal for delete confirmation
import EditSupplyForm from './EditSupplyForm'; // Component for editing a supply
import AddSupplyForm from './AddSupplyForm'; // Component for adding a new supply
import { mockSupplies } from '../../../data/mockSupplies'; // Mock supply data
import { showToast } from '../../../utils/toast'; // Utility function for showing toast notifications

const SuppliesPage: React.FC = () => {
  // State management for supplies, search term, form visibility, etc.
  const [supplies, setSupplies] = useState(mockSupplies); // Holds the list of supplies
  const [searchTerm, setSearchTerm] = useState(''); // Holds the current search input
  const [isAddFormOpen, setIsAddFormOpen] = useState(false); // Controls visibility of the add supply form
  const [editForm, setEditForm] = useState<{ isOpen: boolean; supply: any }>({ isOpen: false, supply: null }); // Controls visibility and data for the edit form
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; supplyId: string; supplyName: string }>({
    isOpen: false,
    supplyId: '',
    supplyName: '',
  }); // Manages delete confirmation modal visibility

  // Function to add a new supply to the list
  const handleAddSupply = (newSupply: any) => {
    setSupplies((prev) => [...prev, newSupply]); // Adds new supply to the supplies state
    showToast.success('Supply added successfully'); // Shows a success toast
  };

  // Function to open the edit form for a specific supply
  const handleEdit = (supply: any) => {
    setEditForm({ isOpen: true, supply }); // Sets the edit form open and passes the supply data to edit
  };

  // Function to update a specific supply after editing
  const handleUpdate = (id: string, updatedSupply: any) => {
    setSupplies((prev) => prev.map((supply) => (supply.id === id ? updatedSupply : supply))); // Updates the supply in the list
    showToast.success('Supply updated successfully'); // Shows a success toast
  };

  // Function to trigger delete confirmation for a supply
  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      supplyId: id,
      supplyName: name,
    }); // Opens the delete confirmation modal and sets the supply info for deletion
  };

  // Function to delete a supply from the list
  const handleDelete = () => {
    setSupplies((prev) => prev.filter((s) => s.id !== deleteConfirmation.supplyId)); // Removes the supply from the list based on ID
    showToast.success('Supply deleted successfully'); // Shows a success toast
  };

  // Function to restock a supply (increase its quantity by 50)
  const handleRestock = (id: string) => {
    setSupplies((prev) =>
      prev.map((supply) =>
        supply.id === id
          ? {
              ...supply, // Spread the existing supply data
              quantity: supply.quantity + 50, // Increase quantity by 50
              lastRestocked: new Date().toISOString().split('T')[0], // Update last restocked date
            }
          : supply
      )
    );
    showToast.success('Supply restocked successfully'); // Shows a success toast
  };

  // Filter supplies based on the search term (case-insensitive)
  const filteredSupplies = supplies.filter((supply) => {
    const searchLower = searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive comparison
    return (
      supply.name.toLowerCase().includes(searchLower) || // Check if name matches
      supply.category.toLowerCase().includes(searchLower) // Check if category matches
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Section with title and "Add Supply" button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">Supplies</h2>
        <button
          onClick={() => setIsAddFormOpen(true)} // Opens the add supply form
          className="w-full sm:w-auto text-white bg-gradient-to-r from-emerald-600 to-emerald-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" /> {/* Plus icon for adding supply */}
          Add Supply
        </button>
      </div>

      {/* Search input and supply list container */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <SearchInput
            value={searchTerm} // Bind searchTerm to the SearchInput component
            onChange={setSearchTerm} // Update the search term when the user types
            placeholder="Search supplies..." // Placeholder text for search input
          />
        </div>

        {/* Supply list table */}
        <SupplyList
          supplies={filteredSupplies} // Pass filtered supplies to the SupplyList component
          onEdit={handleEdit} // Pass edit function for each supply
          onDelete={handleDeleteClick} // Pass delete function for each supply
          onRestock={handleRestock} // Pass restock function for each supply
        />
      </div>

      {/* Add Supply Form */}
      <AddSupplyForm
        isOpen={isAddFormOpen} // Controls visibility of the add supply form
        onClose={() => setIsAddFormOpen(false)} // Close the add supply form
        onSubmit={handleAddSupply} // Handle form submission (adding new supply)
      />

      {/* Edit Supply Form */}
      {editForm.supply && (
        <EditSupplyForm
          isOpen={editForm.isOpen} // Controls visibility of the edit supply form
          onClose={() => setEditForm({ isOpen: false, supply: null })} // Close the edit form
          onUpdate={handleUpdate} // Handle updating the supply
          supply={editForm.supply} // Pass supply data to be edited
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen} // Controls visibility of the delete confirmation modal
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, supplyId: '', supplyName: '' }) // Close the modal and reset data
        }
        onConfirm={handleDelete} // Confirm deletion
        title="Delete Supply" // Modal title
        message={`Are you sure you want to delete "${deleteConfirmation.supplyName}" from supplies? This action cannot be undone.`} // Confirmation message
      />
    </div>
  );
};

export default SuppliesPage;
