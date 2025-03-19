import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de componentes - usando ruta absoluta para evitar problemas
const WelcomeScreen = require('./screens/WelcomeScreen').default;
const LoginScreen = require('./screens/LoginScreen').default;
const HomeScreen = require('./screens/HomeScreen').default;
const ControlScreen = require('./screens/ControlScreen').default;
const SettingsScreen = require('./screens/SettingsScreen').default;

// Creamos componentes temporales para las pantallas problemáticas
// Estos se pueden reemplazar cuando los originales funcionen correctamente
const ScheduleScreen = () => <React.Fragment />;
const AlarmScreen = () => <React.Fragment />;
const RoomScreen = () => <React.Fragment />;
const AccountScreen = () => <React.Fragment />;
const EditAccountScreen = () => <React.Fragment />;

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Control" component={ControlScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Alarm" component={AlarmScreen} />
        <Stack.Screen name="Room" component={RoomScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="EditAccount" component={EditAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}