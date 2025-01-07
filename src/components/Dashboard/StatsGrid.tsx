import React from 'react';
import { Users, Calendar, UserPlus, Activity, AlertTriangle, Stethoscope, BadgeCheck, ClipboardList } from 'lucide-react';

const stats = [
  {
    title: 'Total Patients',
    value: '248',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Today\'s Appointments',
    value: '12',
    change: '+5',
    changeType: 'increase',
    icon: Calendar,
    color: 'bg-green-500',
  },
  {
    title: 'Active Doctors',
    value: '8',
    change: '0',
    changeType: 'neutral',
    icon: Stethoscope,
    color: 'bg-purple-500',
  },
  {
    title: 'Critical Patients',
    value: '3',
    change: '-1',
    changeType: 'decrease',
    icon: AlertTriangle,
    color: 'bg-red-500',
  },
  {
    title: 'Available Beds',
    value: '45',
    change: '-2',
    changeType: 'decrease',
    icon: ClipboardList,
    color: 'bg-yellow-500',
  },
  {
    title: 'Active Staff',
    value: '32',
    change: '+2',
    changeType: 'increase',
    icon: BadgeCheck,
    color: 'bg-indigo-500',
  },
];

const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <div className="flex items-center mt-2">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <span className={`ml-2 text-sm ${
                  stat.changeType === 'increase' ? 'text-green-500' :
                  stat.changeType === 'decrease' ? 'text-red-500' :
                  'text-gray-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;