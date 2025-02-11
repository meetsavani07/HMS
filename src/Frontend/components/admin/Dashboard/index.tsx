import { motion } from 'framer-motion';
import StatsGrid from './StatsGrid';
import RecentPatients from './RecentPatients';
import DoctorSchedule from './DoctorSchedule';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6 p-6 bg-gray-50 min-h-screen rounded-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-teal-700 p-6 rounded-2xl shadow-lg "
        variants={itemVariants}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 p-3 rounded-2xl">
            <img
              alt="Logo"
              src="/src/Frontend/image/MEDICARE.png"
              width="60"
              className="bg-white p-2 rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r text-white">
              Hospital Dashboard
            </h2>
            <p className="text-white">
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <StatsGrid />
      </motion.div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
              Recent Patients
            </h3>
          </div>
          <RecentPatients />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
              Doctor Schedule
            </h3>
          </div>
          <DoctorSchedule />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
