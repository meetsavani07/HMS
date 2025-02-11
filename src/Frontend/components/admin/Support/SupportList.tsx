import React from 'react'; // Importing React
import { MessageCircle, Clock, Eye, CheckCircle, Trash2 } from 'lucide-react'; // Importing icons from lucide-react

// Define the structure for the support ticket data
interface SupportTicket {
  id: string; // Unique identifier for each ticket
  subject: string; // Subject of the ticket
  department: string; // Department handling the ticket
  priority: 'low' | 'medium' | 'high'; // Priority of the ticket
  status: 'open' | 'in-progress' | 'resolved'; // Status of the ticket
  createdAt: string; // When the ticket was created
  lastUpdated: string; // Last update timestamp
}

// Define the props that the SupportList component will accept
interface SupportListProps {
  tickets: SupportTicket[]; // Array of support tickets to display
  onView: (ticket: SupportTicket) => void; // Function to view ticket details
  onResolve: (id: string) => void; // Function to mark the ticket as resolved
  onDelete: (id: string) => void; // Function to delete the ticket
}

const SupportList: React.FC<SupportListProps> = ({
  tickets,
  onView,
  onResolve,
  onDelete,
}) => {
  // Function to determine the color based on priority level
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'; // Red for high priority
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'; // Yellow for medium priority
      default:
        return 'bg-green-100 text-green-800'; // Green for low priority
    }
  };

  // Function to determine the color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800'; // Green for resolved tickets
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'; // Blue for in-progress tickets
      default:
        return 'bg-yellow-100 text-yellow-800'; // Yellow for open tickets
    }
  };

  return (
    <div className="overflow-x-auto"> {/* Makes the table horizontally scrollable if needed */}
      <table className="min-w-full divide-y divide-gray-200"> {/* The table with a light gray divider */}
        <thead className="bg-gray-50"> {/* Header row with a light gray background */}
          <tr>
            {/* Table headers */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200"> {/* Body of the table */}
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50"> {/* Each row for a ticket */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{ticket.subject}</div> {/* Subject of the ticket */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ticket.department} {/* Department handling the ticket */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Priority level displayed with the corresponding color */}
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Status displayed with the corresponding color */}
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{ticket.createdAt}</div> {/* Ticket creation timestamp */}
                <div className="text-xs text-gray-400">Updated: {ticket.lastUpdated}</div> {/* Last updated timestamp */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Actions column with buttons to view, resolve, or delete a ticket */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(ticket)} // View details button
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" /> {/* Eye icon for viewing */}
                  </button>
                  {ticket.status !== 'resolved' && (
                    <button
                      onClick={() => onResolve(ticket.id)} // Resolve ticket button
                      className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                      title="Mark as resolved"
                    >
                      <CheckCircle className="h-4 w-4" /> {/* Check-circle icon for resolving */}
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(ticket.id)} // Delete ticket button
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete ticket"
                  >
                    <Trash2 className="h-4 w-4" /> {/* Trash icon for deletion */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportList;
