import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de componentes
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ControlScreen from './screens/ControlScreen';
import SettingsScreen from './screens/SettingsScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import AlarmScreen from './screens/AlarmScreen';
import RoomScreen from './screens/RoomScreen';
import AccountScreen from './screens/AccountScreen';
import EditAccountScreen from './screens/EditAccountScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailScreen';

// Importar providers de contexto
import { AuthProvider } from './database/context/AuthContext';
import { BlindProvider } from './database/context/BlindContext';
<<<<<<< HEAD
import { MQTTProvider } from './database/context/MQTTContext'; // Nuevo provider MQTT
=======
<<<<<<< HEAD
import { MQTTProvider } from './database/context/MQTTContext'; // Nuevo provider MQTT
=======
import { MQTTProvider } from './database/context/MQTTContext';
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49

// Definir los tipos para los parámetros de las rutas
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Control: { deviceId?: number };
  Settings: undefined;
  Schedule: undefined;
  Alarm: undefined;
  Room: undefined;
  Account: undefined;
  EditAccount: undefined;
  AddAccount: undefined;
  Products: undefined;
  ProductDetails: { productId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <MQTTProvider> {/* Nuevo provider MQTT */}
=======
<<<<<<< HEAD
      <MQTTProvider> {/* Nuevo provider MQTT */}
=======
      <MQTTProvider>
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
        <BlindProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Control" component={ControlScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Schedule" component={ScheduleScreen} />
              <Stack.Screen name="Alarm" component={AlarmScreen} />
              <Stack.Screen name="Room" component={RoomScreen} />
              <Stack.Screen name="Account" component={AccountScreen} />
              <Stack.Screen name="EditAccount" component={EditAccountScreen} />
              <Stack.Screen name="AddAccount" component={AddAccountScreen} />
              <Stack.Screen name="Products" component={ProductsScreen} />
<<<<<<< HEAD
              <Stack.Screen 
                name="ProductDetails" 
                component={ProductDetailsScreen as React.ComponentType<any>} 
=======
<<<<<<< HEAD
              <Stack.Screen 
                name="ProductDetails" 
                component={ProductDetailsScreen as React.ComponentType<any>} 
=======
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen as React.ComponentType<any>}
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BlindProvider>
      </MQTTProvider>
    </AuthProvider>
  );
}