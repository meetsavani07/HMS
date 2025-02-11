import React from 'react';
import { Award, Users, Heart, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">About MADICARE</h1>

        {/* Mission & Vision */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide exceptional healthcare services with compassion and
                expertise, ensuring the well-being of our community through
                innovative medical solutions and patient-centered care.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the leading healthcare provider, recognized for excellence
                in medical care, research, and patient satisfaction, while
                continuously advancing healthcare standards.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Compassion</h3>
            <p className="text-gray-600">
              We treat every patient with kindness, empathy, and respect.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for the highest standards in healthcare delivery.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Integrity</h3>
            <p className="text-gray-600">
              We maintain the highest ethical standards in all our actions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Teamwork</h3>
            <p className="text-gray-600">
              We collaborate effectively to provide comprehensive care.
            </p>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our History</h2>
          <p className="text-gray-600 mb-4">
            Founded in 1995, MADICARE has grown from a small clinic to a
            comprehensive healthcare facility. Over the years, we have
            continuously expanded our services and upgraded our facilities to
            meet the growing healthcare needs of our community.
          </p>
          <p className="text-gray-600">
            Today, we are proud to be one of the leading healthcare providers in
            the region, serving thousands of patients annually with
            state-of-the-art medical care and unwavering commitment to patient
            well-being.
          </p>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Award className="h-6 w-6 text-blue-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">
                  Excellence in Patient Care
                </h3>
                <p className="text-gray-600">
                  Consistently rated among top healthcare providers for patient
                  satisfaction.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Award className="h-6 w-6 text-blue-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Quality Certification</h3>
                <p className="text-gray-600">
                  Accredited by leading healthcare quality assessment
                  organizations.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Award className="h-6 w-6 text-blue-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Research Excellence</h3>
                <p className="text-gray-600">
                  Contributing to medical research and innovation.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Award className="h-6 w-6 text-blue-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Community Service</h3>
                <p className="text-gray-600">
                  Recognized for our commitment to community healthcare
                  initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
