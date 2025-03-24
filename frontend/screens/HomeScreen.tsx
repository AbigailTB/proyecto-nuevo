import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
<<<<<<< HEAD
=======
=======
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  Dimensions,
  StatusBar,
  Modal,
  TextInput,
<<<<<<< HEAD
  Alert
=======
<<<<<<< HEAD
  Alert
=======
  Alert,
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
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
<<<<<<< HEAD
  negro: '#000000'
=======
<<<<<<< HEAD
  negro: '#000000'
=======
  negro: '#000000',
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
};

type RootStackParamList = {
  Home: undefined;
  Control: { deviceId: number };
  Settings: undefined;
  Products: undefined;
  Schedule: undefined;
  Room: undefined;
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    { id: 4, name: 'Persiana Estudio', status: 'Semi-abierta', type: 'blind' }
  ]);
  
  // Estados para el formulario de añadir persiana
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newBlindName, setNewBlindName] = useState<string>('');
  const [newBlindStatus, setNewBlindStatus] = useState<string>('Cerrada');
  
  // Estado para mostrar confirmación de eliminación
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [deviceToDelete, setDeviceToDelete] = useState<number | null>(null);
  
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
  
<<<<<<< HEAD
=======
=======
    { id: 4, name: 'Persiana Estudio', status: 'Semi-abierta', type: 'blind' },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newBlindName, setNewBlindName] = useState<string>('');
  const [newBlindStatus, setNewBlindStatus] = useState<string>('Cerrada');
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [deviceToDelete, setDeviceToDelete] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => +(prev + (Math.random() * 0.3 - 0.15)).toFixed(1));
      setHumidity(prev => Math.min(100, Math.max(30, Math.floor(prev + (Math.random() * 2 - 1)))));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const navigateToControl = (deviceId: number): void => {
    navigation.navigate('Control', { deviceId });
  };

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  const navigateToSettings = (): void => {
    navigation.navigate('Settings');
  };

  const navigateToProducts = (): void => {
    navigation.navigate('Products');
  };

  const navigateToSchedule = (): void => {
    navigation.navigate('Schedule');
  };

  const navigateToRoom = (): void => {
    navigation.navigate('Room');
  };
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  
  const getWeatherColor = (): string => {
    if (temperature < 18) return '#C8E6FF'; // Frío
    if (temperature > 25) return '#FFD6C8'; // Caliente
    return '#C8FFD4'; // Templado
  };

  // Función para añadir una nueva persiana
<<<<<<< HEAD
=======
=======

  const getWeatherColor = (): string => {
    if (temperature < 18) return '#C8E6FF';
    if (temperature > 25) return '#FFD6C8';
    return '#C8FFD4';
  };

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  const addNewBlind = (): void => {
    if (newBlindName.trim() === '') {
      Alert.alert('Error', 'Por favor, introduce un nombre para la persiana');
      return;
    }
<<<<<<< HEAD
    
    // Crear nueva persiana con ID único
=======
<<<<<<< HEAD
    
    // Crear nueva persiana con ID único
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    const newId = Math.max(...devices.map(d => d.id), 0) + 1;
    const newBlind: Device = {
      id: newId,
      name: newBlindName,
      status: newBlindStatus,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
      type: 'blind'
    };
    
    // Añadir a la lista de dispositivos
    setDevices([...devices, newBlind]);
    
    // Reiniciar el formulario y cerrar el modal
<<<<<<< HEAD
=======
=======
      type: 'blind',
    };

    setDevices([...devices, newBlind]);
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    setNewBlindName('');
    setNewBlindStatus('Cerrada');
    setModalVisible(false);
  };
<<<<<<< HEAD
  
  // Función para mostrar el modal de confirmación de eliminación
=======
<<<<<<< HEAD
  
  // Función para mostrar el modal de confirmación de eliminación
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  const promptDeleteDevice = (deviceId: number): void => {
    setDeviceToDelete(deviceId);
    setDeleteModalVisible(true);
  };
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  
  // Función para eliminar un dispositivo
  const deleteDevice = (): void => {
    if (deviceToDelete === null) return;
    
    // Filtrar el dispositivo del array
    const updatedDevices = devices.filter(device => device.id !== deviceToDelete);
    setDevices(updatedDevices);
    
    // Cerrar el modal y resetear el ID del dispositivo a eliminar
<<<<<<< HEAD
=======
=======

  const deleteDevice = (): void => {
    if (deviceToDelete === null) return;

    const updatedDevices = devices.filter(device => device.id !== deviceToDelete);
    setDevices(updatedDevices);
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    setDeleteModalVisible(false);
    setDeviceToDelete(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />
<<<<<<< HEAD
      
=======
<<<<<<< HEAD
      
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
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
<<<<<<< HEAD
      
      <ScrollView 
        style={styles.scrollView} 
=======
<<<<<<< HEAD
      
      <ScrollView 
        style={styles.scrollView} 
=======

      <ScrollView
        style={styles.scrollView}
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
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
<<<<<<< HEAD
        
=======
<<<<<<< HEAD
        
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActions}>
<<<<<<< HEAD
            <TouchableOpacity 
=======
<<<<<<< HEAD
            <TouchableOpacity 
=======
            <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
              style={styles.quickActionButton}
              onPress={navigateToRoom}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🪟</Text>
              </View>
              <Text style={styles.actionText}>Persianas</Text>
            </TouchableOpacity>
<<<<<<< HEAD
            
=======
<<<<<<< HEAD
            
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🌡️</Text>
              </View>
              <Text style={styles.actionText}>Temperatura</Text>
            </TouchableOpacity>
<<<<<<< HEAD
            
            <TouchableOpacity 
=======
<<<<<<< HEAD
            
            <TouchableOpacity 
=======

            <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
              style={styles.quickActionButton}
              onPress={navigateToSchedule}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>⏱️</Text>
              </View>
              <Text style={styles.actionText}>Programar</Text>
            </TouchableOpacity>
<<<<<<< HEAD
            
=======
<<<<<<< HEAD
            
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>📊</Text>
              </View>
              <Text style={styles.actionText}>Estadísticas</Text>
            </TouchableOpacity>
          </View>
        </View>

<<<<<<< HEAD
        <TouchableOpacity 
=======
<<<<<<< HEAD
        <TouchableOpacity 
=======
        <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
          style={styles.quickActionButton}
          onPress={navigateToProducts}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>🛒</Text>
          </View>
          <Text style={styles.actionText}>Productos</Text>
        </TouchableOpacity>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
        
        {/* Devices Section */}
        <View style={styles.devicesContainer}>
          <Text style={styles.sectionTitle}>Mis Persianas</Text>
          
          {devices.map(device => (
            <View key={device.id} style={styles.deviceCardContainer}>
              <TouchableOpacity 
<<<<<<< HEAD
=======
=======

        {/* Devices Section */}
        <View style={styles.devicesContainer}>
          <Text style={styles.sectionTitle}>Mis Persianas</Text>

          {devices.map(device => (
            <View key={device.id} style={styles.deviceCardContainer}>
              <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
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
<<<<<<< HEAD
                
=======
<<<<<<< HEAD
                
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                <View style={styles.deviceActions}>
                  <View style={styles.deviceAction}>
                    <Text style={styles.deviceActionText}>Controlar</Text>
                  </View>
<<<<<<< HEAD
                  
                  {/* Botón de eliminar rediseñado */}
                  <TouchableOpacity 
=======
<<<<<<< HEAD
                  
                  {/* Botón de eliminar rediseñado */}
                  <TouchableOpacity 
=======

                  <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                    style={styles.menuButton}
                    onPress={() => promptDeleteDevice(device.id)}
                  >
                    <Text style={styles.menuButtonText}>⋮</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
<<<<<<< HEAD
        
        {/* Add Device Button */}
        <TouchableOpacity 
=======
<<<<<<< HEAD
        
        {/* Add Device Button */}
        <TouchableOpacity 
=======

        {/* Add Device Button */}
        <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
          style={styles.addDeviceButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addDeviceText}>+ Añadir Persiana</Text>
        </TouchableOpacity>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
        
        {/* Spacer for bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
      
<<<<<<< HEAD
=======
=======

        {/* Spacer for bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
      {/* Modal para añadir nueva persiana */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir Nueva Persiana</Text>
<<<<<<< HEAD
            
=======
<<<<<<< HEAD
            
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre de la persiana</Text>
              <TextInput
                style={styles.textInput}
                value={newBlindName}
                onChangeText={setNewBlindName}
                placeholder="Ej: Persiana Baño"
                placeholderTextColor="#999"
              />
            </View>
<<<<<<< HEAD
            
=======
<<<<<<< HEAD
            
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Estado inicial</Text>
              <View style={styles.statusButtons}>
                {['Cerrada', 'Abierta', 'Semi-abierta'].map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusButton,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                      newBlindStatus === status && styles.statusButtonSelected
                    ]}
                    onPress={() => setNewBlindStatus(status)}
                  >
                    <Text 
                      style={[
                        styles.statusButtonText,
                        newBlindStatus === status && styles.statusButtonTextSelected
<<<<<<< HEAD
=======
=======
                      newBlindStatus === status && styles.statusButtonSelected,
                    ]}
                    onPress={() => setNewBlindStatus(status)}
                  >
                    <Text
                      style={[
                        styles.statusButtonText,
                        newBlindStatus === status && styles.statusButtonTextSelected,
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
<<<<<<< HEAD
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
=======
<<<<<<< HEAD
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
=======

            <View style={styles.modalActions}>
              <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
<<<<<<< HEAD
              
              <TouchableOpacity 
=======
<<<<<<< HEAD
              
              <TouchableOpacity 
=======

              <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={addNewBlind}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
<<<<<<< HEAD
      
=======
<<<<<<< HEAD
      
=======

>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
      {/* Modal de confirmación para eliminar */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eliminar Persiana</Text>
            <Text style={styles.deleteConfirmationText}>
              ¿Estás seguro de que deseas eliminar esta persiana?
            </Text>
<<<<<<< HEAD
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
=======
<<<<<<< HEAD
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
=======

            <View style={styles.modalActions}>
              <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
<<<<<<< HEAD
              
              <TouchableOpacity 
=======
<<<<<<< HEAD
              
              <TouchableOpacity 
=======

              <TouchableOpacity
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
                style={[styles.modalButton, styles.modalButtonDelete]}
                onPress={deleteDevice}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  deviceCardContainer: {
    marginBottom: 10,
  },
  deviceCard: {
    backgroundColor: colors.blanco,
    borderRadius: 12,
    padding: 15,
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
  deviceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceAction: {
    backgroundColor: colors.azulPastel,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  deviceActionText: {
    color: colors.azulOscuro,
    fontSize: 12,
    fontWeight: '500',
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 20,
    color: colors.azulMedio,
    fontWeight: 'bold',
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
<<<<<<< HEAD
  
  // Estilos para el modal de añadir persiana
=======
<<<<<<< HEAD
  
  // Estilos para el modal de añadir persiana
=======
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.blanco,
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.azulMedio,
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statusButtonSelected: {
    backgroundColor: colors.azulPastel,
    borderColor: colors.azulPastel,
  },
  statusButtonText: {
    color: '#666',
    fontSize: 14,
  },
  statusButtonTextSelected: {
    color: colors.blanco,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  modalButtonConfirm: {
    backgroundColor: colors.azulClaro,
  },
  modalButtonDelete: {
    backgroundColor: '#FF6B6B',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  modalButtonTextConfirm: {
    color: colors.blanco,
  },
  deleteConfirmationText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
<<<<<<< HEAD
  }
=======
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
});

export default HomeScreen;