import React, { useState } from 'react'; // Importing React and useState hook
import { Plus } from 'lucide-react'; // Importing Plus icon from lucide-react
import SupportList from './SupportList'; // Importing the SupportList component to display the tickets
import SearchInput from '../../common/SearchInput'; // Importing a common SearchInput component for searching tickets
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal'; // Importing a common modal for confirming delete action
import EditTicketForm from './EditTicketForm'; // Importing a form for editing tickets
import AddTicketForm from './AddTicketForm'; // Importing a form for adding new tickets
import { mockTickets } from '../../../data/mockTickets'; // Importing mock data for tickets
import { showToast } from '../../../utils/toast'; // Importing a utility for showing toast messages

const SupportPage: React.FC = () => {
  // States for managing the ticket list, search term, modals, and forms
  const [tickets, setTickets] = useState(mockTickets); // Holds the list of tickets
  const [searchTerm, setSearchTerm] = useState(''); // Holds the current search term
  const [isAddFormOpen, setIsAddFormOpen] = useState(false); // Controls the visibility of the Add Ticket form
  const [editForm, setEditForm] = useState<{ isOpen: boolean; ticket: any }>({
    isOpen: false,
    ticket: null,
  }); // Controls the visibility of the Edit Ticket form and holds the selected ticket
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    ticketId: string;
    subject: string;
  }>({
    isOpen: false,
    ticketId: '',
    subject: '',
  }); // Controls the delete confirmation modal state

  // Handles the creation of a new ticket
  const handleAddTicket = (newTicket: any) => {
    setTickets((prev) => [...prev, newTicket]); // Adds the new ticket to the ticket list
    showToast.success('Support ticket created successfully'); // Displays a success toast message
  };

  // Opens the edit form with the selected ticket
  const handleEdit = (ticket: any) => {
    setEditForm({ isOpen: true, ticket }); // Opens the edit form and sets the selected ticket
  };

  // Handles the update of an existing ticket
  const handleUpdate = (id: string, updatedTicket: any) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === id ? updatedTicket : ticket)) // Updates the ticket in the list
    );
    showToast.success('Support ticket updated successfully'); // Displays a success toast message
  };

  // Handles the delete click and opens the confirmation modal
  const handleDeleteClick = (id: string, subject: string) => {
    setDeleteConfirmation({
      isOpen: true,
      ticketId: id,
      subject,
    });
  };

  // Confirms and performs the deletion of a ticket
  const handleDelete = () => {
    setTickets((prev) => prev.filter((t) => t.id !== deleteConfirmation.ticketId)); // Removes the ticket from the list
    showToast.success('Support ticket deleted successfully'); // Displays a success toast message
  };

  // Marks a ticket as resolved and updates the lastUpdated field
  const handleResolve = (id: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status: 'resolved' as const, // Marks ticket as resolved
              lastUpdated: new Date().toISOString().split('T')[0], // Sets the current date as the last updated date
            }
          : ticket
      )
    );
    showToast.success('Support ticket marked as resolved'); // Displays a success toast message
  };

  // Filters tickets based on the search term
  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = searchTerm.toLowerCase(); // Converts search term to lowercase
    return (
      ticket.subject.toLowerCase().includes(searchLower) || // Checks if the subject matches the search term
      ticket.department.toLowerCase().includes(searchLower) || // Checks if the department matches the search term
      ticket.priority.toLowerCase().includes(searchLower) || // Checks if the priority matches the search term
      ticket.status.toLowerCase().includes(searchLower) // Checks if the status matches the search term
    );
  });

  return (
    <div className="space-y-6"> {/* Container with vertical spacing between elements */}
      {/* Header section with the title and "Create Ticket" button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold">Support</h2>
        <button 
          onClick={() => setIsAddFormOpen(true)} // Opens the Add Ticket form
          className="w-full sm:w-auto text-white bg-gradient-to-r from-emerald-600 to-emerald-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" /> {/* Plus icon for the "Create Ticket" button */}
          Create Ticket
        </button>
      </div>

      {/* Section with the search bar and the Support List table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <SearchInput
            value={searchTerm} // The current search term
            onChange={setSearchTerm} // Updates the search term state
            placeholder="Search tickets..." // Placeholder text for the search input
          />
        </div>

        {/* Displaying the list of filtered tickets */}
        <SupportList
          tickets={filteredTickets} // Passes the filtered tickets to the SupportList component
          onView={handleEdit} // Passes the handleEdit function for viewing ticket details
          onResolve={handleResolve} // Passes the handleResolve function for resolving tickets
          onDelete={handleDeleteClick} // Passes the handleDeleteClick function for deleting tickets
        />
      </div>

      {/* The Add Ticket form modal */}
      <AddTicketForm
        isOpen={isAddFormOpen} // Controls the visibility of the Add Ticket form
        onClose={() => setIsAddFormOpen(false)} // Closes the Add Ticket form
        onSubmit={handleAddTicket} // Submits the new ticket data
      />

      {/* The Edit Ticket form modal (only visible if a ticket is being edited) */}
      {editForm.ticket && (
        <EditTicketForm
          isOpen={editForm.isOpen} // Controls the visibility of the Edit Ticket form
          onClose={() => setEditForm({ isOpen: false, ticket: null })} // Closes the Edit Ticket form
          onUpdate={handleUpdate} // Submits the updated ticket data
          ticket={editForm.ticket} // Passes the ticket being edited
        />
      )}

      {/* The Delete Confirmation modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen} // Controls the visibility of the delete confirmation modal
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, ticketId: '', subject: '' }) // Closes the modal
        }
        onConfirm={handleDelete} // Confirms the ticket deletion
        title="Delete Support Ticket" // Title of the confirmation modal
        message={`Are you sure you want to delete the ticket "${deleteConfirmation.subject}"? This action cannot be undone.`} // Confirmation message
      />
    </div>
  );
};

export default SupportPage;
