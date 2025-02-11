import React, { useState } from 'react'; // Import React and useState hook from React
import { X } from 'lucide-react'; // Import the "X" (close) icon from lucide-react

// Define the types for the props that this component will receive
interface Supply {
  id: string; // Unique identifier for the supply
  name: string; // Name of the supply
  category: string; // Category the supply belongs to
  quantity: number; // Current quantity of the supply
  unit: string; // Unit of measurement (e.g., "kg", "pieces")
  minQuantity: number; // Minimum quantity threshold for the supply
  lastRestocked: string; // Date of last restocking
}

// Props for the EditSupplyForm component
interface EditSupplyFormProps {
  isOpen: boolean; // Controls whether the form is visible or not
  onClose: () => void; // Function to close the form
  onUpdate: (id: string, data: Supply) => void; // Function to update the supply after editing
  supply: Supply; // The supply object to be edited
}

const EditSupplyForm: React.FC<EditSupplyFormProps> = ({
  isOpen,
  onClose,
  onUpdate,
  supply,
}) => {
  // Local state to manage the form data, initialized with the supply's data
  const [formData, setFormData] = useState(supply);

  // Handle form submission (updating the supply)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submit behavior
    onUpdate(supply.id, formData); // Call onUpdate with the supply's id and updated form data
    onClose(); // Close the form after submitting
  };

  // If the form is not open, return null to not render the form
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal container, centered on the screen */}
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose} // Trigger onClose when clicked
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" /> {/* X icon for closing the form */}
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Supply</h2> {/* Form title */}

        {/* Form element to edit supply data */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name} // Bind value to formData.name
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update name in formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              required
              value={formData.category} // Bind value to formData.category
              onChange={(e) => setFormData({ ...formData, category: e.target.value })} // Update category in formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity and Unit input fields (2 columns layout) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Quantity input field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                required
                min="0" // Set minimum value to 0
                value={formData.quantity} // Bind value to formData.quantity
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} // Update quantity in formData on change
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Unit input field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                required
                value={formData.unit} // Bind value to formData.unit
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })} // Update unit in formData on change
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Minimum Quantity input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Quantity</label>
            <input
              type="number"
              required
              min="0" // Set minimum value to 0
              value={formData.minQuantity} // Bind value to formData.minQuantity
              onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) })} // Update minQuantity in formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose} // Trigger onClose when clicked
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            {/* Update Supply button */}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Update Supply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplyForm;
