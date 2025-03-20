import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp } from '@react-navigation/native';


type Props = {
  navigation: NavigationProp<any>;
};

// Tipo para cada persiana
type Blind = {
  id: string;
  name: string;
  isOpen: boolean;
  location: string;
  temperature: number;
  humidity: number;
  image: any; // Para almacenar la referencia a la imagen
};

const RoomScreen: React.FC<Props> = ({ navigation }) => {
  // Lista de persianas disponibles con datos individuales de temperatura y humedad
  const [blinds, setBlinds] = useState<Blind[]>([
    { 
      id: '1', 
      name: 'Persiana Dormitorio', 
      isOpen: true, 
      location: 'Dormitorio',
      temperature: 19.7,
      humidity: 63,
      image: require('../assets/persiana-real.jpg')
    },
    { 
      id: '2', 
      name: 'Persiana Sala', 
      isOpen: false, 
      location: 'Sala',
      temperature: 22.5,
      humidity: 58,
      image: require('../assets/persiana-real.jpg')
    },
    { 
      id: '3', 
      name: 'Persiana Cocina', 
      isOpen: false, 
      location: 'Cocina',
      temperature: 23.8,
      humidity: 65,
      image: require('../assets/persiana-real.jpg')
    },
    { 
      id: '4', 
      name: 'Persiana Estudio', 
      isOpen: true, 
      location: 'Estudio',
      temperature: 20.2,
      humidity: 60,
      image: require('../assets/persiana-real.jpg')
    }
  ]);
  
  const [selectedBlind, setSelectedBlind] = useState<Blind | null>(blinds[0]);
  
  // Seleccionar una persiana para mostrar sus detalles
  const selectBlind = (blind: Blind) => {
    setSelectedBlind(blind);
  };
  
  // Cambiar el estado de una persiana
  const toggleBlind = (blindId: string) => {
    setBlinds(blinds.map(blind => 
      blind.id === blindId 
        ? { ...blind, isOpen: !blind.isOpen } 
        : blind
    ));
    
    if (selectedBlind && selectedBlind.id === blindId) {
      setSelectedBlind({ ...selectedBlind, isOpen: !selectedBlind.isOpen });
    }
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
        <Text style={styles.headerText}>Mis Persianas</Text>
        <View style={styles.placeholder}></View>
      </View>
      
      {/* Contenido principal */}
      <ScrollView style={styles.content}>
        {/* Selección de persianas */}
        <Text style={styles.sectionTitle}>Selecciona una persiana</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.blindsSelection}
        >
          {blinds.map((blind) => (
            <TouchableOpacity 
              key={blind.id}
              style={[
                styles.blindCard,
                selectedBlind?.id === blind.id && styles.selectedBlindCard
              ]}
              onPress={() => selectBlind(blind)}
            >
              <Image 
                source={blind.image} 
                style={styles.blindCardImage}
                resizeMode="cover"
              />
              <Text style={styles.blindCardName}>{blind.name}</Text>
              
              {/* Información de clima individual para cada persiana */}
              <View style={styles.blindCardClimateInfo}>
                <View style={styles.blindCardTemperature}>
                  <Text style={styles.blindCardTemperatureValue}>{blind.temperature}°C</Text>
                  <Text style={styles.blindCardClimateLabel}>temperatura</Text>
                </View>
                <View style={styles.blindCardHumidity}>
                  <Text style={styles.blindCardHumidityValue}>{blind.humidity}%</Text>
                  <Text style={styles.blindCardClimateLabel}>humedad</Text>
                </View>
              </View>
              
              <Text style={[
                styles.blindCardStatus,
                blind.isOpen ? styles.blindCardStatusOpen : styles.blindCardStatusClosed
              ]}>
                {blind.isOpen ? 'Abierta' : 'Cerrada'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Visualización de la persiana seleccionada */}
        {selectedBlind && (
          <View style={styles.selectedBlindDetails}>
            <Text style={styles.selectedBlindTitle}>
              {selectedBlind.name} - {selectedBlind.location}
            </Text>
            
            <View style={styles.selectedBlindContent}>
              <Image 
                source={selectedBlind.image} 
                style={styles.selectedBlindImage}
                resizeMode="cover"
              />
              
              <View style={styles.blindControls}>
                <TouchableOpacity style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>▲</Text>
                </TouchableOpacity>
                
                <Text style={styles.blindStatusText}>
                  {selectedBlind.isOpen ? 'Abierta' : 'Cerrada'}
                </Text>
                
                <TouchableOpacity style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Botón para cambiar el estado de la persiana */}
            <TouchableOpacity 
              style={[
                styles.actionButton,
                selectedBlind.isOpen ? styles.closeButton : styles.openButton
              ]}
              onPress={() => toggleBlind(selectedBlind.id)}
            >
              <View style={styles.actionButtonContent}>
                <View style={styles.actionButtonIndicator} />
                <Text style={styles.actionButtonText}>
                  {selectedBlind.isOpen ? 'Cerrar Persiana' : 'Abrir Persiana'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blanco,
    marginBottom: 15,
  },
  blindsSelection: {
    paddingBottom: 15,
  },
  blindCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    width: 180,
    marginRight: 15,
    padding: 12,
    overflow: 'hidden',
  },
  selectedBlindCard: {
    backgroundColor: '#B8C6E2',
    borderWidth: 2,
    borderColor: colors.azulOscuro,
  },
  blindCardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  blindCardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 8,
  },
  blindCardClimateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  blindCardTemperature: {
    backgroundColor: '#C8FFD4',
    padding: 8,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  blindCardHumidity: {
    backgroundColor: '#E6E6BE',
    padding: 8,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  blindCardTemperatureValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  blindCardHumidityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  blindCardClimateLabel: {
    fontSize: 12,
    color: '#555',
  },
  blindCardStatus: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#DDDDDD',
  },
  blindCardStatusOpen: {
    color: '#4CAF50',
  },
  blindCardStatusClosed: {
    color: '#F44336',
  },
  selectedBlindDetails: {
    marginTop: 25,
  },
  selectedBlindTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blanco,
    marginBottom: 15,
  },
  selectedBlindContent: {
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  selectedBlindImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  blindControls: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 120,
  },
  controlButton: {
    backgroundColor: colors.azulOscuro,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    color: colors.blanco,
    fontSize: 24,
    fontWeight: 'bold',
  },
  blindStatusText: {
    color: colors.azulOscuro,
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: '#4CAF50',
  },
  closeButton: {
    backgroundColor: '#F44336',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.blanco,
    marginRight: 8,
  },
  actionButtonText: {
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