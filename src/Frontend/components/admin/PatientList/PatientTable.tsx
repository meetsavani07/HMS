import React from 'react';
import type { Patient } from '../../../types/patient';
import { getConditionStyle } from './utils';
import PatientActions from './PatientActions';
import { Eye } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
  onDeletePatient: (patientId: string, patientName: string) => void;
  onEditPatient: (patient: Patient) => void;
  onViewDetails: (patient: Patient) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onDeletePatient,
  onEditPatient,
  onViewDetails,
}) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No patients found matching your search criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      {/* Mobile view */}
      <div className="md:hidden ">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white p-4 border-b ">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{patient.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewDetails(patient)}
                  className="p-1 text-gray-400 hover:text-blue-500 transition-colors "
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <PatientActions
                  onDelete={() => onDeletePatient(patient.id, patient.name)}
                  onEdit={() => onEditPatient(patient)}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                Age/Gender: {patient.age} / {patient.gender}
              </p>
              <p>Contact: {patient.contact}</p>
              <p>Doctor: {patient.doctorName}</p>
              <p>Admission: {patient.admissionDate}</p>
              <div>
                Condition:{' '}
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getConditionStyle(
                    patient.condition
                  )}`}
                >
                  {patient.condition}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <table className="w-full hidden md:table">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age/Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attending Doctor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Condition
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Admission Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{patient.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {patient.age} / {patient.gender}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{patient.contact}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {patient.doctorName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getConditionStyle(
                    patient.condition
                  )}`}
                >
                  {patient.condition}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {patient.admissionDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewDetails(patient)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <PatientActions
                    onDelete={() => onDeletePatient(patient.id, patient.name)}
                    onEdit={() => onEditPatient(patient)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
