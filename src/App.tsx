import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import { ShiftType } from './types/ShiftType';
import { useEffect, useState } from 'react';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { fetchShifts } from './api/shifts';
import { globalStyles } from './global';

const App = () => {
  const [location, setLocation] = useState<GeoCoordinates | null>(null);
  const [shifts, setShifts] = useState<ShiftType[]>([]);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Разрешение отклонено');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        pos => setLocation(pos.coords),
        error => console.log(error),
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

  return (
    <View style={[globalStyles.container, globalStyles.center]}>
      {location ? (
        <Text style={globalStyles.text}>
          Lat: {location.latitude}, Lon: {location.longitude}
        </Text>
      ) : (
        <Text style={globalStyles.text}>Определяем местоположение...</Text>
      )}
    </View>
  );
};

export default App;
