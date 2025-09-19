import { ShiftType } from '../types/ShiftType';

export const fetchShifts = async (
  lat: number,
  lon: number,
  setData: (shifts: ShiftType[]) => void,
) => {
  try {
    const response = await fetch(
      `https://mobile.handswork.pro/api/shift?lat=${lat}&lon=${lon}`,
    );

    if (!response.ok) {
      console.error('Ошибка сервера:', response.status);
      return;
    }
    const data: { shifts: ShiftType[] } = await response.json();
    setData(data.shifts);
  } catch (error) {
    console.error('Ошибка fetch:', error);
  }
};
