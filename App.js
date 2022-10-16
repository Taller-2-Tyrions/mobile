import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation';
import { AuthProvider } from './src/hooks/useAuth';
import { AuthProfileProvider } from './src/hooks/useAuthProfile';

export default function App() {
	return (
        <NavigationContainer>           
            <AuthProvider>
                <AuthProfileProvider>
                    <Navigator />
                </AuthProfileProvider>
            </AuthProvider>
        </NavigationContainer>
    );
};
