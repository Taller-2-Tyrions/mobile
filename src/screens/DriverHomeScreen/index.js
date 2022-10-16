import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthProfile from '../../hooks/useAuthProfile';
import FormDriverPopUp from '../../components/FormDriverPopUp';

const DriverHomeScreen = () => {
    const [isOnline, setIsOnline] = useState(false);
    const { profile } = useAuthProfile();

    const onGoPress = () => {
        setIsOnline(!isOnline);
    };

    const renderBottomTitle = () => {
        if (isOnline) {
            return (
                <Text style={styles.bottomText}>You're online</Text>
            )
        } else {
            return (
                <Text style={styles.bottomText}>You're offline</Text>
            )
        }
    };

    return (
        <>
            <SafeAreaView>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: -34.7425261,
                        longitude: -58.3869874,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />

                <Pressable 
                    onPress={() => console.warn('Balance')}
                    style={styles.balanceButton}    
                >
                    <Text style={styles.balanceText}>
                        <Text style={{color: 'green'}}>$</Text>
                        {' '}
                        0.00
                    </Text>
                </Pressable>

                <Pressable 
                    onPress={onGoPress}
                    style={styles.goButton}    
                >
                    <Text style={styles.goText}>
                        {isOnline ? 'END' : 'GO'}    
                    </Text>
                </Pressable>


                <View style={styles.bottomContainer}>
                    <Ionicons name="options" size={30} color="#4a4a4a" />
                        {renderBottomTitle()}
                    <AntDesign name="bars" size={30} color="#4a4a4a" />
                </View>
            </SafeAreaView>
            {
                !profile.isDriver && <FormDriverPopUp />
            }
        </>
    );
};

export default DriverHomeScreen;