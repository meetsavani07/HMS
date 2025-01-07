import React from 'react';
import { X, Calendar, Clock, User, Phone, MapPin, Stethoscope, AlertTriangle } from 'lucide-react';
import type { Appointment } from '../../types/appointment';

interface AppointmentDetailsProps {
  appointment: Appointment;
  onClose: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Patient Information
            </h3>
            <div className="space-y-2">
              <p><span className="font-medium">ID:</span> {appointment.patientId}</p>
              <p><span className="font-medium">Name:</span> {appointment.patientName}</p>
              <p><span className="font-medium">Age:</span> {appointment.age}</p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <p>{appointment.contact}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <p>{appointment.address}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-500" />
              Medical Information
            </h3>
            <div className="space-y-2">
              <p><span className="font-medium">Disease:</span> {appointment.disease}</p>
              <p><span className="font-medium">Severity:</span> {appointment.severity}</p>
              <p><span className="font-medium">Symptoms:</span> {appointment.symptoms.join(', ')}</p>
              <p className="text-sm text-gray-600">{appointment.symptomsDescription}</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{appointment.doctorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="font-medium">{appointment.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <p className="font-medium">{appointment.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${
                  appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  <AlertTriangle className="h-3 w-3" />
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;