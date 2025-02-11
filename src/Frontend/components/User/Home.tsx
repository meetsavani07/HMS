import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Building2, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const Home: React.FC = () => {
  const { translations } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="min-h-screen  to-white">
      {/* Hero Section */}
      <motion.div
        className="bg-teal-700 m-8 rounded-2xl gap-4 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/src/Frontend/image/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            className="max-w-3xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {translations['home.welcome']}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {translations['home.subtitle']}
            </p>
            <Link
              to="/user/book-appointment"
              className="inline-flex items-center px-8 py-4 bg-white bg-gradient-to-r from-emerald-600 to-emerald-300 text-primary-600 rounded-full font-semibold text-lg  transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {translations['home.bookAppointment']}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              to: '/user/book-appointment',
              icon: Calendar,
              title: translations['nav.bookAppointment'],
              description: translations['home.appointment'],
              color: 'bg-blue-500',
            },
            {
              to: '/user/my-details',
              icon: User,
              title: translations['nav.myDetails'],
              description: translations['home.details'],
              color: 'bg-green-500',
            },
            {
              to: '/user/facilities',
              icon: Building2,
              title: translations['nav.facilities'],
              description: translations['home.facilities'],
              color: 'bg-purple-500',
            },
            {
              to: '/user/contact',
              icon: Phone,
              title: translations['nav.contact'],
              description: translations['home.contact'],
              color: 'bg-red-500',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                to={item.to}
                className="block bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`${item.color} text-white p-3 rounded-xl inline-block mb-4`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="bg-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {translations['home.whyChooseUs']}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: User,
                title: translations['home.doctors.title'],
                description: translations['home.doctors.description'],
              },
              {
                icon: Building2,
                title: translations['home.facilities.title'],
                description: translations['home.facilities.description'],
              },
              {
                icon: Calendar,
                title: translations['home.scheduling.title'],
                description: translations['home.scheduling.description'],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
