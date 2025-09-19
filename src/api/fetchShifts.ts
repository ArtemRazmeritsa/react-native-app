import { ShiftType } from '../types/ShiftType';

export const fetchShifts = async (
  lat: number,
  lon: number,
  setData: (shifts: ShiftType[]) => void,
) => {
  try {
    const response = await fetch(
      `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${lat}&longitude=${lon}`,
    );

    if (!response.ok) {
      console.error('Server error:', response.status);
      return;
    }
    const shifts: { data: ShiftType[] } = await response.json();
    setData(shifts.data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
