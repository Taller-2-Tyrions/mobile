import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#00000099',
    },
    popupContainer: {
        backgroundColor: 'white',
        top: 20,
        borderRadius: 10,
        height: 1200,
    },
    title: {
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 20,
    },
    formContainer: {
        marginHorizontal: 15,
    },
    titleContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        top: 1000,
        width: '100%',
        padding: 20,
        height: '100%'
    }
});

export default styles;