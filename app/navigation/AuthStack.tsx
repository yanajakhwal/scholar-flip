// navigation/AuthStack.tsx
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from './navigationTypes'; // ✅

const Stack = createStackNavigator<RootStackParamList>();
type AuthStackProps = {
    initialRoute?: keyof RootStackParamList;
  };
  
  export default function AuthStack({ initialRoute = 'LoginSignup' }: AuthStackProps) {
    return (
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    );
  }