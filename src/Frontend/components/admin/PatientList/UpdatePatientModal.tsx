import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Patient } from '../../../types/patient';

interface UpdatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (patientId: string, updatedPatient: Omit<Patient, 'id'>) => void;
  patient: Patient;
}

const UpdatePatientModal: React.FC<UpdatePatientModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  patient
}) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    age: patient.age.toString(),
    gender: patient.gender,
    contact: patient.contact,
    condition: patient.condition,
    admissionDate: patient.admissionDate
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(patient.id, {
      ...formData,
      age: parseInt(formData.age, 10),
      doctorId: '', // Add Doctor Details IN Update From
      doctorName: '' // Same as above
      ,
      disease: '',
      severity: '',
      symptoms: [],
      symptomsDescription: '',
      bloodGroup: '',
      allergies: [],
      medications: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl md:text-2xl font-bold mb-6">Update Patient Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                required
                min="0"
                max="150"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'other' })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
              <option value="Serious">Serious</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admission Date
            </label>
            <input
              type="date"
              required
              value={formData.admissionDate}
              onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Update Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePatientModal;