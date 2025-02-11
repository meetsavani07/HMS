import React, { useState } from 'react'; // Importing React and useState hook from React
import { X } from 'lucide-react'; // Importing the "X" (close) icon from lucide-react

// Define the interface for the props that this component will accept
interface AddSupplyFormProps {
  isOpen: boolean; // Controls whether the form is visible or not
  onClose: () => void; // Function to close the form
  onSubmit: (data: any) => void; // Function to submit the form data
}

const AddSupplyForm: React.FC<AddSupplyFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // State to manage the form data. Initialized with default values.
  const [formData, setFormData] = useState({
    name: '', // Name of the supply
    category: '', // Category of the supply
    quantity: 0, // Initial quantity of the supply
    unit: '', // Unit of measurement (e.g., pieces, boxes)
    minQuantity: 0, // Minimum quantity threshold
    lastRestocked: new Date().toISOString().split('T')[0], // Default to today's date
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior
    onSubmit({
      ...formData, // Spread formData to create the new supply object
      id: `s${Date.now()}`, // Assign a unique ID based on the current timestamp
    });
    onClose(); // Close the form after submission
  };

  // If the form is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal container with a black overlay to focus on the form */}
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button to exit the form */}
        <button
          onClick={onClose} // Trigger the onClose function when clicked
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" /> {/* Display the X icon */}
        </button>

        <h2 className="text-2xl font-bold mb-6">Add New Supply</h2> {/* Form title */}

        {/* The form itself */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name} // Bind the input field to formData.name
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update formData.name when the user types
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              required
              value={formData.category} // Bind the input field to formData.category
              onChange={(e) => setFormData({ ...formData, category: e.target.value })} // Update formData.category when the user types
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Grid layout for Quantity and Unit input fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Quantity input field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                required
                min="0" // Ensures the quantity can't be less than 0
                value={formData.quantity} // Bind the input field to formData.quantity
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} // Update formData.quantity when the user types
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Unit input field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                required
                value={formData.unit} // Bind the input field to formData.unit
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })} // Update formData.unit when the user types
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., pieces, boxes" // Provide a placeholder for the unit
              />
            </div>
          </div>

          {/* Minimum Quantity input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Quantity</label>
            <input
              type="number"
              required
              min="0" // Ensures the minimum quantity can't be less than 0
              value={formData.minQuantity} // Bind the input field to formData.minQuantity
              onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) })} // Update formData.minQuantity when the user types
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action buttons: Cancel and Submit */}
          <div className="flex justify-end space-x-3 mt-6">
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose} // Trigger onClose when clicked
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            {/* Submit button */}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Supply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplyForm;
