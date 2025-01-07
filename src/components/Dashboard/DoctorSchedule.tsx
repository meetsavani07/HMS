import React from 'react';
import { Clock } from 'lucide-react';

interface DoctorSchedule {
  name: string;
  specialty: string;
  nextAvailable: string;
  status: 'available' | 'busy' | 'off-duty';
}

const DoctorSchedule: React.FC = () => {
  const schedules: DoctorSchedule[] = [
    { name: "Dr. John Smith", specialty: "Cardiology", nextAvailable: "10:30 AM", status: "available" },
    { name: "Dr. Lisa Wong", specialty: "Neurology", nextAvailable: "2:00 PM", status: "busy" },
    { name: "Dr. James Wilson", specialty: "Pediatrics", nextAvailable: "Tomorrow", status: "off-duty" },
  ];

  const getStatusStyle = (status: DoctorSchedule['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'off-duty':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Doctor Schedule</h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
            <div>
              <p className="font-medium">{schedule.name}</p>
              <p className="text-sm text-gray-500">{schedule.specialty}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(schedule.status)}`}>
                {schedule.status}
              </span>
              <p className="text-sm text-gray-500 mt-1">Next: {schedule.nextAvailable}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorSchedule;