import React from 'react';
import {
  Users,
  Calendar,
  AlertTriangle,
  Stethoscope,
  BadgeCheck,
  ClipboardList,
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    title: 'Total Patients',
    value: '248',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: "Today's Appointments",
    value: '12',
    change: '+5',
    changeType: 'increase',
    icon: Calendar,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Active Doctors',
    value: '8',
    change: '0',
    changeType: 'neutral',
    icon: Stethoscope,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Critical Patients',
    value: '3',
    change: '-1',
    changeType: 'decrease',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
  },
  {
    title: 'Available Beds',
    value: '45',
    change: '-2',
    changeType: 'decrease',
    icon: ClipboardList,
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    title: 'Active Staff',
    value: '32',
    change: '+2',
    changeType: 'increase',
    icon: BadgeCheck,
    color: 'from-indigo-500 to-indigo-600',
  },
];

const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <div className="flex items-center mt-2">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <span
                  className={`ml-2 text-sm ${
                    stat.changeType === 'increase'
                      ? 'text-green-500'
                      : stat.changeType === 'decrease'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
