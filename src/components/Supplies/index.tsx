import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SupplyList from './SupplyList';
import SearchInput from '../common/SearchInput';
import { mockSupplies } from '../../data/mockSupplies';

const SuppliesPage: React.FC = () => {
  const [supplies, setSupplies] = useState(mockSupplies);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (supply: any) => {
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    setSupplies(supplies.filter((s) => s.id !== id));
  };

  const handleRestock = (id: string) => {
    // Implement restock logic
  };

  const filteredSupplies = supplies.filter((supply) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      supply.name.toLowerCase().includes(searchLower) ||
      supply.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Supply Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="h-5 w-5" />
          Add Supply
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search supplies..."
          />
        </div>

        <SupplyList
          supplies={filteredSupplies}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRestock={handleRestock}
        />
      </div>
    </div>
  );
};

export default SuppliesPage;
