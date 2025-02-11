import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.bookAppointment': 'Book Appointment',
    'nav.myDetails': 'My Details',
    'nav.facilities': 'Facilities',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.settings': 'Settings',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.language.english': 'English',
    'settings.language.spanish': 'Spanish',
    'settings.language.hindi': 'Hindi',
    'settings.account': 'Account',
    'settings.account.description': 'Manage your account settings',
    'settings.logout': 'Logout',


    // Home
    'home.welcome': 'Welcome to MADICARE',
    'home.subtitle': 'Your trusted partner in healthcare. Experience quality medical care with our expert team of professionals.',
    'home.bookAppointment': 'Book an Appointment',

    // Home Quicklink 
    'home.appointment': 'Schedule your visit with our expert doctors',
    'home.details': 'View and manage your personal information',
    'home.facilities': 'Explore our state-of-the-art medical facilities',
    'home.contact': 'Get in touch with our support team',

    // Home Featues
    'home.whyChooseUs': 'Why Choose Us',
    'home.doctors.title' : 'Expert Doctors',
    'home.doctors.description':'Our team consists of highly qualified and experienced medical professionals',

    'home.facilities.title':'Modern Facilities',
    'home.facilities.description':'State-of-the-art medical equipment and comfortable environment',
    'home.scheduling.title':'Easy Scheduling',
    'home.scheduling.description':'Book appointments quickly and manage your visits efficiently',

    // Book Appointment
    'appointment.title': 'Book an Appointment',
    'appointment.selectDoctor':'Select Doctor',
    'appointment.chooseDoctor': 'Choose a doctor',
    'appointment.selectDate': 'Select Date',
    'appointment.selectTime': 'Select Time',
    'appointment.reasonVisit': 'Reason for Visit',
    'appointment.reasonPlaceholder': 'Please describe your symptoms or reason for visit',
    'appointment.submit': 'Book Appointment',

    // My Details
    'details.title': 'My Details',
    'details.edit': 'Edit',
    'details.cancel': 'Cancel',
    'details.save': 'Save Changes',
    'details.form': {
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      dob: 'Date of Birth',
      address: 'Address',
      bloodGroup: 'Blood Group',
      allergies: 'Allergies',
      emergencyContact: 'Emergency Contact',
    },

    // Facilities
    'facilities.title': 'Our Facilities',
    'facilities.departments': {
      emergency: {
        title: 'Emergency Department',
        description:
          '24/7 emergency care with state-of-the-art equipment and experienced staff.',
      },
      outpatient: {
        title: 'Outpatient Department',
        description:
          'Comprehensive outpatient services across multiple specialties.',
      },
      diagnostic: {
        title: 'Diagnostic Center',
        description:
          'Advanced diagnostic facilities including laboratory and imaging services.',
      },
      inpatient: {
        title: 'Inpatient Wards',
        description:
          'Comfortable and well-equipped rooms for patient care and recovery.',
      },
      vaccination: {
        title: 'Vaccination Center',
        description:
          'Regular and specialized vaccination services for all age groups.',
      },
      icu: {
        title: 'ICU',
        description:
          'Intensive Care Unit with modern life support systems and monitoring.',
      },
    },
    'facilities.whyChoose': 'Why Choose Our Facilities?',
    'facilities.features': {
      equipment: {
        title: 'Modern Equipment',
        description:
          'Our facilities are equipped with the latest medical technology to provide accurate diagnosis and effective treatment.',
      },
      staff: {
        title: 'Expert Staff',
        description:
          'Our medical professionals are highly trained and experienced in their respective fields.',
      },
      availability: {
        title: '24/7 Availability',
        description:
          'Emergency services and critical care facilities are available round the clock.',
      },
      comfort: {
        title: 'Patient Comfort',
        description:
          'We prioritize patient comfort with well-maintained and clean facilities.',
      },
    },

    // About
    'about.title': 'About MADICARE',
    'about.mission': {
      title: 'Our Mission',
      description:
        'To provide exceptional healthcare services with compassion and expertise, ensuring the well-being of our community through innovative medical solutions and patient-centered care.',
    },
    'about.vision': {
      title: 'Our Vision',
      description:
        'To be the leading healthcare provider, recognized for excellence in medical care, research, and patient satisfaction, while continuously advancing healthcare standards.',
    },
    'about.values': {
      compassion: {
        title: 'Compassion',
        description:
          'We treat every patient with kindness, empathy, and respect.',
      },
      excellence: {
        title: 'Excellence',
        description:
          'We strive for the highest standards in healthcare delivery.',
      },
      integrity: {
        title: 'Integrity',
        description:
          'We maintain the highest ethical standards in all our actions.',
      },
      teamwork: {
        title: 'Teamwork',
        description:
          'We collaborate effectively to provide comprehensive care.',
      },
    },

    // Contact
    'contact.title': 'Contact Us',
    'contact.getInTouch': 'Get in Touch',
    'contact.form': {
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
    },
    'contact.info': {
      phone: {
        title: 'Phone',
        emergency: 'Emergency: (555) 123-4567',
        reception: 'Reception: (555) 987-6543',
      },
      email: {
        title: 'Email',
        general: 'info@madicare.com',
        support: 'support@madicare.com',
      },
      address: {
        title: 'Address',
        line1: '123 Healthcare Avenue',
        line2: 'Medical District',
        line3: 'City, State 12345',
      },
      hours: {
        title: 'Working Hours',
        weekdays: 'Monday - Friday: 8:00 AM - 8:00 PM',
        saturday: 'Saturday: 8:00 AM - 5:00 PM',
        sunday: 'Sunday: Emergency Only',
      },
    },
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.bookAppointment': 'Reservar Cita',
    'nav.myDetails': 'Mis Detalles',
    'nav.facilities': 'Instalaciones',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.settings': 'Ajustes',

    // Settings
    'settings.title': 'Ajustes',
    'settings.language': 'Idioma',
    'settings.language.english': 'Inglés',
    'settings.language.spanish': 'Español',
    'settings.language.hindi': 'Hindi',
    'settings.account': 'Cuenta',
    'settings.account.description': 'Administra la configuración de tu cuenta',
    'settings.logout': 'Cerrar Sesión',

    // Home
    'home.welcome': 'Bienvenido a MADICARE',
    'home.subtitle': 'Tu socio de confianza en salud. Experimenta atención médica de calidad con nuestro equipo de profesionales expertos.',
    'home.bookAppointment': 'Reservar Cita',
    'home.appointment': 'Programa tu visita con nuestros médicos expertos',
    'home.details': 'Ver y gestionar tu información personal',
    'home.facilities': 'Explora nuestras instalaciones médicas de última generación',
    'home.contact': 'Ponte en contacto con nuestro equipo de soporte',
    'home.whyChooseUs': '¿Por qué elegirnos?',
    'home.doctors.title': 'Médicos Expertos',
    'home.doctors.description': 'Nuestro equipo está formado por profesionales médicos altamente cualificados y experimentados',
    'home.facilities.title':'Instalaciones Modernas',
    'home.facilities.description':'Equipamiento médico de última generación y ambiente confortable',
    'home.scheduling.title':'Programación Fácil',
    'home.scheduling.description':'Reserva citas rápidamente y gestiona tus visitas de manera eficiente',
  
    // Book Appointment
    'appointment.title': 'Reservar Cita',
    'appointment.selectDoctor': 'Seleccionar Médico',
    'appointment.chooseDoctor': 'Elige un médico',
    'appointment.selectDate': 'Seleccionar Fecha',
    'appointment.selectTime': 'Seleccionar Hora',
    'appointment.reasonVisit': 'Motivo de la Visita', 
    'appointment.reasonPlaceholder': 'Por favor, describe tus síntomas o motivo de la visita',
    'appointment.submit': 'Reservar Cita'
    
    // Add translations for other sections...
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.bookAppointment': 'अपॉइंटमेंट बुक करें',
    'nav.myDetails': 'मेरी जानकारी',
    'nav.facilities': 'सुविधाएं',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क करें',
    'nav.settings': 'सेटिंग्स',

    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.language': 'भाषा',
    'settings.language.english': 'अंग्रेजी',
    'settings.language.spanish': 'स्पेनिश',
    'settings.language.hindi': 'हिंदी',
    'settings.account': 'खाता',
    'settings.account.description': 'अपने खाते की सेटिंग्स प्रबंधित करें',
    'settings.logout': 'लॉग आउट',

    // Home
    'home.welcome': 'MADICARE में आपका स्वागत है',
    'home.subtitle': 'स्वास्थ्य सेवा में आपका विश्वसनीय साथी। हमारी विशेषज्ञ टीम के साथ गुणवत्तापूर्ण चिकित्सा देखभाल का अनुभव करें।',
    'home.bookAppointment': 'अपॉइंटमेंट बुक करें',
    'home.appointment': 'हमारे विशेषज्ञ डॉक्टरों के साथ अपनी विजिट शेड्यूल करें',
    'home.details': 'अपनी व्यक्तिगत जानकारी देखें और प्रबंधित करें',
    'home.facilities': 'हमारी अत्याधुनिक चिकित्सा सुविधाओं का अन्वेषण करें',
    'home.contact': 'हमारी सहायता टीम से संपर्क करें',
    'home.whyChooseUs': 'हमें क्यों चुनें',
    'home.doctors.title': 'विशेषज्ञ डॉक्टर',
    'home.doctors.description': 'हमारी टीम में उच्च योग्य और अनुभवी चिकित्सा पेशेवर शामिल हैं',
    'home.facilities.title': 'आधुनिक सुविधाएं',
    'home.facilities.description': 'अत्याधुनिक चिकित्सा उपकरण और आरामदायक वातावरण',
    'home.scheduling.title': 'आसान शेड्यूलिंग',
    'home.scheduling.description': 'जल्दी से अपॉइंटमेंट बुक करें और अपनी विजिट को कुशलतापूर्वक प्रबंधित करें',

    // Add translations for other sections...
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
