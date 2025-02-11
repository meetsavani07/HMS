import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { mockDoctors, hospitals } from '../../data/mockDoctors';
import { useAvailableSlots } from '../../hooks/useAvailableSlots';
import { showToast } from '../../utils/toast';
import { useLanguage } from '../../contexts/LanguageContext';

const BookAppointment: React.FC = () => {
  const { translations } = useLanguage();
  const [formData, setFormData] = useState({
    hospital: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });

  // Filter doctors based on selected hospital
  const filteredDoctors = mockDoctors.filter(
    doctor => !formData.hospital || doctor.hospital === formData.hospital
  );

  const { availableSlots, isLoading } = useAvailableSlots(
    formData.doctorId,
    formData.date
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success('Appointment booked successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">{translations['appointment.title']}</h1>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Hospital
              </label>
              <select
                required
                value={formData.hospital}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    hospital: e.target.value,
                    doctorId: '' // Reset doctor selection when hospital changes
                  });
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{translations['appointment.chooseHospital']}</option>
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations['appointment.selectDoctor']}
              </label>
              <select
                required
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={!formData.hospital}
              >
                <option value="">{translations['appointment.chooseDoctor']}</option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations['appointment.selectDate']}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations['appointment.selectTime']}
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!formData.doctorId || !formData.date || isLoading}
                >
                  <option value="">{translations['appointment.selectTime']}</option>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations['appointment.reasonVisit']}
              </label>
              <textarea
                required
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder={translations['appointment.reasonPlaceholder']}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {translations['appointment.submit']}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;