import React, { useEffect } from 'react';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

Location.installWebGeolocationPolyfill();

const HomeMap = () => {
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
          }
        })();
    }, []);

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={styles.map}
            initialRegion={{
                latitude: -34.7425261,
                longitude: -58.3869874,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    );
};

export default HomeMap;