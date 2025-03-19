import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const ScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
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
        <Text style={styles.headerText}>Programar</Text>
        <View style={styles.placeholder}></View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Selector de días */}
        <View style={styles.daysContainer}>
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.selectedDayButton
              ]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[
                styles.dayButtonText,
                selectedDays.includes(day) && styles.selectedDayButtonText
              ]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Opciones de horario */}
        <View style={styles.scheduleOptionContainer}>
          <View style={styles.optionIconContainer}>
            <Text style={styles.optionIcon}>☀️</Text>
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>DÍA - HORA</Text>
            <Text style={styles.optionDescription}>
              • 100% apertura{'\n'}
              • activado{'\n'}
              • sin repetición
            </Text>
          </View>
          <Text style={styles.timeText}>06:00 am</Text>
        </View>
        
        <View style={styles.scheduleOptionContainer}>
          <View style={styles.optionIconContainer}>
            <Text style={styles.optionIcon}>🌙</Text>
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>NOCHE - HORA</Text>
            <Text style={styles.optionDescription}>
              • 0% apertura{'\n'}
              • desactivado{'\n'}
              • sin repetición
            </Text>
          </View>
          <Text style={styles.timeText}>20:00 pm</Text>
        </View>
        
        {/* Botón para añadir nueva programación */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
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
          style={[styles.footerButton, styles.activeFooterButton]} 
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={[styles.footerButtonText, styles.activeFooterButtonText]}>Programar</Text>
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
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayButton: {
    backgroundColor: colors.azulOscuro,
  },
  dayButtonText: {
    color: colors.azulOscuro,
    fontWeight: 'bold',
  },
  selectedDayButtonText: {
    color: colors.blanco,
  },
  scheduleOptionContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD54F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.azulOscuro,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: colors.blanco,
    fontSize: 30,
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

export default ScheduleScreen;