import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Alert
} from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useMQTT } from '../database/context/MQTTContext';
import client from '../database/api/client';
import { controlStyles, colors } from '../styles';

const { width, height } = Dimensions.get('window');

// Definir tipos de navegación consistentes con App.tsx
type RootStackParamList = {
  Control: { deviceId?: number };
  Schedule: undefined;
  Automation: undefined;
  History: undefined;
};

// Interfaz para datos de sensores con tipado flexible
interface SensorData {
  [key: string]: number | string | null;
  temperatura?: number | string | null;
  luz?: number | string | null;
  humedad?: number | string | null;
  motor?: string;
  velocidad?: number | string;
}

// Interfaz para dispositivos IoT
interface IoTDevice {
  _id: string;
  nombre: string;
  modelo: string;
  tipo: 'Controlador' | 'Sensor' | 'Actuador';
  estado?: 'activo' | 'inactivo';
  ultimaConexion?: Date;
}

// Definir props con tipos más específicos
type Props = {
  navigation: NavigationProp<RootStackParamList, 'Control'>;
  route: RouteProp<RootStackParamList, 'Control'>;
};

const ControlScreen: React.FC<Props> = ({ navigation, route }) => {
  // Estados para control y sensores
  const [device, setDevice] = useState<IoTDevice | null>(null);
  const { isConnected, connectionStatus, publish, subscribe } = useMQTT();
  const [velocidadMotor, setVelocidadMotor] = useState<number>(0);
  const [motorEncendido, setMotorEncendido] = useState<boolean>(false);
  const [sensorData, setSensorData] = useState<SensorData>({});
  const animatedValue = useState(new Animated.Value(0))[0];

  // Función para parsear valores de sensores de forma segura
  const parseNumericValue = useCallback((value: any, defaultValue: number | null = null): number | null => {
    if (value === null || value === undefined) return defaultValue;
    
    // Si es un número válido, devolverlo
    if (typeof value === 'number' && !isNaN(value)) return value;
    
    // Si es un string numérico, convertirlo
    if (typeof value === 'string') {
      const parsedNum = Number(value);
      return !isNaN(parsedNum) ? parsedNum : defaultValue;
    }
    
    return defaultValue;
  }, []);

  // Cargar detalles del dispositivo
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const deviceId = route.params?.deviceId;
        if (!deviceId) {
          Alert.alert('Error', 'No se proporcionó un ID de dispositivo');
          return;
        }

        // Usa el ID numérico para la consulta
        const deviceData = await client.get(`/devices/${deviceId}`);
        setDevice(deviceData);
      } catch (error) {
        console.error('Error al cargar detalles del dispositivo:', error);
        Alert.alert('Error', 'No se pudieron cargar los detalles del dispositivo');
      }
    };

    fetchDeviceDetails();
  }, [route.params?.deviceId]);

  // Suscripción a datos de sensores
  useEffect(() => {
    if (isConnected && device) {
      const topicSensores = `sensores/${device.modelo}/datos`;
      
      const handleSensorData = (data: SensorData | string) => {
        try {
          // Parsear datos si es un string
          const sensorPayload = typeof data === 'string' 
            ? JSON.parse(data) 
            : data;

          // Actualizar estado de sensores con parsing seguro
          setSensorData({
            temperatura: parseNumericValue(sensorPayload.temperatura),
            luz: parseNumericValue(sensorPayload.luz),
            humedad: parseNumericValue(sensorPayload.humedad),
            motor: sensorPayload.motor,
            velocidad: parseNumericValue(sensorPayload.velocidad)
          });

          // Actualizar estado del motor
          setMotorEncendido(sensorPayload.motor === 'ON');
          
          // Actualizar velocidad del motor
          const velocidad = parseNumericValue(sensorPayload.velocidad, 0);
          if (velocidad !== null) {
            setVelocidadMotor(velocidad);
          }
        } catch (error) {
          console.error('Error procesando datos de sensores:', error);
        }
      };

      // Suscribirse al topic de sensores
      subscribe(topicSensores, handleSensorData);

      // Cleanup de suscripción
      return () => {
        // Implementar método de desuscripción si está disponible
        if (typeof unsubscribe === 'function') {
          unsubscribe(topicSensores);
        }
      };
    }
  }, [isConnected, device, subscribe]);

  // Animación de altura de la persiana
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: velocidadMotor / 255,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [velocidadMotor, animatedValue]);

  const motorHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.28, height * 0.05],
    extrapolate: 'clamp'
  });

  // Enviar comando de control
  const enviarComando = useCallback((comando: string, velocidad?: number) => {
    if (!isConnected || !device) {
      Alert.alert('Error', 'No hay conexión o dispositivo seleccionado');
      return;
    }

    const topicControl = `motor/${device.modelo}/control`;
    const payload = {
      command: comando,
      ...(velocidad !== undefined && { velocidad })
    };

    try {
      publish(topicControl, JSON.stringify(payload));
      console.log(`Comando enviado a ${topicControl}:`, payload);
    } catch (error) {
      console.error('Error enviando comando:', error);
      Alert.alert('Error', 'No se pudo enviar el comando');
    }
  }, [isConnected, device, publish]);

  // Alternar estado del motor
  const toggleMotor = () => {
    const nuevoEstado = !motorEncendido;
    const velocidad = nuevoEstado ? 255 : 0;
    
    enviarComando(nuevoEstado ? 'ON' : 'OFF', velocidad);
    setMotorEncendido(nuevoEstado);
    setVelocidadMotor(velocidad);
  };

  // Color del sensor basado en temperatura
  const getTemperatureColor = () => {
    const temp = sensorData.temperatura;
    if (temp === null || temp === undefined) return colors.sensorTemp;
    
    const temperature = Number(temp);
    if (temperature < 18) return '#C8E6FF'; // Frío
    if (temperature > 25) return '#FFD6C8'; // Caliente
    return colors.sensorTemp; // Templado
  };

  // Renderizado del componente
  if (!device) {
    return (
      <SafeAreaView style={controlStyles.container}>
        <Text>Cargando dispositivo...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={controlStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.azulOscuro} />

      {/* Header */}
      <View style={controlStyles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={{ position: 'absolute', left: 20 }}
        >
          <Text style={{ color: colors.blanco, fontSize: 20 }}>←</Text>
        </TouchableOpacity>
        <Text style={controlStyles.headerText}>{device.nombre}</Text>
      </View>

      {/* Visualización del motor (simulada como persiana) */}
      <View style={controlStyles.persianaContainer}>
        <View style={controlStyles.window}>
          <Animated.View style={[controlStyles.persiana, { height: motorHeight }]} />
        </View>
      </View>

      {/* Panel de sensores */}
      <View style={controlStyles.sensorsPanel}>
        <View style={[controlStyles.sensorCard, { backgroundColor: getTemperatureColor() }]}>
          <Text style={controlStyles.sensorLabel}>Temperatura</Text>
          <View style={controlStyles.sensorValueContainer}>
            <Text style={controlStyles.sensorValue}>
              {sensorData.temperatura !== null 
                ? `${Number(sensorData.temperatura).toFixed(1)}°C` 
                : 'N/A'}
            </Text>
            <Text style={controlStyles.sensorIcon}>🌡️</Text>
          </View>
        </View>

        <View style={[controlStyles.sensorCard, { backgroundColor: colors.sensorLuz }]}>
          <Text style={controlStyles.sensorLabel}>Luminosidad</Text>
          <View style={controlStyles.sensorValueContainer}>
            <Text style={controlStyles.sensorValue}>
              {sensorData.luz !== null 
                ? `${Number(sensorData.luz).toFixed(1)}%` 
                : 'N/A'}
            </Text>
            <Text style={controlStyles.sensorIcon}>☀️</Text>
          </View>
        </View>

        <View style={[controlStyles.sensorCard, { backgroundColor: colors.sensorHumedad }]}>
          <Text style={controlStyles.sensorLabel}>Humedad</Text>
          <View style={controlStyles.sensorValueContainer}>
            <Text style={controlStyles.sensorValue}>
              {sensorData.humedad !== null 
                ? `${Number(sensorData.humedad).toFixed(1)}%` 
                : 'N/A'}
            </Text>
            <Text style={controlStyles.sensorIcon}>💧</Text>
          </View>
        </View>
      </View>

      {/* Control de la velocidad del motor */}
      <View style={controlStyles.sliderContainer}>
        <Text style={controlStyles.sliderLabel}>Velocidad del Motor: {velocidadMotor}</Text>
        <Slider
          style={controlStyles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={velocidadMotor}
          onValueChange={(value: number) => {
            setVelocidadMotor(value);
            enviarComando(value > 0 ? 'ON' : 'OFF', value);
          }}
          minimumTrackTintColor={colors.azulMedio}
          maximumTrackTintColor={colors.azulPastel}
          thumbTintColor={colors.azulClaro}
          disabled={!isConnected}
        />
      </View>

      {/* Botón de control */}
      <TouchableOpacity
        style={[controlStyles.button, !isConnected && { backgroundColor: '#888' }]}
        onPress={toggleMotor}
        disabled={!isConnected}
      >
        <Text style={controlStyles.buttonText}>
          {motorEncendido ? 'Apagar Motor' : 'Encender Motor'}
        </Text>
      </TouchableOpacity>

      {/* Estado */}
      <View style={controlStyles.statusContainer}>
        <View
          style={[
            controlStyles.statusIndicator,
            { backgroundColor: isConnected ? (motorEncendido ? '#4CAF50' : '#F44336') : '#888' },
          ]}
        />
        <Text style={controlStyles.statusText}>
          Estado: <Text style={controlStyles.statusValue}>{motorEncendido ? 'Encendido' : 'Apagado'}</Text>
        </Text>
        <Text style={controlStyles.statusText}>
          Conexión: <Text style={controlStyles.statusValue}>
            {connectionStatus || (isConnected ? 'Conectado' : 'Desconectado')}
          </Text>
        </Text>
      </View>

      {/* Footer/Navigation */}
      <View style={controlStyles.footer}>
        <TouchableOpacity 
          style={controlStyles.footerButton}
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={controlStyles.footerButtonText}>Programar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={controlStyles.footerButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={controlStyles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={controlStyles.footerButton}
          onPress={() => navigation.navigate('Room')}
        >
          <Text style={controlStyles.footerButtonText}>Habitación</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ControlScreen;