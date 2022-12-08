import React from 'react'
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeSearch = ({ nameDefaultAddress }) => {
    const navigation = useNavigation();

    const goToSearch = () => {
        navigation.navigate('SearchScreen');
    };

    return (
        <View>
            <Pressable onPress={goToSearch} style={styles.inputBox}>
                <Text style={styles.inputText}>
                    Where to?
                </Text>
            </Pressable>

            <View style={styles.row}>
                <View style={styles.iconContainer}>
                <Entypo name="star" size={22} color={'white'} />
                </View>
                <Text style={styles.destinationText}>{nameDefaultAddress}</Text>
            </View>

            <Pressable style={styles.row}>
                <Text>Agregar dirección a favoritos</Text>
            </Pressable>
        </View>
    );
};

export default HomeSearch;