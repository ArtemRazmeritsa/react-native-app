import { ShiftType } from "./ShiftType";

export type RootStackParamList = {
  Shifts: ShiftType;
  ShiftDetails: { shift: ShiftType }; 
};