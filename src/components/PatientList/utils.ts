export const getConditionStyle = (condition: string): string => {
  switch (condition) {
    case 'Critical':
      return 'bg-red-100 text-red-800';
    case 'Serious':
      return 'bg-orange-100 text-orange-800';
    case 'Fair':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-green-100 text-green-800';
  }
};

export const filterPatients = (patients: any[], searchTerm: string) => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  if (!normalizedSearch) return patients;
  
  return patients.filter(patient => {
    return (
      patient.name.toLowerCase().includes(normalizedSearch) ||
      patient.contact.toLowerCase().includes(normalizedSearch) ||
      patient.condition.toLowerCase().includes(normalizedSearch) ||
      `${patient.age}`.includes(normalizedSearch) ||
      patient.gender.toLowerCase().includes(normalizedSearch) ||
      patient.admissionDate.includes(normalizedSearch)
    );
  });
};