import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
  route?: any;
};

type Alarm = {
  id: string;
  name: string;
  time: { hour: number; minute: number };
  isPM: boolean;
  schedule: string;
  location: string;
  days?: { [key: string]: boolean } | null;
  isActive: boolean;
};

const ScheduleScreen: React.FC<Props> = ({ navigation, route }) => {
  // Estado para almacenar todas las alarmas
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  
  // Memoizar la función para mejorar el rendimiento
  const formatTime = useCallback((hour: number, minute: number, isPM: boolean): string => {
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
    return `${displayHour}:${minuteStr} ${isPM ? 'PM' : 'AM'}`;
  }, []);
  
  const formatSchedule = useCallback((schedule: string, days?: { [key: string]: boolean } | null): string => {
    if (schedule === 'Una vez') return 'Una vez';
    if (schedule === 'Diario') return 'Todos los días';
    if (schedule === 'Días laborables') return 'Lun - Vie';
    
    if (schedule === 'Personalizado' && days) {
      const selectedDays = Object.entries(days)
        .filter(([_, selected]) => selected)
        .map(([day]) => day.charAt(0).toUpperCase())
        .join(',');
      return selectedDays.length > 0 ? selectedDays : 'Personalizado';
    }
    
    return schedule;
  }, []);

  // Usar useFocusEffect para cargar/actualizar las alarmas cuando la pantalla recibe el foco
  useFocusEffect(
    useCallback(() => {
      // Verificar si hay una nueva alarma o una alarma actualizada desde la pantalla de edición
      if (route?.params?.savedAlarm) {
        const newAlarm = {
          ...route.params.savedAlarm,
          isActive: route.params.savedAlarm.isActive !== undefined ? 
            route.params.savedAlarm.isActive : true
        };
        
        // Actualizar el estado de las alarmas
        setAlarms(currentAlarms => {
          // Verificar si la alarma ya existe
          const alarmIndex = currentAlarms.findIndex(alarm => alarm.id === newAlarm.id);
          
          if (alarmIndex >= 0) {
            // Actualizar alarma existente
            const updatedAlarms = [...currentAlarms];
            updatedAlarms[alarmIndex] = newAlarm;
            return updatedAlarms;
          } else {
            // Agregar nueva alarma
            return [...currentAlarms, newAlarm];
          }
        });
        
        // Limpiar los parámetros de ruta para evitar problemas en futuras navegaciones
        navigation.setParams({ savedAlarm: undefined });
      }
    }, [route?.params?.savedAlarm])
  );

  // Función para eliminar una alarma
  const deleteAlarm = useCallback((id: string) => {
    Alert.alert(
      "Eliminar Alarma",
      "¿Estás seguro que deseas eliminar esta alarma?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            setAlarms(currentAlarms => currentAlarms.filter(alarm => alarm.id !== id));
          },
          style: "destructive"
        }
      ]
    );
  }, []);

  // Función para cambiar el estado activo/inactivo de una alarma
  const toggleAlarmActive = useCallback((id: string) => {
    setAlarms(currentAlarms => 
      currentAlarms.map(alarm => 
        alarm.id === id 
          ? { ...alarm, isActive: !alarm.isActive } 
          : alarm
      )
    );
  }, []);

  // Ordenar alarmas: primero las activas, luego por hora
  const sortedAlarms = [...alarms].sort((a, b) => {
    // Primero ordenar por estado activo/inactivo
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    
    // Luego ordenar por hora
    const timeA = a.time.hour * 60 + a.time.minute + (a.isPM ? 12 * 60 : 0);
    const timeB = b.time.hour * 60 + b.time.minute + (b.isPM ? 12 * 60 : 0);
    return timeA - timeB;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.azulOscuro} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Programación</Text>
      </View>
      
      {/* Contenido principal */}
      <ScrollView style={styles.content}>
        <View style={styles.alarmListContainer}>
          {sortedAlarms.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No hay alarmas programadas</Text>
              <Text style={styles.emptyStateSubtext}>
                Toca el botón "+" para agregar una nueva alarma
              </Text>
            </View>
          ) : (
            sortedAlarms.map((alarm) => (
              <View key={alarm.id} style={styles.alarmItem}>
                <TouchableOpacity
                  style={styles.alarmItemContent}
                  onPress={() => navigation.navigate('Alarm', { 
                    editAlarm: alarm,
                    alarm: alarm
                  })}
                  activeOpacity={0.7}
                >
                  <View style={styles.alarmMainInfo}>
                    <Text style={styles.alarmTimeText}>
                      {formatTime(alarm.time.hour, alarm.time.minute, alarm.isPM)}
                    </Text>
                    <Text style={styles.alarmNameText}>{alarm.name}</Text>
                  </View>
                  
                  <View style={styles.alarmSecondaryInfo}>
                    <Text style={styles.alarmScheduleText}>
                      {formatSchedule(alarm.schedule, alarm.days)}
                    </Text>
                    <Text style={styles.alarmLocationText}>{alarm.location}</Text>
                  </View>
                  
                  <View style={styles.alarmActions}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteAlarm(alarm.id)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[
                        styles.toggleButton,
                        alarm.isActive ? styles.activeToggle : styles.inactiveToggle
                      ]}
                      onPress={() => toggleAlarmActive(alarm.id)}
                    >
                      <View style={[
                        styles.toggleIndicator,
                        alarm.isActive ? styles.activeIndicator : styles.inactiveIndicator
                      ]} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      
      {/* Botón para agregar nueva alarma */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Alarm')}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
      {/* Footer de navegación */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.activeFooterButton]} 
          activeOpacity={0.7}
        >
          <Text style={[styles.footerButtonText, styles.activeFooterText]}>Programar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Room')}
          activeOpacity={0.7}
        >
          <Text style={styles.footerButtonText}>Habitación</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}
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
    backgroundColor: colors.azulOscuro,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blanco,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  alarmListContainer: {
    marginTop: 10,
    marginBottom: 80, // Espacio para el botón flotante
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  alarmItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  alarmItemContent: {
    padding: 15,
  },
  alarmMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alarmTimeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginRight: 15,
  },
  alarmNameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  alarmSecondaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  alarmScheduleText: {
    fontSize: 14,
    color: '#555',
  },
  alarmLocationText: {
    fontSize: 14,
    color: '#555',
  },
  alarmActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  toggleButton: {
    width: 50,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 2,
  },
  activeToggle: {
    backgroundColor: colors.azulClaro,
  },
  inactiveToggle: {
    backgroundColor: '#ddd',
  },
  toggleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  activeIndicator: {
    backgroundColor: colors.blanco,
    alignSelf: 'flex-end',
  },
  inactiveIndicator: {
    backgroundColor: '#999',
    alignSelf: 'flex-start',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.azulClaro,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 32,
    color: colors.blanco,
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
    paddingVertical: 5,
  },
  activeFooterButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.azulClaro,
  },
  footerButtonText: {
    color: '#666',
    fontSize: 14,
  },
  activeFooterText: {
    fontWeight: 'bold',
    color: colors.azulClaro,
  }
});

export default ScheduleScreen;