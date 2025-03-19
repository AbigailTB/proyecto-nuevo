import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Dimensions,
  StatusBar
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Colores basados en la paleta proporcionada
const colors = {
  azulOscuro: '#001B2A',
  azulMedio: '#1B263B',
  azulClaro: '#415A77',
  azulPastel: '#778DA9',
  blanco: '#E0E1DD',
  negro: '#000000'
};

type RootStackParamList = {
  Home: undefined;
  Control: { deviceId: number };
  Settings: undefined;
};

type Device = {
  id: number;
  name: string;
  status: string;
  type: 'blind' | 'ac' | 'light' | 'thermostat';
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [temperature, setTemperature] = useState<number>(22.5);
  const [humidity, setHumidity] = useState<number>(45);
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Persiana Sala', status: 'Cerrada', type: 'blind' },
    { id: 2, name: 'Persiana Dormitorio', status: 'Abierta', type: 'blind' },
    { id: 3, name: 'Persiana Cocina', status: 'Cerrada', type: 'blind' },
    { id: 4, name: 'Persiana Estudio', status: 'Semi-abierta', type: 'blind' }
  ]);
  
  // Simular actualización de datos
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular pequeñas variaciones en los sensores
      setTemperature(prev => +(prev + (Math.random() * 0.3 - 0.15)).toFixed(1));
      setHumidity(prev => Math.min(100, Math.max(30, Math.floor(prev + (Math.random() * 2 - 1)))));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const navigateToControl = (deviceId: number): void => {
    navigation.navigate('Control', { deviceId });
  };
  
  const navigateToSettings = (): void => {
    navigation.navigate('Settings');
  };
  
  const getWeatherColor = (): string => {
    if (temperature < 18) return '#C8E6FF'; // Frío
    if (temperature > 25) return '#FFD6C8'; // Caliente
    return '#C8FFD4'; // Templado
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.subGreeting}>Bienvenido a tu Hogar Inteligente</Text>
        </View>
        <TouchableOpacity onPress={navigateToSettings}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>U</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        {/* Climate Summary Card */}
        <View style={[styles.climateCard, { backgroundColor: getWeatherColor() }]}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureValue}>{temperature}°C</Text>
            <Text style={styles.humidityValue}>Humedad: {humidity}%</Text>
          </View>
          <View style={styles.weatherIconContainer}>
            <Text style={styles.weatherIcon}>
              {temperature > 25 ? '☀️' : temperature < 18 ? '❄️' : '🌤️'}
            </Text>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🪟</Text>
              </View>
              <Text style={styles.actionText}>Persianas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🌡️</Text>
              </View>
              <Text style={styles.actionText}>Temperatura</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>⏱️</Text>
              </View>
              <Text style={styles.actionText}>Programar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>📊</Text>
              </View>
              <Text style={styles.actionText}>Estadísticas</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Devices Section */}
        <View style={styles.devicesContainer}>
          <Text style={styles.sectionTitle}>Mis Persianas</Text>
          
          {devices.map(device => (
            <TouchableOpacity 
              key={device.id} 
              style={styles.deviceCard}
              onPress={() => navigateToControl(device.id)}
            >
              <View style={styles.deviceInfo}>
                <View style={styles.deviceIconContainer}>
                  <Text style={styles.deviceIcon}>🪟</Text>
                </View>
                <View>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Text style={styles.deviceStatus}>{device.status}</Text>
                </View>
              </View>
              <View style={styles.deviceAction}>
                <Text style={styles.deviceActionText}>Controlar</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Add Device Button */}
        <TouchableOpacity style={styles.addDeviceButton}>
          <Text style={styles.addDeviceText}>+ Añadir Persiana</Text>
        </TouchableOpacity>
        
        {/* Spacer for bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.azulClaro,
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: colors.azulOscuro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: colors.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  climateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperatureValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  humidityValue: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  weatherIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 30,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: '22%',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 12,
    color: colors.azulMedio,
  },
  devicesContainer: {
    marginBottom: 20,
  },
  deviceCard: {
    backgroundColor: colors.blanco,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 2,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.azulPastel,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deviceIcon: {
    fontSize: 20,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deviceStatus: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  deviceAction: {
    backgroundColor: colors.azulPastel,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  deviceActionText: {
    color: colors.azulOscuro,
    fontSize: 12,
    fontWeight: '500',
  },
  addDeviceButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.azulMedio,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  addDeviceText: {
    color: colors.azulMedio,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;