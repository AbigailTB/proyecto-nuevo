// frontend/database/context/BlindContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Alert } from 'react-native';
import * as db from '../db';
import { AuthContext } from './AuthContext';
import { useMQTT } from './MQTTContext';

export const BlindContext = createContext();

export const BlindProvider = ({ children }) => {
  const [blinds, setBlinds] = useState([]);
  const [selectedBlind, setSelectedBlind] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { userToken } = useContext(AuthContext);
  const { isConnected, subscribe, unsubscribe, publish } = useMQTT();

  // Función para actualizar la UI cuando cambia el estado de una persiana
  // Esta no interactúa con la base de datos ni MQTT, solo actualiza el estado en React
  const updateBlindStateInUI = useCallback((blindId, statusData) => {
    console.log(`Actualizando persiana ${blindId} con datos:`, statusData);
    
    setBlinds(prevBlinds => 
      prevBlinds.map(blind => 
        ((blind._id === blindId || blind.id === blindId) 
          ? { ...blind, ...statusData, ultimaActualizacion: new Date().toISOString() }
          : blind
        )
      )
    );
    
    // Actualizar también la persiana seleccionada si es la misma
    if (selectedBlind && (selectedBlind._id === blindId || selectedBlind.id === blindId)) {
      setSelectedBlind(prev => ({ 
        ...prev, 
        ...statusData, 
        ultimaActualizacion: new Date().toISOString() 
      }));
    }
  }, [selectedBlind]);

  // Cargar persianas cuando hay sesión activa
  useEffect(() => {
    if (userToken) {
      loadBlinds();
    } else {
      // Limpiar datos si no hay sesión
      setBlinds([]);
      setSelectedBlind(null);
      setSchedules([]);
    }
  }, [userToken]);

  // Suscribirse a actualizaciones MQTT de las persianas
  useEffect(() => {
    if (isConnected && blinds.length > 0) {
      // Suscribirse al topic general de persianas
      subscribe('iot/datos', handlePersianaUpdate);
      
      // También podemos suscribirnos a topics individuales por persiana
      blinds.forEach(blind => {
        const id = blind._id || blind.id;
        subscribe(`persiana/${id}/status`, (data) => handlePersianaUpdate(data, id));
      });
    }
    
    return () => {
      if (isConnected) {
        unsubscribe('iot/datos', handlePersianaUpdate);
        blinds.forEach(blind => {
          const id = blind._id || blind.id;
          unsubscribe(`persiana/${id}/status`);
        });
      }
    };
  }, [isConnected, blinds, subscribe, unsubscribe, handlePersianaUpdate]);

  // Manejar actualizaciones de persianas vía MQTT
  const handlePersianaUpdate = useCallback((data, specificBlindId = null) => {
    try {
      // Si es una actualización para una persiana específica
      if (specificBlindId) {
        updateBlindStateInUI(specificBlindId, data);
        return;
      }
      
      // Si es una actualización general, intentar identificar la persiana
      if (data && data.id) {
        updateBlindStateInUI(data.id, data);
      }
    } catch (error) {
      console.error('Error procesando actualización MQTT:', error);
    }
  }, [updateBlindStateInUI]);

  // Cargar persianas desde la BD
  const loadBlinds = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const blindsList = await db.getBlinds();
      
      setBlinds(blindsList);
      
      // Seleccionar primera persiana por defecto si no hay ninguna seleccionada
      if (blindsList.length > 0 && !selectedBlind) {
        setSelectedBlind(blindsList[0]);
      }
      
      return blindsList;
    } catch (err) {
      setError('Error al cargar persianas');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar programaciones
  const loadSchedules = async (blindId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const schedulesList = await db.getSchedulesByBlindId(blindId);
      
      setSchedules(schedulesList);
      
      return schedulesList;
    } catch (err) {
      setError('Error al cargar programaciones');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Seleccionar una persiana
  const selectBlind = (blind) => {
    setSelectedBlind(blind);
  };

  // Crear una persiana
  const createBlind = async (blindData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const success = await db.saveBlind(blindData);
      
      if (success) {
        await loadBlinds();
        return { success: true };
      } else {
        setError('Error al crear persiana');
        return { success: false, message: 'Error al crear persiana' };
      }
    } catch (err) {
      setError('Error al crear persiana');
      console.error(err);
      return { success: false, message: err.message || 'Error al crear persiana' };
    } finally {
      setIsLoading(false);
    }
  };

  // Crear una programación
  const createSchedule = async (scheduleData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const success = await db.saveSchedule(scheduleData);
      
      if (success) {
        // Recargar programaciones
        if (selectedBlind) {
          await loadSchedules(selectedBlind._id || selectedBlind.id);
        }
        return { success: true };
      } else {
        setError('Error al crear programación');
        return { success: false, message: 'Error al crear programación' };
      }
    } catch (err) {
      setError('Error al crear programación');
      console.error(err);
      return { success: false, message: err.message || 'Error al crear programación' };
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar una programación
  const updateSchedule = async (id, scheduleData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Obtener programación actual
      const allSchedules = await db.getSchedules();
      const scheduleToUpdate = allSchedules.find(schedule => schedule._id === id || schedule.id === id);
      
      if (!scheduleToUpdate) {
        setError('Programación no encontrada');
        return { success: false, message: 'Programación no encontrada' };
      }
      
      const updatedSchedule = { ...scheduleToUpdate, ...scheduleData };
      const success = await db.saveSchedule(updatedSchedule);
      
      if (success) {
        // Recargar programaciones
        if (selectedBlind) {
          await loadSchedules(selectedBlind._id || selectedBlind.id);
        }
        return { success: true };
      } else {
        setError('Error al actualizar programación');
        return { success: false, message: 'Error al actualizar programación' };
      }
    } catch (err) {
      setError('Error al actualizar programación');
      console.error(err);
      return { success: false, message: err.message || 'Error al actualizar programación' };
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar una programación
  const deleteSchedule = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const success = await db.deleteSchedule(id);
      
      if (success) {
        // Recargar programaciones
        if (selectedBlind) {
          await loadSchedules(selectedBlind._id || selectedBlind.id);
        }
        return { success: true };
      } else {
        setError('Error al eliminar programación');
        return { success: false, message: 'Error al eliminar programación' };
      }
    } catch (err) {
      setError('Error al eliminar programación');
      console.error(err);
      return { success: false, message: err.message || 'Error al eliminar programación' };
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar una persiana CON MQTT
  const updateBlind = async (id, blindData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const blindToUpdate = await db.getBlindById(id);
      
      if (!blindToUpdate) {
        setError('Persiana no encontrada');
        return { success: false, message: 'Persiana no encontrada' };
      }
      
      const updatedBlind = { ...blindToUpdate, ...blindData };
      
      // Publicar el cambio vía MQTT si estamos conectados
      if (isConnected) {
        try {
          await publish(`persiana/${id}/command`, {
            action: 'update',
            ...blindData
          });
        } catch (mqttError) {
          console.error('Error enviando comando MQTT:', mqttError);
        }
      }
      
      // También guardamos en la base de datos local/remota
      const success = await db.saveBlind(updatedBlind);
      
      if (success) {
        // Actualizamos el estado local inmediatamente (sin esperar la respuesta MQTT)
        updateBlindStateInUI(id, blindData);
        return { success: true };
      } else {
        setError('Error al actualizar persiana');
        return { success: false, message: 'Error al actualizar persiana' };
      }
    } catch (err) {
      setError('Error al actualizar persiana');
      console.error(err);
      return { success: false, message: err.message || 'Error al actualizar persiana' };
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar una persiana
  const deleteBlind = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Enviar comando de eliminación vía MQTT
      if (isConnected) {
        try {
          await publish(`persiana/${id}/command`, {
            action: 'delete'
          });
        } catch (mqttError) {
          console.error('Error enviando comando de eliminación MQTT:', mqttError);
        }
      }
      
      const success = await db.deleteBlind(id);
      
      if (success) {
        // Actualizar la lista de persianas
        const updatedBlinds = await loadBlinds();
        
        // Si la persiana eliminada era la seleccionada, seleccionar otra o ninguna
        if (selectedBlind && (selectedBlind._id === id || selectedBlind.id === id)) {
          if (updatedBlinds.length > 0) {
            setSelectedBlind(updatedBlinds[0]);
          } else {
            setSelectedBlind(null);
          }
        }
        
        return { success: true };
      } else {
        setError('Error al eliminar persiana');
        return { success: false, message: 'Error al eliminar persiana' };
      }
    } catch (err) {
      setError('Error al eliminar persiana');
      console.error(err);
      return { success: false, message: err.message || 'Error al eliminar persiana' };
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar el estado de una persiana (abrir/cerrar) con MQTT
  const updateBlindStatus = async (id, status, level) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const blindToUpdate = await db.getBlindById(id);
      
      if (!blindToUpdate) {
        setError('Persiana no encontrada');
        return { success: false, message: 'Persiana no encontrada' };
      }
      
      // Configurar nivel de apertura según el estado
      let nivelApertura = level;
      if (level === undefined || level === null) {
        nivelApertura = status === 'abierta' ? 100 : (status === 'cerrada' ? 0 : blindToUpdate.nivelApertura);
      }
      
      // Crear el comando para la persiana
      const comando = {
        estado: status,
        nivelApertura: nivelApertura
      };
      
      // Enviar comando vía MQTT
      if (isConnected) {
        try {
          await publish(`persiana/${id}/command`, {
            action: 'changeStatus',
            ...comando
          });
          
          // Actualizamos inmediatamente en la interfaz
          // (Esta actualización se confirmará cuando recibamos la respuesta MQTT)
          updateBlindStateInUI(id, comando);
        } catch (mqttError) {
          console.error('Error enviando comando MQTT:', mqttError);
        }
      }
      
      // También guardamos en la base de datos
      const updatedBlind = { 
        ...blindToUpdate, 
        ...comando,
        ultimaActualizacion: new Date().toISOString()
      };
      
      const success = await db.saveBlind(updatedBlind);
      
      if (success) {
        return { success: true };
      } else {
        setError('Error al actualizar estado');
        return { success: false, message: 'Error al actualizar estado' };
      }
    } catch (err) {
      setError('Error al actualizar estado');
      console.error(err);
      return { success: false, message: err.message || 'Error al actualizar estado' };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlindContext.Provider
      value={{
        blinds,
        selectedBlind,
        schedules,
        isLoading,
        error,
        selectBlind,
        loadBlinds,
        createBlind,
        updateBlind,
        deleteBlind,
        updateBlindStatus,
        loadSchedules,
        createSchedule,
        updateSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </BlindContext.Provider>
  );
};