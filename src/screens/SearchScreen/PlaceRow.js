import { Entypo } from '@expo/vector-icons';
import React from 'react'
import { Text, View } from 'react-native';
import styles from './styles';

const PlaceRow = ({ data }) => {
    return (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                {data.description === 'Home' 
                    ? <Entypo name='home' size={20} color={'white'} /> 
                    : <Entypo name='location-pin' size={20} color={'white'} />
                }
            </View>
            <Text styles={styles.locationText}>{data.description || data.vicinity}</Text>
        </View>
    )
}

export default PlaceRow;