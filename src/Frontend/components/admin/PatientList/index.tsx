import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import AddPatientModal from './AddPatientModal';
import UpdatePatientModal from './UpdatePatientModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import SearchBar from './SearchBar';
import PatientTable from './PatientTable';
import PatientDetails from './PatientDetails';
import { filterPatients } from './utils';
import { useLoading } from '../../../hooks/useLoading';
import LoadingOverlay from '../../common/LoadingOverlay';
import { Patient } from '../../../types/patient';
import { showToast } from '../../../utils/toast';

// Mock data for doctors
const mockDoctors = [
  { id: 'd1', name: 'Dr. John Smith', specialization: 'Cardiology' },
  { id: 'd2', name: 'Dr. Sarah Johnson', specialization: 'Neurology' },
  { id: 'd3', name: 'Dr. Michael Chen', specialization: 'Pediatrics' },
];

const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 45,
    gender: 'male',
    contact: '(555) 123-4567',
    condition: 'Stable',
    admissionDate: '2024-03-15',
    doctorId: 'd1',
    doctorName: 'Dr. John Smith',
    disease: 'Hypertension',
    severity: 'Moderate',
    symptoms: ['Headache', 'Dizziness'],
    symptomsDescription: 'Frequent headaches and occasional dizziness',
    bloodGroup: 'A+',
    allergies: ['Penicillin'],
    medications: ['Lisinopril', 'Aspirin'],
  },
  {
    id: 'p2',
    name: 'Jane Smith',
    age: 32,
    gender: 'female',
    contact: '(555) 987-6543',
    condition: 'Critical',
    admissionDate: '2024-03-14',
    doctorId: 'd2',
    doctorName: 'Dr. Sarah Johnson',
    disease: 'Pneumonia',
    severity: 'Severe',
    symptoms: ['Fever', 'Cough', 'Shortness of Breath'],
    symptomsDescription:
      'High fever with severe coughing and difficulty breathing',
    bloodGroup: 'O+',
    allergies: [],
    medications: ['Azithromycin', 'Paracetamol'],
  },
];

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState<{
    isOpen: boolean;
    patient: Patient | null;
  }>({
    isOpen: false,
    patient: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, withLoading } = useLoading();
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    patientId: string;
    patientName: string;
  }>({
    isOpen: false,
    patientId: '',
    patientName: '',
  });
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);

  const handleAddPatient = useCallback(
    async (newPatient: Omit<Patient, 'id'>) => {
      await withLoading(async () => {
        const patient: Patient = {
          ...newPatient,
          id: `p${Date.now()}`,
        };
        setPatients((prevPatients) => [...prevPatients, patient]);
        showToast.success('Patient added successfully');
      });
      setIsAddModalOpen(false);
    },
    [withLoading]
  );

  const handleUpdatePatient = useCallback(
    async (patientId: string, updatedPatient: Omit<Patient, 'id'>) => {
      await withLoading(async () => {
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === patientId
              ? { ...updatedPatient, id: patientId }
              : patient
          )
        );
        showToast.success('Patient updated successfully');
      });
      setUpdateModal({ isOpen: false, patient: null });
    },
    [withLoading]
  );

  const handleEditPatient = useCallback((patient: Patient) => {
    setUpdateModal({ isOpen: true, patient });
  }, []);

  const handleDeletePatient = useCallback(
    (patientId: string, patientName: string) => {
      setDeleteConfirmation({
        isOpen: true,
        patientId,
        patientName,
      });
    },
    []
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteConfirmation.patientId) return;

    await withLoading(async () => {
      setPatients((prevPatients) =>
        prevPatients.filter(
          (patient) => patient.id !== deleteConfirmation.patientId
        )
      );
      showToast.success('Patient deleted successfully');
    });

    setDeleteConfirmation({
      isOpen: false,
      patientId: '',
      patientName: '',
    });
  }, [deleteConfirmation.patientId, withLoading]);

  const handleViewDetails = useCallback((patient: Patient) => {
    setViewingPatient(patient);
  }, []);

  const filteredPatients = filterPatients(patients, searchTerm);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">Patients</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-300 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-4 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Patient</span>
        </button>
      </div>

      <LoadingOverlay isLoading={isLoading}>
        <div className="bg-white rounded-lg shadow-md">
          <div
            className="p-4 border-b text-black"
          >
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name, contact, condition..."
            />
          </div>

          <PatientTable
            patients={filteredPatients}
            onDeletePatient={handleDeletePatient}
            onEditPatient={handleEditPatient}
            onViewDetails={handleViewDetails}
          />
        </div>
      </LoadingOverlay>

      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPatient}
        doctors={mockDoctors}
      />

      {updateModal.patient && (
        <UpdatePatientModal
          isOpen={updateModal.isOpen}
          onClose={() => setUpdateModal({ isOpen: false, patient: null })}
          onUpdate={handleUpdatePatient}
          patient={updateModal.patient}
          doctors={mockDoctors}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={confirmDelete}
        patientName={deleteConfirmation.patientName}
      />

      {viewingPatient && (
        <PatientDetails
          patient={viewingPatient}
          onClose={() => setViewingPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientList;
