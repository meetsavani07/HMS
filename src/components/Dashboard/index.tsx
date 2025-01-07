import React from 'react';
import StatsGrid from './StatsGrid';
import RecentPatients from './RecentPatients';
import DoctorSchedule from './DoctorSchedule';
import { Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Activity className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold">Hospital Dashboard</h2>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPatients />
        <DoctorSchedule />
      </div>
    </div>
  );
};

export default Dashboard;