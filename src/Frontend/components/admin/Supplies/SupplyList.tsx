import React from 'react';
import { Package, AlertTriangle, Edit2, RefreshCw, Trash2 } from 'lucide-react';

interface Supply {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  lastRestocked: string;
}

interface SupplyListProps {
  supplies: Supply[];
  onEdit: (supply: Supply) => void;
  onDelete: (id: string) => void;
  onRestock: (id: string) => void;
}

const SupplyList: React.FC<SupplyListProps> = ({
  supplies,
  onEdit,
  onDelete,
  onRestock,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Restocked</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
        <tbody className="bg-white divide-y divide-gray-200">{supplies.map((supply) => (<tr key={supply.id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{supply.name}</div></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supply.category}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supply.quantity} {supply.unit}</td><td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${supply.quantity > supply.minQuantity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{supply.quantity > supply.minQuantity ? 'In Stock' : 'Low Stock'}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supply.lastRestocked}</td><td className="px-6 py-4 whitespace-nowrap"><div className="flex space-x-2"><button onClick={() => onEdit(supply)} className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title="Edit supply"><Edit2 className="h-4 w-4" /></button><button onClick={() => onRestock(supply.id)} className="p-1 text-gray-400 hover:text-green-500 transition-colors" title="Restock"><RefreshCw className="h-4 w-4" /></button><button onClick={() => onDelete(supply.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete supply"><Trash2 className="h-4 w-4" /></button></div></td></tr>))}</tbody>
      </table>
    </div>
  );
};

export default SupplyList;