import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SupportList from './SupportList';
import SearchInput from '../common/SearchInput';
import { mockTickets } from '../../data/mockTickets';

const SupportPage: React.FC = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');

  const handleView = (ticket: any) => {
    // Implement view logic
  };

  const handleResolve = (id: string) => {
    // Implement resolve logic
  };

  const handleDelete = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ticket.subject.toLowerCase().includes(searchLower) ||
      ticket.department.toLowerCase().includes(searchLower) ||
      ticket.priority.toLowerCase().includes(searchLower) ||
      ticket.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Support Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="h-5 w-5" />
          Create Ticket
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search tickets..."
          />
        </div>

        <SupportList
          tickets={filteredTickets}
          onView={handleView}
          onResolve={handleResolve}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
export default SupportPage;
