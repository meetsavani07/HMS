import React from 'react';
import { LucideIcon } from 'lucide-react';

// Define the structure for the StatCard props
interface StatCardProps {
  title: string; // The title of the statistic (e.g., "Total Patients")
  value: string | number; // The numerical/statistical value
  icon: LucideIcon; // The icon component from Lucide
  color: string; // The background color class for the icon container
}

// Functional component for displaying a single statistic card
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 ">
    <div className="flex items-center justify-between">
      {/* Title and value of the statistic */}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>

      {/* Icon container with dynamic color styling */}
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatCard;
