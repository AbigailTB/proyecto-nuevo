import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
  route?: any;
};

type ScheduleType = 'Una vez' | 'Diario' | 'Días laborables' | 'Personalizado';
type LocationType = 'Dormitorio' | 'Sala' | 'Cocina' | 'Baño' | 'Otra';

const AlarmScreen: React.FC<Props> = ({ navigation, route }) => {
  const [alarmName, setAlarmName] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<{hour: number, minute: number}>({hour: 7, minute: 0});
  const [isPM, setIsPM] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType>('Una vez');
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('Dormitorio');
  
  // Modals visibility state
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  
  // Custom days selection for "Personalizado" schedule type
  const [selectedDays, setSelectedDays] = useState<{[key: string]: boolean}>({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false
  });

  // Use useFocusEffect to reset form when screen is focused
  useFocusEffect(
    useCallback(() => {
      // Check if we're editing an existing alarm
      if (route?.params?.editAlarm) {
        const { alarm } = route.params;
        setAlarmName(alarm.name || '');
        setSelectedTime(alarm.time || {hour: 7, minute: 0});
        setIsPM(alarm.isPM || false);
        setSelectedSchedule(alarm.schedule || 'Una vez');
        setSelectedLocation(alarm.location || 'Dormitorio');
        setSelectedDays(alarm.days || {
          lunes: false,
          martes: false,
          miercoles: false,
          jueves: false,
          viernes: false,
          sabado: false,
          domingo: false
        });
      }
      
      return () => {
        // Clean up function, optional
      };
    }, [route?.params])
  );

  // Format time for display
  const formatTime = (hour: number, minute: number): string => {
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
    return `${displayHour}:${minuteStr} ${isPM ? 'PM' : 'AM'}`;
  };

  // Handle time period selection (AM/PM)
  const handlePeriodChange = () => {
    setIsPM(!isPM);
    
    // Adjust hour for AM/PM change
    if (!isPM) {
      // Switching to PM
      if (selectedTime.hour < 12) {
        setSelectedTime({...selectedTime, hour: selectedTime.hour + 12});
      }
    } else {
      // Switching to AM
      if (selectedTime.hour >= 12) {
        setSelectedTime({...selectedTime, hour: selectedTime.hour - 12});
      }
    }
  };

  // Save alarm
  const saveAlarm = () => {
    // Check if we have enough data
    if (!alarmName.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa un nombre para la alarma');
      return;
    }
    
    // Here you would usually save to a database or state management
    const alarmData = {
      id: route?.params?.editAlarm?.id || Date.now().toString(),
      name: alarmName,
      time: selectedTime,
      isPM,
      schedule: selectedSchedule,
      location: selectedLocation,
      days: selectedSchedule === 'Personalizado' ? selectedDays : null
    };
    
    // Pass the alarm data back to the previous screen
    navigation.navigate('Schedule', { savedAlarm: alarmData });
  };

  // Time picker component
  const TimePickerModal = () => (
    <Modal
      visible={showTimeModal}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Seleccionar hora</Text>
          
          <View style={styles.timePickerContainer}>
            {/* Hour picker */}
            <View style={styles.timeColumn}>
              <TouchableOpacity 
                style={styles.timeArrow}
                onPress={() => {
                  const newHour = (selectedTime.hour + 1) % 24;
                  setSelectedTime({...selectedTime, hour: newHour});
                  setIsPM(newHour >= 12);
                }}
              >
                <Text style={styles.arrowText}>▲</Text>
              </TouchableOpacity>
              
              <Text style={styles.timeValue}>
              {selectedTime.hour === 0 ? 12 : selectedTime.hour > 12 ? selectedTime.hour - 12 : selectedTime.hour}
              </Text>
              
              <TouchableOpacity 
                style={styles.timeArrow}
                onPress={() => {
                  const newHour = selectedTime.hour === 0 ? 23 : selectedTime.hour - 1;
                  setSelectedTime({...selectedTime, hour: newHour});
                  setIsPM(newHour >= 12);
                }}
              >
                <Text style={styles.arrowText}>▼</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.timeSeparator}>:</Text>
            
            {/* Minute picker */}
            <View style={styles.timeColumn}>
              <TouchableOpacity 
                style={styles.timeArrow}
                onPress={() => {
                  const newMinute = (selectedTime.minute + 1) % 60;
                  setSelectedTime({...selectedTime, minute: newMinute});
                }}
              >
                <Text style={styles.arrowText}>▲</Text>
              </TouchableOpacity>
              
              <Text style={styles.timeValue}>
                {selectedTime.minute < 10 ? `0${selectedTime.minute}` : selectedTime.minute}
              </Text>
              
              <TouchableOpacity 
                style={styles.timeArrow}
                onPress={() => {
                  const newMinute = selectedTime.minute === 0 ? 59 : selectedTime.minute - 1;
                  setSelectedTime({...selectedTime, minute: newMinute});
                }}
              >
                <Text style={styles.arrowText}>▼</Text>
              </TouchableOpacity>
            </View>
            
            {/* AM/PM toggle */}
            <TouchableOpacity
              style={[styles.periodButton, isPM ? styles.activePeriod : {}]}
              onPress={handlePeriodChange}
            >
              <Text style={styles.periodText}>{isPM ? 'PM' : 'AM'}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowTimeModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => setShowTimeModal(false)}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Schedule picker modal
  const SchedulePickerModal = () => {
    const scheduleOptions: ScheduleType[] = ['Una vez', 'Diario', 'Días laborables', 'Personalizado'];
    
    return (
      <Modal
        visible={showScheduleModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccionar horario</Text>
            
            <View style={styles.optionsContainer}>
              {scheduleOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionItem,
                    selectedSchedule === option ? styles.selectedOption : {}
                  ]}
                  onPress={() => setSelectedSchedule(option)}
                >
                  <Text style={selectedSchedule === option ? styles.selectedOptionText : styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {selectedSchedule === 'Personalizado' && (
              <View style={styles.daysContainer}>
                <Text style={styles.daysTitle}>Seleccionar días:</Text>
                <View style={styles.daysSelector}>
                  {Object.keys(selectedDays).map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayButton,
                        selectedDays[day] ? styles.selectedDay : {}
                      ]}
                      onPress={() => setSelectedDays({
                        ...selectedDays,
                        [day]: !selectedDays[day]
                      })}
                    >
                      <Text style={selectedDays[day] ? styles.selectedDayText : styles.dayText}>
                        {day.charAt(0).toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowScheduleModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => setShowScheduleModal(false)}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Location picker modal
  const LocationPickerModal = () => {
    const locationOptions: LocationType[] = ['Dormitorio', 'Sala', 'Cocina', 'Baño', 'Otra'];
    
    return (
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccionar lugar</Text>
            
            <View style={styles.optionsContainer}>
              {locationOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionItem,
                    selectedLocation === option ? styles.selectedOption : {}
                  ]}
                  onPress={() => setSelectedLocation(option)}
                >
                  <Text style={selectedLocation === option ? styles.selectedOptionText : styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
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
        <Text style={styles.headerText}>{route?.params?.editAlarm ? 'Editar alarma' : 'Nueva alarma'}</Text>
        <View style={styles.placeholder}></View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Entrada para nombre de alarma */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre de la alarma</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ej: Despertar para el trabajo"
            value={alarmName}
            onChangeText={setAlarmName}
          />
        </View>
        
        {/* Opciones de alarma */}
        <View style={styles.alarmOptionsContainer}>
          {/* Selector de hora */}
          <TouchableOpacity 
            style={styles.timeSelector}
            onPress={() => setShowTimeModal(true)}
          >
            <Text style={styles.timeText}>
              {formatTime(selectedTime.hour, selectedTime.minute)}
            </Text>
          </TouchableOpacity>
          
          {/* Selector de horario */}
          <View style={styles.timeOptionsContainer}>
            <TouchableOpacity 
              style={[styles.timeOptionButton, !isPM ? styles.activeTimeOption : {}]}
              onPress={() => {
                if (isPM) handlePeriodChange();
              }}
            >
              <View style={[styles.iconContainer, !isPM ? styles.activeIconContainer : {}]}>
                <Text style={styles.icon}>☀️</Text>
              </View>
              <Text style={styles.iconLabel}>AM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.timeOptionButton, isPM ? styles.activeTimeOption : {}]}
              onPress={() => {
                if (!isPM) handlePeriodChange();
              }}
            >
              <View style={[styles.iconContainer, isPM ? styles.activeIconContainer : {}]}>
                <Text style={styles.icon}>🌙</Text>
              </View>
              <Text style={styles.iconLabel}>PM</Text>
            </TouchableOpacity>
          </View>
          
          {/* Opciones de horario */}
          <View style={styles.scheduleContainer}>
            <TouchableOpacity 
              style={styles.scheduleItem}
              onPress={() => setShowScheduleModal(true)}
            >
              <Text style={styles.scheduleLabel}>Horario</Text>
              <View style={styles.scheduleValueContainer}>
                <Text style={styles.scheduleValue}>{selectedSchedule}</Text>
                <Text style={styles.scheduleArrow}>▼</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.scheduleItem}
              onPress={() => setShowLocationModal(true)}
            >
              <Text style={styles.scheduleLabel}>Lugar</Text>
              <View style={styles.scheduleValueContainer}>
                <Text style={styles.scheduleValue}>{selectedLocation}</Text>
                <Text style={styles.scheduleArrow}>▼</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Botones de acción */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={saveAlarm}
          >
            <Text style={styles.actionButtonText}>{route?.params?.editAlarm ? 'Actualizar' : 'Agregar'}</Text>
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
      
      {/* Render modals */}
      <TimePickerModal />
      <SchedulePickerModal />
      <LocationPickerModal />
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
  inputContainer: {
    marginTop: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blanco,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  timeSelector: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.blanco,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
  },
  alarmOptionsContainer: {
    marginTop: 10,
  },
  timeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  timeOptionButton: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  activeTimeOption: {
    transform: [{scale: 1.1}],
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
  activeIconContainer: {
    backgroundColor: colors.azulClaro,
    borderWidth: 2,
    borderColor: colors.blanco,
  },
  icon: {
    fontSize: 40,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blanco,
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
  scheduleValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleValue: {
    fontSize: 16,
    color: colors.azulOscuro,
    marginRight: 10,
  },
  scheduleArrow: {
    fontSize: 16,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.blanco,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 20,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timeColumn: {
    alignItems: 'center',
  },
  timeArrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    color: colors.azulClaro,
  },
  timeValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginVertical: 5,
    width: 60,
    textAlign: 'center',
  },
  timeSeparator: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginHorizontal: 10,
  },
  periodButton: {
    padding: 10,
    marginLeft: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: 60,
    alignItems: 'center',
  },
  activePeriod: {
    backgroundColor: colors.azulClaro,
  },
  periodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: colors.azulClaro,
  },
  confirmButtonText: {
    color: colors.blanco,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionItem: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: colors.azulClaro,
  },
  optionText: {
    fontSize: 16,
    color: colors.azulOscuro,
  },
  selectedOptionText: {
    fontSize: 16,
    color: colors.blanco,
    fontWeight: 'bold',
  },
  daysContainer: {
    width: '100%',
    marginBottom: 15,
  },
  daysTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 10,
  },
  daysSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  selectedDay: {
    backgroundColor: colors.azulClaro,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  selectedDayText: {
    color: colors.blanco,
  }
});

export default AlarmScreen;