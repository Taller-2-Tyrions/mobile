import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import useAuthProfile from '../hooks/useAuthProfile';

const CustomDrawer = (props) => {
    const { profile } = useAuthProfile();

    return (
        <DrawerContentScrollView {...props}>
        
            <View style={{
                backgroundColor: '#212121',
                padding: 15,
            }}>
                {/* User Row */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                }}>
                    {/* Acá debería ir la img */}
                    <View style={{
                        backgroundColor: '#cacaca',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 10,
                    }} />

                    <View>
                        <Text style={{color: 'white', fontSize: 24}}>{profile.name} {profile.lastName}</Text>
                        <Text style={{color: 'lightgrey'}}>5.00 *</Text>
                    </View>
                </View>

                <View style={{
                borderBottomWidth: 1, 
                borderTopWidth: 1,
                borderBottomColor: '#919191',
                borderTopColor: '#919191',
                paddingVertical: 5,
                marginVertical: 10,
            }}>
                <Pressable onPress={() => {console.warn('Profile settings')}}>
                    <Text style={{color:'#dddddd', paddingVertical: 5}}>Profile settings</Text>
                </Pressable>
            </View>
            
            </View>

        <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer;

const styles = StyleSheet.create({});