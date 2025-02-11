import React from 'react';
import { motion } from 'framer-motion';

const patients = [
  {
    name: 'Sarah Johnson',
    condition: 'Stable',
    admissionDate: '2024-03-18',
  },
  {
    name: 'Michael Chen',
    condition: 'Critical',
    admissionDate: '2024-03-17',
  },
  {
    name: 'Emma Davis',
    condition: 'Fair',
    admissionDate: '2024-03-16',
  },
];

const RecentPatients: React.FC = () => {
  return (
    <div className="space-y-4">
      {patients.map((patient, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div>
            <p className="font-medium text-gray-900">{patient.name}</p>
            <p className="text-sm text-gray-500">
              Admitted: {patient.admissionDate}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              patient.condition === 'Critical'
                ? 'bg-red-100 text-red-800'
                : patient.condition === 'Fair'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {patient.condition}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default RecentPatients;
