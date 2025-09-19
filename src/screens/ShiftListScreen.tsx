import { useEffect, useState } from 'react';
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
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { ShiftType } from '../types/ShiftType';
import { fetchShifts } from '../api/fetchShifts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/Navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Shifts'>;

export function ShiftListScreen() {
  const [location, setLocation] = useState<GeoCoordinates | null>(null);
  const [shifts, setShifts] = useState<ShiftType[]>([]);
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
        pos => setLocation(pos.coords),
        error => console.log('Geolocation error:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (location) {
      fetchShifts(location.latitude, location.longitude, setShifts);
    }
  }, [location]);

  if (!location) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.text}>Определяем местоположение...</Text>
      </View>
    );
  }

  if (!shifts.length) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.text}>Загружаем смены...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shifts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.shiftItem}
          onPress={() => navigation.navigate('ShiftDetails', { shift: item })}
        >
          <Image source={{ uri: item.logo }} style={styles.shiftLogo} />
          <View style={styles.shiftInfo}>
            <Text style={styles.shiftCompany}>{item.companyName}</Text>
            <Text style={styles.shiftAddress}>{item.address}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#000' },
  shiftItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  shiftLogo: { width: 50, height: 50, marginRight: 12 },
  shiftInfo: { flex: 1, justifyContent: 'center' },
  shiftCompany: { fontSize: 16, fontWeight: 'bold' },
  shiftAddress: { fontSize: 14, color: '#000000ff' },
});
