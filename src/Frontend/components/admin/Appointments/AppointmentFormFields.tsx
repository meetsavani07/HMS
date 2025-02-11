import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { TimeSlot } from '../../../types/timeSlot';
import { hospitals } from '../../../data/mockDoctors';

interface AppointmentFormFieldsProps {
  formData: {
    patientName: string;
    age: number;
    contact: string;
    address: string;
    hospital: string;
    doctorId: string;
    date: string;
    time: string;
  };
  doctors: Array<{ id: string; name: string; specialization: string; hospital: string }>;
  availableSlots: TimeSlot[];
  isLoadingSlots: boolean;
  error: string | null;
  onChange: (field: string, value: string | number) => void;
}

const AppointmentFormFields: React.FC<AppointmentFormFieldsProps> = ({
  formData,
  doctors,
  availableSlots,
  isLoadingSlots,
  error,
  onChange,
}) => {
  // Filter doctors based on selected hospital
  const filteredDoctors = doctors.filter(
    doctor => !formData.hospital || doctor.hospital === formData.hospital
  );

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <input
            type="text"
            required
            value={formData.patientName}
            onChange={(e) => onChange('patientName', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter patient name"
          />
        </div>

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
            onChange={(e) => onChange('age', parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            required
            value={formData.contact}
            onChange={(e) => onChange('contact', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter contact number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hospital
          </label>
          <select
            required
            value={formData.hospital}
            onChange={(e) => {
              onChange('hospital', e.target.value);
              onChange('doctorId', ''); // Reset doctor selection when hospital changes
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Doctor
        </label>
        <select
          required
          value={formData.doctorId}
          onChange={(e) => onChange('doctorId', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={!formData.hospital}
        >
          <option value="">Select a doctor</option>
          {filteredDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          required
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={2}
          placeholder="Enter full address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={(e) => onChange('date', e.target.value)}
              className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              required
              value={formData.time}
              onChange={(e) => onChange('time', e.target.value)}
              className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!formData.doctorId || !formData.date || isLoadingSlots}
            >
              <option value="">Select time</option>
              {availableSlots.map((slot) => (
                <option
                  key={slot.start}
                  value={slot.start}
                  disabled={!slot.isAvailable}
                >
                  {slot.start}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFormFields;