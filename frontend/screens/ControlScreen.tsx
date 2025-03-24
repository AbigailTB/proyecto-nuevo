import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationProp } from '@react-navigation/native';
import { useMQTT } from '../database/context/MQTTContext';

const { width, height } = Dimensions.get('window'); 

// Colores basados en la paleta proporcionada
const colors = {
  azulOscuro: '#001B2A',
  azulMedio: '#1B263B',
  azulClaro: '#415A77',
  azulPastel: '#778DA9',
  blanco: '#E0E1DD',
  negro: '#000000',
  sensorTemp: '#C8FFD4',
  sensorLuz: '#E6E6BE',
  sensorHumedad: '#ADD8E6',
};

type Props = {
  navigation: NavigationProp<any>;
  route: any;
};

const ControlScreen: React.FC<Props> = ({ navigation, route }) => {
  const { isConnected, publish, subscribe } = useMQTT();
  const [motorEncendido, setMotorEncendido] = useState<boolean>(false);
  const [velocidadMotor, setVelocidadMotor] = useState<number>(0);
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [luminosidad, setLuminosidad] = useState<number | null>(null);
  const [humedad, setHumedad] = useState<number | null>(null);
  const animatedValue = useState<Animated.Value>(new Animated.Value(0))[0];
<<<<<<< HEAD
  // Añadir estado para el WebSocket
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Conectar al WebSocket del backend
  useEffect(() => {
    const websocket = new WebSocket('ws://192.168.1.72:8081'); // Ajusta la IP si el backend corre en otra máquina
    setWs(websocket);

    websocket.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    websocket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      websocket.close();
    };
  }, []);

  // Simular actualización de sensores
=======

  // Suscribirse al tópico de sensores  
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  useEffect(() => {
    if (isConnected) {
      subscribe('sensores/datos', (message) => {
        try {
          const data = JSON.parse(message);
          setTemperatura(data.temperatura !== -1 ? data.temperatura : null);
          setLuminosidad(data.luz !== undefined ? Math.round((data.luz / 4095) * 100) : null);
          setHumedad(data.humedad !== -1 ? data.humedad : null);
          setMotorEncendido(data.motor === 'ON');
          setVelocidadMotor(data.velocidad || 0);
          console.log('Datos recibidos:', data);
        } catch (error) {
          console.error('Error al parsear el mensaje MQTT:', error);
        }
      });
    }
  }, [isConnected, subscribe]);

  // Actualizar animación cuando cambia la velocidad del motor
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: velocidadMotor / 255,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setMotorEncendido(velocidadMotor > 0);
  }, [velocidadMotor, animatedValue]);

  const motorHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.28, height * 0.05],
  });

<<<<<<< HEAD
  // Función para enviar mensajes MQTT
  const enviarMensajeMQTT = (nivel: number): void => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const payload = nivel === 0 ? 'CERRAR' : nivel === 100 ? 'ABRIR' : `NIVEL_${nivel}`;
      ws.send(JSON.stringify({ topic: 'persianas/comando', payload }));
      console.log(`Mensaje enviado: ${payload}`);
    } else {
      console.warn('WebSocket no está conectado');
    }
  };
  
  const togglePersiana = (): void => {
    if (persianaAbierta) {
      setNivelPersiana(0);
      enviarMensajeMQTT(0); // Enviar mensaje MQTT al cerrar
    } else {
      setNivelPersiana(100);
      enviarMensajeMQTT(100); // Enviar mensaje MQTT al abrir
=======
  // Función para enviar comandos MQTT
  const enviarComandoMQTT = (comando: string, velocidad?: number): void => {
    if (!isConnected) {
      console.warn('MQTT no está conectado');
      return;
    }

    const payload: any = { command: comando };
    if (velocidad !== undefined) {
      payload.velocidad = velocidad;
    }
    const message = JSON.stringify(payload);
    publish('motor/control', message);
    console.log(`Mensaje enviado: ${message}`);
  };

  const toggleMotor = (): void => {
    if (motorEncendido) {
      setVelocidadMotor(0);
      enviarComandoMQTT('OFF');
    } else {
      setVelocidadMotor(255);
      enviarComandoMQTT('ON');
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    }
  };

  const getWeatherColor = (): string => {
    if (!temperatura) return '#C8FFD4';
    if (temperatura < 18) return '#C8E6FF';
    if (temperatura > 25) return '#FFD6C8';
    return '#C8FFD4';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.azulOscuro} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Control del Motor</Text>
      </View>

      {/* Visualización del motor (simulada como persiana) */}
      <View style={styles.persianaContainer}>
        <View style={styles.window}>
          <Animated.View
            style={[styles.persiana, { height: motorHeight }]}
          />
        </View>
      </View>

      {/* Panel de sensores */}
      <View style={styles.sensorsPanel}>
        <View style={[styles.sensorCard, { backgroundColor: colors.sensorTemp }]}>
          <Text style={styles.sensorLabel}>Temperatura</Text>
          <View style={styles.sensorValueContainer}>
            <Text style={styles.sensorValue}>
              {temperatura !== null ? `${temperatura}°C` : 'N/A'}
            </Text>
            <Text style={styles.sensorIcon}>🌡️</Text>
          </View>
        </View>

        <View style={[styles.sensorCard, { backgroundColor: colors.sensorLuz }]}>
          <Text style={styles.sensorLabel}>Luminosidad</Text>
          <View style={styles.sensorValueContainer}>
            <Text style={styles.sensorValue}>
              {luminosidad !== null ? `${luminosidad}%` : 'N/A'}
            </Text>
            <Text style={styles.sensorIcon}>☀️</Text>
          </View>
        </View>

        <View style={[styles.sensorCard, { backgroundColor: colors.sensorHumedad }]}>
          <Text style={styles.sensorLabel}>Humedad</Text>
          <View style={styles.sensorValueContainer}>
            <Text style={styles.sensorValue}>
              {humedad !== null ? `${humedad}%` : 'N/A'}
            </Text>
            <Text style={styles.sensorIcon}>💧</Text>
          </View>
        </View>
      </View>

      {/* Control de la velocidad del motor */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Velocidad del Motor: {velocidadMotor}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
<<<<<<< HEAD
          value={nivelPersiana}
          onValueChange={(value: number) => {
            setNivelPersiana(value);
            enviarMensajeMQTT(value); // Enviar mensaje MQTT al ajustar el nivel
=======
          value={velocidadMotor}
          onValueChange={(value: number) => {
            setVelocidadMotor(value);
            enviarComandoMQTT(value > 0 ? 'ON' : 'OFF', value);
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
          }}
          minimumTrackTintColor={colors.azulMedio}
          maximumTrackTintColor={colors.azulPastel}
          thumbTintColor={colors.azulClaro}
          disabled={!isConnected}
        />
      </View>

      {/* Botón de control */}
      <TouchableOpacity
        style={[styles.button, !isConnected && styles.buttonDisabled]}
        onPress={toggleMotor}
        disabled={!isConnected}
      >
        <Text style={styles.buttonText}>
          {motorEncendido ? 'Apagar Motor' : 'Encender Motor'}
        </Text>
      </TouchableOpacity>

      {/* Estado */}
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: isConnected ? (motorEncendido ? '#4CAF50' : '#F44336') : '#888' },
          ]}
        />
        <Text style={styles.statusText}>
          Estado: <Text style={styles.statusValue}>{motorEncendido ? 'Encendido' : 'Apagado'}</Text>
        </Text>
        <Text style={styles.statusText}>
          MQTT: <Text style={styles.statusValue}>{isConnected ? 'Conectado' : 'Desconectado'}</Text>
        </Text>
      </View>

      {/* Footer/Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Programar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Automatizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    backgroundColor: colors.azulOscuro,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: colors.blanco,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blanco,
  },
  persianaContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  window: {
      width: width * 0.8,
    height: height * 0.28,
    borderWidth: 2,
    borderColor: '#888',
    backgroundColor: '#E1F5FE',
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
  },
  persiana: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#B0BEC5',
    borderBottomWidth: 1,
    borderBottomColor: '#546E7A',
  },
  sensorsPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  sensorCard: {
    width: '31%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  sensorLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  sensorValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sensorValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sensorIcon: {
    fontSize: 20,
  },
  sliderContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    color: colors.azulOscuro,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: colors.azulOscuro,
    marginHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  statusValue: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: colors.blanco,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    paddingHorizontal: 20,
  },
  footerButtonText: {
    color: colors.azulClaro,
    fontSize: 14,
  },
});

export default ControlScreen;