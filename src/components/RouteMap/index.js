import React from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc';

const RouteMap = ({ origin, destination }) => {
    const originLocation = {
        latitude: origin.details.geometry.location.lat,
        longitude: origin.details.geometry.location.lng,
    };

    const destinationLocation = {
        latitude: destination.details.geometry.location.lat,
        longitude: destination.details.geometry.location.lng,
    };

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={styles.map}
            initialRegion={{
                latitude: originLocation.latitude,
                longitude: originLocation.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0121,
            }}
        >
            <MapViewDirections
                origin={originLocation}
                destination={destinationLocation}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="black"
            />
            <Marker 
                title={'Origin'} coordinate={originLocation}
            />
            <Marker 
                title={'Destination'} coordinate={destinationLocation}
            />
        </MapView>
    );
};

export default RouteMap;