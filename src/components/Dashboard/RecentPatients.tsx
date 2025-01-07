import React from 'react';
import { Calendar } from 'lucide-react';

interface Patient {
  name: string;
  condition: string;
  admissionDate: string;
}

const RecentPatients: React.FC = () => {
  const recentPatients: Patient[] = [
    { name: "Sarah Johnson", condition: "Stable", admissionDate: "2024-03-18" },
    { name: "Michael Chen", condition: "Critical", admissionDate: "2024-03-17" },
    { name: "Emma Davis", condition: "Fair", admissionDate: "2024-03-16" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Patients</h3>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {recentPatients.map((patient, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
            <div>
              <p className="font-medium">{patient.name}</p>
              <p className="text-sm text-gray-500">Admitted: {patient.admissionDate}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              patient.condition === 'Critical' ? 'bg-red-100 text-red-800' :
              patient.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {patient.condition}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentPatients;