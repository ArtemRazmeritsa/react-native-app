import { makeAutoObservable } from 'mobx';
import { fetchShifts } from '../api/fetchShifts';
import { ShiftType } from '../types/ShiftType';
import { GeoCoordinates } from 'react-native-geolocation-service';

class ShiftStore {
  location: GeoCoordinates | null = null;
  shifts: ShiftType[] = [];
  loading: boolean = false;
  selectedShift: ShiftType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLocation(coords: GeoCoordinates) {
    this.location = coords;
    this.loadShifts(coords.latitude, coords.longitude);
  }

  setSelectedShift(shift: ShiftType) {
    this.selectedShift = shift;
  }
  

  async loadShifts(lat: number, lon: number) {
    this.loading = true;
    try {
      const data = await fetchShifts(lat, lon);
      this.shifts = data;
    } finally {
      this.loading = false;
    }
  }
}
export const shiftStore = new ShiftStore();
