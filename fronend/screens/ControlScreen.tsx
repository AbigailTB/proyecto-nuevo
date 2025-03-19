import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationProp } from '@react-navigation/native';

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
  sensorLuz: '#E6E6BE'
};

type Props = {
  navigation: NavigationProp<any>;
  route: any;
};

const ControlScreen: React.FC<Props> = ({ navigation, route }) => {
  const [persianaAbierta, setPersianaAbierta] = useState<boolean>(false);
  const [nivelPersiana, setNivelPersiana] = useState<number>(0); // 0 = cerrada, 100 = abierta
  const [temperatura, setTemperatura] = useState<number>(22.4);
  const [luminosidad, setLuminosidad] = useState<number>(73);
  const animatedValue = useState<Animated.Value>(new Animated.Value(0))[0];
  
  // Simular actualización de sensores
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular pequeñas variaciones en los sensores
      setTemperatura(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setLuminosidad(prev => Math.min(100, Math.max(0, Math.floor(prev + (Math.random() * 3 - 1.5)))));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Actualizar animación cuando cambia el nivel de la persiana
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: nivelPersiana / 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    
    // Actualizar estado abierto/cerrado basado en el nivel
    setPersianaAbierta(nivelPersiana > 0);
  }, [nivelPersiana, animatedValue]);
  
  const persianaHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.28, height * 0.05],
  });
  
  const togglePersiana = (): void => {
    if (persianaAbierta) {
      setNivelPersiana(0);
    } else {
      setNivelPersiana(100);
    }
  };
  
  const getWeatherColor = (): string => {
    if (temperatura < 18) return '#C8E6FF'; // Frío
    if (temperatura > 25) return '#FFD6C8'; // Caliente
    return '#C8FFD4'; // Templado
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.azulOscuro} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Control de Hogar</Text>
      </View>
      
      {/* Visualización de la persiana */}
      <View style={styles.persianaContainer}>
        <View style={styles.window}>
          <Animated.View 
            style={[
              styles.persiana, 
              { height: persianaHeight }
            ]} 
          />
        </View>
      </View>
      
      {/* Panel de sensores */}
      <View style={styles.sensorsPanel}>
        <View style={[styles.sensorCard, { backgroundColor: colors.sensorTemp }]}>
          <Text style={styles.sensorLabel}>Temperatura</Text>
          <View style={styles.sensorValueContainer}>
            <Text style={styles.sensorValue}>{temperatura}°C</Text>
            <Text style={styles.sensorIcon}>🌡️</Text>
          </View>
        </View>
        
        <View style={[styles.sensorCard, { backgroundColor: colors.sensorLuz }]}>
          <Text style={styles.sensorLabel}>Luminosidad</Text>
          <View style={styles.sensorValueContainer}>
            <Text style={styles.sensorValue}>{luminosidad}%</Text>
            <Text style={styles.sensorIcon}>☀️</Text>
          </View>
        </View>
      </View>
      
      {/* Control del nivel de la persiana */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Nivel de apertura: {nivelPersiana}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={nivelPersiana}
          onValueChange={(value: number) => setNivelPersiana(value)}
          minimumTrackTintColor={colors.azulMedio}
          maximumTrackTintColor={colors.azulPastel}
          thumbTintColor={colors.azulClaro}
        />
      </View>
      
      {/* Botón de control */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={togglePersiana}
      >
        <Text style={styles.buttonText}>
          {persianaAbierta ? 'Cerrar Persianas' : 'Abrir Persianas'}
        </Text>
      </TouchableOpacity>
      
      {/* Estado */}
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: persianaAbierta ? '#4CAF50' : '#F44336' }
        ]} />
        <Text style={styles.statusText}>
          Estado: <Text style={styles.statusValue}>{persianaAbierta ? 'Abierta' : 'Cerrada'}</Text>
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
  },
  sensorCard: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
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