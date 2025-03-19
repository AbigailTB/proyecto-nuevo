import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const RoomScreen: React.FC<Props> = ({ navigation }) => {
  const [temperature, setTemperature] = useState<number>(19.7);
  const [humidity, setHumidity] = useState<number>(63);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const toggleBlind = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.azulOscuro} />
      
      {/* Header con botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Habitación</Text>
        <View style={styles.placeholder}></View>
      </View>
      
      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Información del clima */}
        <View style={styles.climateInfo}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureValue}>{temperature}°C</Text>
            <Text style={styles.temperatureLabel}>temperatura</Text>
          </View>
          
          <View style={styles.humidityContainer}>
            <Text style={styles.humidityValue}>{humidity}%</Text>
            <Text style={styles.humidityLabel}>humedad</Text>
          </View>
        </View>
        
        {/* Visualización de persiana */}
        <View style={styles.blindsContainer}>
          <Text style={styles.blindsLabel}>Persianas</Text>
          <View style={styles.blindsDisplay}>
            <Image 
              source={require('../assets/blind-icon.png')} 
              style={styles.blindsImage}
              resizeMode="contain"
            />
            
            {/* Controles de persiana */}
            <View style={styles.blindsControls}>
              <TouchableOpacity style={styles.controlButton}>
                <Text style={styles.controlButtonText}>▲</Text>
              </TouchableOpacity>
              
              <View style={styles.blindsStatus}>
                <Text style={styles.blindsStatusText}>
                  {isOpen ? 'Abierto' : 'Cerrado'}
                </Text>
              </View>
              
              <TouchableOpacity style={styles.controlButton}>
                <Text style={styles.controlButtonText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Botón principal */}
        <TouchableOpacity 
          style={[
            styles.mainButton,
            isOpen ? styles.closeButton : styles.openButton
          ]}
          onPress={toggleBlind}
        >
          <View style={styles.buttonStatus}>
            <View style={[
              styles.statusIndicator,
              isOpen ? styles.openIndicator : styles.closedIndicator
            ]} />
            <Text style={styles.buttonStatusText}>
              {isOpen ? 'Abierto' : 'Cerrado'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Footer de navegación */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.footerButtonText}>Programar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.activeFooterButton]} 
          onPress={() => navigation.navigate('Room')}
        >
          <Text style={[styles.footerButtonText, styles.activeFooterButtonText]}>Habitación</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.footerButtonText}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8896B3',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.azulOscuro,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: colors.blanco,
    fontSize: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blanco,
  },
  placeholder: {
    width: 20,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  climateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  temperatureContainer: {
    backgroundColor: '#C8FFD4',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  temperatureValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  temperatureLabel: {
    fontSize: 14,
    color: '#555',
  },
  humidityContainer: {
    backgroundColor: '#E6E6BE',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  humidityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  humidityLabel: {
    fontSize: 14,
    color: '#555',
  },
  blindsContainer: {
    marginTop: 20,
  },
  blindsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blanco,
    marginBottom: 10,
  },
  blindsDisplay: {
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blindsImage: {
    width: 100,
    height: 100,
  },
  blindsControls: {
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: colors.azulOscuro,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlButtonText: {
    color: colors.blanco,
    fontSize: 20,
    fontWeight: 'bold',
  },
  blindsStatus: {
    marginVertical: 10,
  },
  blindsStatusText: {
    color: colors.azulOscuro,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#4CAF50',
  },
  closeButton: {
    backgroundColor: '#F44336',
  },
  buttonStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  openIndicator: {
    backgroundColor: colors.blanco,
  },
  closedIndicator: {
    backgroundColor: colors.blanco,
  },
  buttonStatusText: {
    color: colors.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: colors.blanco,
  },
  footerButton: {
    paddingHorizontal: 15,
  },
  footerButtonText: {
    color: colors.azulClaro,
    fontSize: 14,
  },
  activeFooterButton: {
    borderTopWidth: 2,
    borderTopColor: colors.azulClaro,
  },
  activeFooterButtonText: {
    color: colors.azulOscuro,
    fontWeight: 'bold',
  },
});

export default RoomScreen;