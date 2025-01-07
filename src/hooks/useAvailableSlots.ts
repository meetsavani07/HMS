import { useState, useEffect } from 'react';
import type { TimeSlot } from '../types/appointment';

export const useAvailableSlots = (
  doctorId: string, 
  date: string,
  currentTime?: string
) => {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!doctorId || !date) {
      setAvailableSlots([]);
      return;
    }

    const fetchAvailableSlots = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call
        // For now, we'll generate mock time slots
        const slots: TimeSlot[] = [];
        const startHour = 9; // 9 AM
        const endHour = 17; // 5 PM

        for (let hour = startHour; hour < endHour; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const start = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const endMinute = (minute + 30) % 60;
            const endHour = minute + 30 >= 60 ? hour + 1 : hour;
            const end = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
            
            // If editing, make the current time slot available
            const isCurrentTimeSlot = start === currentTime;
            
            slots.push({
              start,
              end,
              isAvailable: isCurrentTimeSlot || Math.random() > 0.3,
            });
          }
        }

        setAvailableSlots(slots);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [doctorId, date, currentTime]);

  return { availableSlots, isLoading };
};