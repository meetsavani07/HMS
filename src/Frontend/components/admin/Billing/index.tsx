import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BillList from './BillList';
import SearchInput from '../../common/SearchInput';
import { mockBills } from '../../../data/mockBills';
import { Bill } from '../../../types/billing';
import AddBillForm from './AddBillForm';
import BillDetails from './BillDetails';
import { showToast } from '../../../utils/toast';

const BillingPage: React.FC = () => {
  // State to manage the list of bills
  const [bills, setBills] = useState<Bill[]>(mockBills);
  
  // State for the search term input
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to control whether the "Add Bill" form is open or closed
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  
  // State to manage the selected bill for viewing details
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Handler for adding a new bill to the list
  const handleAddBill = (newBill: Bill) => {
    setBills((prev) => [...prev, newBill]); // Add the new bill to the state
    setIsAddFormOpen(false); // Close the add bill form
    showToast.success('Bill created successfully'); // Show a success toast
  };

  // Handler to update the status of a bill
  const handleUpdateStatus = (billId: string, status: Bill['status']) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === billId
          ? {
              ...bill,
              status, // Update the status of the bill
              // If the status is marked as 'paid', add payment details
              ...(status === 'paid'
                ? {
                    paymentDate: new Date().toISOString().split('T')[0],
                    paymentMethod: 'Credit Card', // Example payment method, could be made dynamic
                  }
                : {}),
            }
          : bill
      )
    );
    showToast.success(`Bill marked as ${status}`); // Show a success toast when status is updated
  };

  // Filter the bills based on the search term
  const filteredBills = bills.filter((bill) => {
    const searchLower = searchTerm.toLowerCase(); // Convert the search term to lowercase
    return (
      bill.patientName.toLowerCase().includes(searchLower) || // Search by patient name
      bill.id.toLowerCase().includes(searchLower) || // Search by bill ID
      bill.status.toLowerCase().includes(searchLower) // Search by bill status
    );
  });

  return (
    <div className="space-y-6">
      {/* Header with title and 'Create New Bill' button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">Billing</h2>
        <button
          onClick={() => setIsAddFormOpen(true)} // Open the "Add Bill" form
          className="w-full sm:w-auto text-white bg-gradient-to-r from-emerald-600 to-emerald-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Create New Bill
        </button>
      </div>

      {/* Bill list section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          {/* Search input to filter bills */}
          <SearchInput
            value={searchTerm} // Pass the current search term to the input
            onChange={setSearchTerm} // Update the search term on input change
            placeholder="Search bills..."
          />
        </div>

        {/* Bill list component that shows filtered bills */}
        <BillList
          bills={filteredBills} // Pass the filtered bills to the list
          onViewDetails={setSelectedBill} // Set the selected bill when view details is clicked
          onUpdateStatus={handleUpdateStatus} // Handle updating the bill status
        />
      </div>

      {/* Render the "Add Bill" form if it's open */}
      {isAddFormOpen && (
        <AddBillForm
          onClose={() => setIsAddFormOpen(false)} // Close the form
          onSubmit={handleAddBill} // Handle form submission to add a new bill
        />
      )}

      {/* Render the BillDetails component when a bill is selected */}
      {selectedBill && (
        <BillDetails
          bill={selectedBill} // Pass the selected bill to the details component
          onClose={() => setSelectedBill(null)} // Close the bill details view
          onUpdateStatus={handleUpdateStatus} // Handle updating the bill status from details
        />
      )}
    </div>
  );
};

export default BillingPage;
