import React from 'react';
import { commonDiseases, commonSymptoms } from '../../../types/diseases'; // Importing common diseases and symptoms

interface DiseaseFieldsProps {
  disease: string; // Selected disease/condition
  severity: string; // Selected severity level
  symptoms: string[]; // List of symptoms selected by the user
  symptomsDescription: string; // Additional description for symptoms
  onChange: (field: string, value: string | string[]) => void; // Callback for handling changes in fields
}

const DiseaseFields: React.FC<DiseaseFieldsProps> = ({
  disease,
  severity,
  symptoms,
  symptomsDescription,
  onChange,
}) => {
  // Function to handle the change in the symptoms (checkboxes)
  const handleSymptomsChange = (symptom: string) => {
    const updatedSymptoms = symptoms.includes(symptom)
      ? symptoms.filter(s => s !== symptom) // If the symptom is already selected, remove it
      : [...symptoms, symptom]; // Otherwise, add it to the list
    onChange('symptoms', updatedSymptoms); // Update the state with the new symptoms list
  };

  return (
    <div className="space-y-4"> {/* Wrapper with vertical spacing */}
      {/* Disease Selection Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Disease/Condition
        </label>
        <select
          required
          value={disease} // Current value for disease
          onChange={(e) => onChange('disease', e.target.value)} // Update state when the disease is selected
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select condition</option> {/* Default option */}
          {/* Mapping through commonDiseases and creating option elements */}
          {commonDiseases.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Severity Selection Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Severity
        </label>
        <select
          required
          value={severity} // Current value for severity
          onChange={(e) => onChange('severity', e.target.value)} // Update state when severity is selected
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select severity</option> {/* Default option */}
          {/* Options for severity */}
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
      </div>

      {/* Symptoms Checkbox Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Symptoms
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {/* Mapping through commonSymptoms and creating checkboxes */}
          {commonSymptoms.map((symptom) => (
            <label key={symptom} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={symptoms.includes(symptom)} // Check if the symptom is selected
                onChange={() => handleSymptomsChange(symptom)} // Toggle symptom in the list on change
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{symptom}</span> {/* Displaying symptom name */}
            </label>
          ))}
        </div>
        
        {/* Additional Symptoms Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Symptoms Description
          </label>
          <textarea
            value={symptomsDescription} // Current value for additional symptoms description
            onChange={(e) => onChange('symptomsDescription', e.target.value)} // Update state on input change
            placeholder="Describe any other symptoms or provide more details..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3} // Textarea rows for input
          />
        </div>
      </div>
    </div>
  );
};

export default DiseaseFields;
