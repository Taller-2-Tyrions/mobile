import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	return (
        <>
            <StatusBar style="dark-content" />
            <RootNavigator />
        </>                   
    );
};
