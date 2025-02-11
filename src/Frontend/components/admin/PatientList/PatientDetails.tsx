import React from 'react';
import { X, User, Phone, Calendar, Stethoscope, Activity, Droplet, AlertCircle, Pill, Download, Printer } from 'lucide-react';
import type { Patient } from '../../../types/patient';
import { generatePDF } from '../../../utils/pdfGenerator';

interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    generatePDF('patient', patient);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Patient Details</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Print details"
            >
              <Printer className="h-5 w-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div id="printable-content" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Personal Information
            </h3>
            <div className="space-y-2">
              <p><span className="font-medium">ID:</span> {patient.id}</p>
              <p><span className="font-medium">Name:</span> {patient.name}</p>
              <p><span className="font-medium">Age:</span> {patient.age}</p>
              <p><span className="font-medium">Gender:</span> {patient.gender}</p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <p>{patient.contact}</p>
              </div>
            </div>
          </div>

          {/* Medical Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Medical Status
            </h3>
            <div className="space-y-2">
              <p><span className="font-medium">Condition:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  patient.condition === 'Critical' ? 'bg-red-100 text-red-800' :
                  patient.condition === 'Serious' ? 'bg-orange-100 text-orange-800' :
                  patient.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {patient.condition}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p>Admitted: {patient.admissionDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-gray-400" />
                <p>Doctor: {patient.doctorName}</p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Medical Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Disease:</span> {patient.disease || 'Not specified'}</p>
                <p><span className="font-medium">Severity:</span> {patient.severity || 'Not specified'}</p>
                <div className="mt-2">
                  <p className="font-medium mb-1">Symptoms:</p>
                  {patient.symptoms.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {patient.symptoms.map((symptom, index) => (
                        <li key={index} className="text-sm text-gray-600">{symptom}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No symptoms recorded</p>
                  )}
                </div>
                {patient.symptomsDescription && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Additional Notes:</span><br />
                    {patient.symptomsDescription}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="h-4 w-4 text-red-500" />
                  <p><span className="font-medium">Blood Group:</span> {patient.bloodGroup || 'Not specified'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <p className="font-medium">Allergies:</p>
                  </div>
                  {patient.allergies.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {patient.allergies.map((allergy, index) => (
                        <li key={index} className="text-sm text-gray-600">{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No known allergies</p>
                  )}
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <p className="font-medium">Current Medications:</p>
                  </div>
                  {patient.medications.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {patient.medications.map((medication, index) => (
                        <li key={index} className="text-sm text-gray-600">{medication}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No current medications</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;