import React from 'react';
import { Text, Image, ScrollView, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftStore } from '../stores/ShiftStore';

export const ShiftDetails = observer(() => {
  const shift = shiftStore.selectedShift;

  if (!shift) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.text}>Смена не выбрана</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={{ uri: shift.logo }} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.company}>{shift.companyName}</Text>
          <Text style={styles.address}>{shift.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Время и дата</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Дата:</Text>
          <Text style={styles.value}>{shift.dateStartByCity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Время:</Text>
          <Text style={styles.value}>
            {shift.timeStartByCity} - {shift.timeEndByCity}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Работники</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Набрано / План:</Text>
          <Text style={styles.value}>
            {shift.currentWorkers}/{shift.planWorkers}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Оплата:</Text>
          <Text style={styles.value}>{shift.priceWorker} ₽</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Отзывы и рейтинг</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Рейтинг:</Text>
          <Text style={styles.value}>{shift.customerRating} / 5</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Отзывы:</Text>
          <Text style={styles.value}>{shift.customerFeedbacksCount}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Типы работ</Text>
        {shift.workTypes.map(wt => (
          <Text key={wt.id} style={styles.value}>
            - {wt.name}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  center: { justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#333' },

  header: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  logo: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  headerText: { flex: 1, justifyContent: 'center' },
  company: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 16, color: '#666' },

  section: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: { fontWeight: '600', color: '#555' },
  value: { color: '#333' },
});

export default ShiftDetails;
