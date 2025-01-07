import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import InsuranceList from './InsuranceList';
import SearchInput from '../common/SearchInput';
import { mockInsurance } from '../../data/mockInsurance';

const InsurancePage: React.FC = () => {
  const [insurance, setInsurance] = useState(mockInsurance);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (insurance: any) => {
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    setInsurance((prev) => prev.filter((i) => i.id !== id));
  };

  const handleRenew = (id: string) => {
    // Implement renew logic
  };

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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Insurance Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="h-5 w-5" />
          Add Insurance
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search insurance plans..."
          />
        </div>

        <InsuranceList
          insurances={filteredInsurance}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRenew={handleRenew}
        />
      </div>
    </div>
  );
};
export default InsurancePage;
