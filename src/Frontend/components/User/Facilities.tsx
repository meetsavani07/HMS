import React from 'react';
import {
  Building2,
  Stethoscope,
  Microscope,
  Bed,
  Syringe,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const facilities = [
  {
    icon: Building2,
    name: 'Emergency Department',
    description:
      '24/7 emergency care with state-of-the-art equipment and experienced staff.',
  },
  {
    icon: Stethoscope,
    name: 'Outpatient Department',
    description:
      'Comprehensive outpatient services across multiple specialties.',
  },
  {
    icon: Microscope,
    name: 'Diagnostic Center',
    description:
      'Advanced diagnostic facilities including laboratory and imaging services.',
  },
  {
    icon: Bed,
    name: 'Inpatient Wards',
    description:
      'Comfortable and well-equipped rooms for patient care and recovery.',
  },
  {
    icon: Syringe,
    name: 'Vaccination Center',
    description:
      'Regular and specialized vaccination services for all age groups.',
  },
  {
    icon: Activity,
    name: 'ICU',
    description:
      'Intensive Care Unit with modern life support systems and monitoring.',
  },
];

const Facilities: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 ">
        <motion.h1
          className="text-3xl font-bold mb-8 bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Facilities
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <facility.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">{facility.name}</h3>
              </div>
              <p className="text-gray-600">{facility.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">
            Why Choose Our Facilities?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Modern Equipment</h3>
              <p className="text-gray-600">
                Our facilities are equipped with the latest medical technology
                to provide accurate diagnosis and effective treatment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Expert Staff</h3>
              <p className="text-gray-600">
                Our medical professionals are highly trained and experienced in
                their respective fields.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Emergency services and critical care facilities are available
                round the clock.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Patient Comfort</h3>
              <p className="text-gray-600">
                We prioritize patient comfort with well-maintained and clean
                facilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
