import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { ShiftType } from './types/ShiftType';
import { fetchShifts } from './api/shifts';
import { globalStyles } from './globalStyles';

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
        pos => {
          setLocation(pos.coords);
        },
        error => {
          console.log('GEO ERROR:', error);
        },
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
      <View style={[globalStyles.container, globalStyles.center]}>
        <Text style={globalStyles.text}>Определяем местоположение...</Text>
      </View>
    );
  }

  if (!shifts.length) {
    return (
      <View style={[globalStyles.container, globalStyles.center]}>
        <Text style={globalStyles.text}>Загружаем смены...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shifts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={globalStyles.shiftItem}>
          <Image source={{ uri: item.logo }} style={globalStyles.shiftLogo} />
          <View style={globalStyles.shiftInfo}>
            <Text style={globalStyles.shiftCompany}>{item.companyName}</Text>
            <Text style={globalStyles.shiftAddress}>{item.address}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default App;
