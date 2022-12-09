import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: '#e7e7e7',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
    },
    inputText: {
        fontSize: 20,
        margin: 5,
        fontWeigth: "600",
        color: '#434343'
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#dbdbdb'
    },
    iconContainer: {
        backgroundColor: '#b3b3b3',
        padding: 10,
        borderRadius: 25
    },
    destinationText: {
        marginLeft: 10,
        fontWeigth: 'bold',
        fontSize: 16
    }

});

export default styles;