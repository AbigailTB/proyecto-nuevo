import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de componentes - usando ruta absoluta para evitar problemas
const WelcomeScreen = require('./screens/WelcomeScreen').default;
const LoginScreen = require('./screens/LoginScreen').default;
const RegisterScreen = require('./screens/RegisterScreen').default; // Añadido
const HomeScreen = require('./screens/HomeScreen').default;
const ControlScreen = require('./screens/ControlScreen').default;
const SettingsScreen = require('./screens/SettingsScreen').default;
const ScheduleScreen = require('./screens/ScheduleScreen').default;
const AlarmScreen = require('./screens/AlarmScreen').default;
const RoomScreen = require('./screens/RoomScreen').default;
const AccountScreen = require('./screens/AccountScreen').default;
const EditAccountScreen = require('./screens/EditAccountScreen').default;
const AddAccountScreen = require('./screens/AddAccountScreen').default;
const ProductsScreen = require('./screens/ProductsScreen').default;
const ProductDetailScreen = require('./screens/ProductDetailScreen').default;



// Definir los tipos para los parámetros de las rutas
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined; // Añadido
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
  ProductDetail: { productId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
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
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}