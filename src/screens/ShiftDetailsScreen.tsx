import React from 'react';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/Navigation';
import { RouteProp, useRoute } from '@react-navigation/native';

type ShiftDetailsRouteProp = RouteProp<RootStackParamList, 'ShiftDetails'>;

export function ShiftDetails() {
  const route = useRoute<ShiftDetailsRouteProp>();
  const { shift } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: shift.logo }} style={styles.logo} />
      <Text style={styles.company}>{shift.companyName}</Text>
      <Text style={styles.address}>{shift.address}</Text>
      <Text>Date: {shift.dateStartByCity}</Text>
      <Text>
        Time: {shift.timeStartByCity} - {shift.timeEndByCity}
      </Text>
      <Text>
        Workers: {shift.currentWorkers}/{shift.planWorkers}
      </Text>
      <Text>Price: {shift.priceWorker} ₽</Text>
      <Text>
        Customer Rating: {shift.customerRating} ({shift.customerFeedbacksCount})
      </Text>
      <Text>Work Types:</Text>
      {shift.workTypes.map(wt => (
        <Text key={wt.id}>- {wt.name}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  logo: { width: 120, height: 120, marginBottom: 16, borderRadius: 8 },
  company: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 16, marginBottom: 8 },
});

export default ShiftDetails;
