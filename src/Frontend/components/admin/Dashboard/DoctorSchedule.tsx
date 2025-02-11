import React from 'react';
import { motion } from 'framer-motion';

const schedules = [
  {
    name: 'Dr. John Smith',
    specialty: 'Cardiology',
    nextAvailable: '10:30 AM',
    status: 'available',
  },
  {
    name: 'Dr. Lisa Wong',
    specialty: 'Neurology',
    nextAvailable: '2:00 PM',
    status: 'busy',
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Pediatrics',
    nextAvailable: 'Tomorrow',
    status: 'off-duty',
  },
];

const DoctorSchedule: React.FC = () => {
  return (
    <div className="space-y-4">
      {schedules.map((schedule, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div>
            <p className="font-medium text-gray-900">{schedule.name}</p>
            <p className="text-sm text-gray-500">{schedule.specialty}</p>
          </div>
          <div className="text-right">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                schedule.status === 'available'
                  ? 'bg-green-100 text-green-800'
                  : schedule.status === 'busy'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {schedule.status}
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Next: {schedule.nextAvailable}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DoctorSchedule;
