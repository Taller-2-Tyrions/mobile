import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation';
import { AuthProvider } from './src/hooks/useAuth';

export default function App() {
	return (
        <NavigationContainer>           
            <AuthProvider>
                <Navigator />
            </AuthProvider>
        </NavigationContainer>
    );
};
