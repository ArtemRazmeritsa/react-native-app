import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#000' },
  shiftItem: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  shiftLogo: { width: 50, height: 50, marginRight: 12 },
  shiftInfo: { flex: 1, justifyContent: 'center' },
  shiftCompany: { fontSize: 16, fontWeight: 'bold' },
  shiftAddress: { fontSize: 14, color: '#000000ff' },
});