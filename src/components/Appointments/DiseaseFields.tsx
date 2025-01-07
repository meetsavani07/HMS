import React from 'react';
import { commonDiseases, commonSymptoms } from '../../types/diseases';

interface DiseaseFieldsProps {
  disease: string;
  severity: string;
  symptoms: string[];
  symptomsDescription: string;
  onChange: (field: string, value: string | string[]) => void;
}

const DiseaseFields: React.FC<DiseaseFieldsProps> = ({
  disease,
  severity,
  symptoms,
  symptomsDescription,
  onChange,
}) => {
  const handleSymptomsChange = (symptom: string) => {
    const updatedSymptoms = symptoms.includes(symptom)
      ? symptoms.filter(s => s !== symptom)
      : [...symptoms, symptom];
    onChange('symptoms', updatedSymptoms);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Disease/Condition
        </label>
        <select
          required
          value={disease}
          onChange={(e) => onChange('disease', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select condition</option>
          {commonDiseases.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Severity
        </label>
        <select
          required
          value={severity}
          onChange={(e) => onChange('severity', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select severity</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Symptoms
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {commonSymptoms.map((symptom) => (
            <label key={symptom} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={symptoms.includes(symptom)}
                onChange={() => handleSymptomsChange(symptom)}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Symptoms Description
          </label>
          <textarea
            value={symptomsDescription}
            onChange={(e) => onChange('symptomsDescription', e.target.value)}
            placeholder="Describe any other symptoms or provide more details..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default DiseaseFields;