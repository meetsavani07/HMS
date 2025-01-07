import type { Appointment } from '../types/appointment';

export const APPOINTMENT_DURATION = 30; // minutes

export const isTimeSlotAvailable = (
  doctorId: string,
  date: string,
  time: string,
  existingAppointments: Appointment[],
  currentAppointmentId?: string
): boolean => {
  const appointmentTime = new Date(`${date}T${time}`);
  const appointmentEnd = new Date(appointmentTime.getTime() + APPOINTMENT_DURATION * 60000);

  // Filter appointments for the same doctor on the same day
  const doctorAppointments = existingAppointments.filter(apt => 
    apt.doctorId === doctorId && 
    apt.date === date &&
    apt.id !== currentAppointmentId && // Exclude current appointment when updating
    apt.status !== 'cancelled'
  );

  // Check for overlapping appointments
  return !doctorAppointments.some(apt => {
    const existingStart = new Date(`${apt.date}T${apt.time}`);
    const existingEnd = new Date(existingStart.getTime() + apt.duration * 60000);

    return (
      (appointmentTime >= existingStart && appointmentTime < existingEnd) ||
      (appointmentEnd > existingStart && appointmentEnd <= existingEnd) ||
      (appointmentTime <= existingStart && appointmentEnd >= existingEnd)
    );
  });
};