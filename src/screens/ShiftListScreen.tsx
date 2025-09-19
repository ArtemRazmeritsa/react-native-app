import { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/Navigation';
import { shiftStore } from '../stores/ShiftStore';
import { observer } from 'mobx-react-lite';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Shifts'>;

export const ShiftListScreen = observer(() => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission denied');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        pos => {
          shiftStore.setLocation(pos.coords);
        },
        error => console.log('Geolocation error:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (shiftStore.location) {
      shiftStore.loadShifts(
        shiftStore.location.latitude,
        shiftStore.location.longitude,
      );
    }
  }, []);

  if (!shiftStore.location) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.text}>Определяем местоположение...</Text>
      </View>
    );
  }

  if (shiftStore.loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.text}>Загружаем смены...</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={shiftStore.shifts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            shiftStore.setSelectedShift(item);
            navigation.navigate('ShiftDetails', { shift: item });
          }}
        >
          <View style={styles.cardHeader}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <View style={styles.cardHeaderTextContainer}>
              <Text style={styles.company}>{item.companyName}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.row}>
              <Text style={styles.label}>Дата:</Text>
              <Text style={styles.value}>{item.dateStartByCity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Время:</Text>
              <Text style={styles.value}>
                {item.timeStartByCity} - {item.timeEndByCity}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Набрано/План:</Text>
              <Text style={styles.value}>
                {item.currentWorkers}/{item.planWorkers}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Оплата:</Text>
              <Text style={styles.value}>{item.priceWorker} ₽</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 12 },
  center: { justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#333' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', marginBottom: 12 },
  cardHeaderTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  company: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 14, color: '#666' },

  cardBody: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: { fontWeight: '600', color: '#555' },
  value: { color: '#333' },
});
