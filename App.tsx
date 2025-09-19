import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

const App = () => {
  const [location, setLocation] = useState<GeoCoordinates | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Разрешение отклонено');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (pos) => setLocation(pos.coords),
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <Text style={styles.text}>
          Lat: {location.latitude}, Lon: {location.longitude}
        </Text>
      ) : (
        <Text style={styles.text}>Определяем местоположение...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});

export default App;