import { Text, View, Pressable } from 'react-native';
import React from 'react';
import styles from './styles';
import { useForm } from 'react-hook-form';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import useAuth from '../../hooks/useAuth';
import useAuthProfile from '../../hooks/useAuthProfile';

const FormDriverPopUp = () => {
    const {
        control,
        handleSubmit,
    } = useForm();
    const { user } = useAuth();
    const { profile, completeDriverForm } = useAuthProfile();

    const onSubmitPressed = async (data) => {
        completeDriverForm(user.accessToken, profile, data);
    }

    return (
        <View style={styles.root}>
            <Pressable style={styles.popupContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Completá los siguientes datos</Text>
                </View>
                
                <View style={styles.formContainer}>
                    <CustomInput 
                        name="model"
                        placeholder="Modelo del vehículo"
                        control={control}
                        rules={{
                            required: 'Campo obligatorio',
                        }}
                    />

                    <CustomInput 
                        name="year"
                        placeholder="Año"
                        control={control}
                        rules={{
                            required: 'Campo obligatorio',
                        }}
                    />

                    <CustomInput 
                        name="plaque"
                        placeholder="Placa"
                        control={control}
                        rules={{
                            required: 'Campo obligatorio',
                        }}
                    />

                    <CustomInput 
                        name="capacity"
                        placeholder="Capacidad"
                        control={control}
                        rules={{
                            required: 'Campo obligatorio',
                        }}
                    />

                    <CustomButton 
                        text="Finalizar"
                        onPress={handleSubmit(onSubmitPressed)}
                    />
                </View>
            </Pressable>
        </View>
    )
}

export default FormDriverPopUp;