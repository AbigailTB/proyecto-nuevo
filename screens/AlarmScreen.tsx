import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const AlarmScreen: React.FC<Props> = ({ navigation }) => {
  const [alarmName, setAlarmName] = useState<string>('');
  
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
        <Text style={styles.headerText}>Nueva alarma</Text>
        <View style={styles.placeholder}></View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Opciones de alarma */}
        <View style={styles.alarmOptionsContainer}>
          {/* Selector de horario */}
          <View style={styles.timeOptionsContainer}>
            <TouchableOpacity style={styles.timeOptionButton}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>☀️</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeOptionButton}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🌙</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Opciones de horario */}
          <View style={styles.scheduleContainer}>
            <TouchableOpacity style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Horario</Text>
              <Text style={styles.scheduleValue}>▼</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Lugar</Text>
              <Text style={styles.scheduleValue}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Botones de acción */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionButtonText}>Agregar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
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
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Room')}
        >
          <Text style={styles.footerButtonText}>Habitación</Text>
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
  alarmOptionsContainer: {
    marginTop: 20,
  },
  timeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  timeOptionButton: {
    marginHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 40,
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  scheduleLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  scheduleValue: {
    fontSize: 18,
    color: colors.azulOscuro,
  },
  actionButtonsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.azulClaro,
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: colors.azulClaro,
  },
  cancelButtonText: {
    color: colors.azulClaro,
    fontSize: 16,
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
});

export default AlarmScreen;