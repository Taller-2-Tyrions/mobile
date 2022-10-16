import React from 'react';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const HomeMap = () => {
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