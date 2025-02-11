import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Bill, BillItem } from '../../../types/billing';

interface AddBillFormProps {
  isOpen: boolean; // Controls whether the bill creation form is visible
  onClose: () => void; // Function to close the form
  onSubmit: (bill: Bill) => void; // Function to submit the bill
}

const AddBillForm: React.FC<AddBillFormProps> = ({ onClose, onSubmit }) => {
  // State to store the main bill data excluding the 'id'
  const [formData, setFormData] = useState<Omit<Bill, 'id'>>({
    patientId: '',
    patientName: '',
    billDate: new Date().toISOString().split('T')[0], // Default to the current date
    dueDate: '',
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    status: 'pending',
    paymentMethod: '',
    paymentDate: '',
  });

  // State to store the new bill item data before adding it to the list
  const [newItem, setNewItem] = useState<Omit<BillItem, 'id'>>({
    description: '',
    quantity: 1,
    unitPrice: 0,
    total: 0,
  });

  // Function to calculate subtotal, tax, and total based on bill items
  const calculateTotals = (items: BillItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0); // Sum of item totals
    const tax = subtotal * 0.1; // Tax rate is 10%
    const total = subtotal + tax - formData.discount; // Total after discount
    return { subtotal, tax, total };
  };

  // Function to handle adding a new item to the bill
  const handleAddItem = () => {
    if (
      !newItem.description || // Ensure description is filled
      newItem.quantity <= 0 || // Ensure quantity is valid
      newItem.unitPrice <= 0 // Ensure unit price is valid
    ) {
      return; // Exit if any validation fails
    }

    const item: BillItem = {
      id: `item${Date.now()}`, // Unique ID for the item based on timestamp
      ...newItem,
      total: newItem.quantity * newItem.unitPrice, // Calculate item total
    };

    const updatedItems = [...formData.items, item]; // Add new item to the list
    const { subtotal, tax, total } = calculateTotals(updatedItems); // Recalculate totals

    setFormData((prev) => ({
      ...prev,
      items: updatedItems, // Update the bill items
      subtotal,
      tax,
      total,
    }));

    // Reset new item form data
    setNewItem({
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    });
  };

  // Function to handle removing an item from the bill
  const handleRemoveItem = (itemId: string) => {
    const updatedItems = formData.items.filter((item) => item.id !== itemId); // Remove item by ID
    const { subtotal, tax, total } = calculateTotals(updatedItems); // Recalculate totals

    setFormData((prev) => ({
      ...prev,
      items: updatedItems, // Update the bill items
      subtotal,
      tax,
      total,
    }));
  };

  // Function to handle form submission (creating the bill)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (formData.items.length === 0) {
      return; // Prevent submission if no items are added
    }

    const bill: Bill = {
      id: `BILL${Date.now()}`, // Unique ID for the bill based on timestamp
      ...formData,
      status: formData.paymentMethod ? 'paid' : 'pending', // Determine status based on payment method
      paymentDate: formData.paymentMethod ? new Date().toISOString().split('T')[0] : undefined, // Set payment date if paid
    };

    onSubmit(bill); // Call the onSubmit function passed as prop
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose} // Close the form when clicked
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Create New Bill</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bill Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                required
                value={formData.patientId}
                onChange={(e) =>
                  setFormData({ ...formData, patientId: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bill Date
              </label>
              <input
                type="date"
                required
                value={formData.billDate}
                onChange={(e) =>
                  setFormData({ ...formData, billDate: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Bill Items Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Bill Items</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseInt(e.target.value),
                      total: parseInt(e.target.value) * newItem.unitPrice,
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Unit Price"
                    min="0"
                    step="0.01"
                    value={newItem.unitPrice}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        unitPrice: parseFloat(e.target.value),
                        total: newItem.quantity * parseFloat(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddItem} // Add the item to the bill
                    className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Displaying the list of items added to the bill */}
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)} // Remove item from the bill
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subtotal, Tax, Discount, and Total calculation */}
          <div className="border-t pt-6">
            <div className="flex flex-col items-end space-y-2">
              <div className="text-sm">
                <span className="font-medium">Subtotal:</span> ₹
                {formData.subtotal.toFixed(2)}
              </div>
              <div className="text-sm">
                <span className="font-medium">Tax (10%):</span> ₹
                {formData.tax.toFixed(2)}
              </div>
              <div className="text-sm">
                <span className="font-medium">Discount:</span> ₹
                {formData.discount.toFixed(2)}
              </div>
              <div className="text-lg font-semibold">
                <span className="font-medium">Total:</span> ₹
                {formData.total.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Create Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBillForm;
