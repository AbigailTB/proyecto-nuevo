import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import api from './api';
import { PERSIST_DATA_KEY } from './api/config';

// Inicializar la base de datos
export const initDB = async () => {
  try {
    // Comprobar si ya existe
    const dbInitialized = await AsyncStorage.getItem('db_initialized');
    
    if (!dbInitialized) {
      // Crear tablas iniciales
      await AsyncStorage.setItem('users', JSON.stringify([]));
      await AsyncStorage.setItem('blinds', JSON.stringify([]));
      await AsyncStorage.setItem('schedules', JSON.stringify([]));
      await AsyncStorage.setItem('products', JSON.stringify([]));
      
      // Establecer la bandera de inicialización
      await AsyncStorage.setItem('db_initialized', 'true');
      console.log('Base de datos local inicializada correctamente');
    }
    
    return true;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    return false;
  }
};

// Sincronizar datos con el servidor
export const syncData = async () => {
  try {
    const isAuthenticated = await api.auth.isAuthenticated();
    
    if (isAuthenticated) {
      // Sincronizar persianas
      const persianas = await api.persianas.getPersianas();
      await AsyncStorage.setItem('blinds', JSON.stringify(persianas));
      
      // Sincronizar programaciones
      const programaciones = await api.programaciones.getProgramaciones();
      await AsyncStorage.setItem('schedules', JSON.stringify(programaciones));
      
      console.log('Datos sincronizados correctamente');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error al sincronizar datos:', error);
    return false;
  }
};

// Funciones para el manejo de usuarios
export const registerUser = async (nombre, email, password) => {
  try {
    // Intentar registrar en el servidor si hay conexión
    try {
      const result = await api.auth.register({
        name: nombre.split(' ')[0] || nombre, // Nombre
        surname: nombre.split(' ').slice(1).join(' ') || '', // Apellido
        email,
        password,
        phone: ''
      });
      
      return true;
    } catch (apiError) {
      console.error('Error al registrar en API:', apiError);
      
      // Si falla el servidor, guardar en local
      // Obtener la lista de usuarios
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      
      // Verificar si el email ya está registrado
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        return false;
      }
      
      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        nombre,
        email,
        password, // Nota: en una aplicación real, esta contraseña debería estar encriptada
        createdAt: new Date().toISOString()
      };
      
      // Guardar el usuario
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      
      return true;
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    // Intentar login en el servidor
    try {
      const result = await api.auth.login(email, password);
      return true;
    } catch (apiError) {
      console.error('Error al iniciar sesión en API:', apiError);
      
      // Si falla el servidor, intentar login local
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      
      // Buscar usuario por email y contraseña
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {
        // Guardar usuario en sesión local
        await setLoggedInUser(email);
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const setLoggedInUser = async (email) => {
  try {
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    
    const user = users.find(user => user.email === email);
    if (user) {
      await AsyncStorage.setItem('current_user', JSON.stringify(user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al establecer usuario actual:', error);
    throw error;
  }
};

export const getLoggedInUser = async () => {
  try {
    // Primero intentar obtener desde la API
    try {
      const user = await api.auth.getCurrentUser();
      if (user) return user;
    } catch (apiError) {
      console.log('No se pudo obtener usuario de API, usando local');
    }
    
    // Si no hay conexión o no hay usuario en API, usar local
    const userJSON = await AsyncStorage.getItem('current_user');
    return userJSON ? JSON.parse(userJSON) : null;
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    // Cerrar sesión en API
    try {
      await api.auth.logout();
    } catch (apiError) {
      console.log('No se pudo cerrar sesión en API');
    }
    
    // Cerrar sesión local
    await AsyncStorage.removeItem('current_user');
    return true;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Funciones para el manejo de persianas
export const getBlinds = async () => {
  try {
    // Intentar obtener desde la API
    try {
      const blinds = await api.persianas.getPersianas();
      // Guardar en local para persistencia
      await AsyncStorage.setItem('blinds', JSON.stringify(blinds));
      return blinds;
    } catch (apiError) {
      console.log('No se pudieron obtener persianas de API, usando local');
    }
    
    // Si falla, obtener desde local
    const blindsJSON = await AsyncStorage.getItem('blinds');
    return blindsJSON ? JSON.parse(blindsJSON) : [];
  } catch (error) {
    console.error('Error al obtener persianas:', error);
    throw error;
  }
};

export const getBlindById = async (id) => {
  try {
    // Intentar obtener desde la API
    try {
      const blind = await api.persianas.getPersiana(id);
      return blind;
    } catch (apiError) {
      console.log('No se pudo obtener persiana de API, usando local');
    }
    
    // Si falla, obtener desde local
    const blindsJSON = await AsyncStorage.getItem('blinds');
    const blinds = blindsJSON ? JSON.parse(blindsJSON) : [];
    
    return blinds.find(blind => blind._id === id || blind.id === id) || null;
  } catch (error) {
    console.error('Error al obtener persiana por ID:', error);
    throw error;
  }
};

export const saveBlind = async (blind) => {
  try {
    // Si la persiana tiene ID, actualizarla en API
    if (blind._id || blind.id) {
      const id = blind._id || blind.id;
      try {
        const result = await api.persianas.updatePersiana(id, blind);
        
        // Actualizar en local
        const blindsJSON = await AsyncStorage.getItem('blinds');
        const blinds = blindsJSON ? JSON.parse(blindsJSON) : [];
        
        const blindIndex = blinds.findIndex(b => b._id === id || b.id === id);
        
        if (blindIndex !== -1) {
          blinds[blindIndex] = result.persiana;
        } else {
          blinds.push(result.persiana);
        }
        
        await AsyncStorage.setItem('blinds', JSON.stringify(blinds));
        return true;
      } catch (apiError) {
        console.error('Error al actualizar persiana en API:', apiError);
        
        // Si falla, actualizar solo en local
        const blindsJSON = await AsyncStorage.getItem('blinds');
        const blinds = blindsJSON ? JSON.parse(blindsJSON) : [];
        
        const blindIndex = blinds.findIndex(b => b._id === id || b.id === id);
        
        if (blindIndex !== -1) {
          blinds[blindIndex] = { ...blinds[blindIndex], ...blind };
        } else {
          blinds.push(blind);
        }
        
        await AsyncStorage.setItem('blinds', JSON.stringify(blinds));
        return true;
      }
    } else {
      // Si no tiene ID, es nueva, crearla en API
      try {
        const result = await api.persianas.createPersiana(blind);
        
        // Guardar en local
        const blindsJSON = await AsyncStorage.getItem('blinds');
        const blinds = blindsJSON ? JSON.parse(blindsJSON) : [];
        
        blinds.push(result.persiana);
        await AsyncStorage.setItem('blinds', JSON.stringify(blinds));
        
        return true;
      } catch (apiError) {
        console.error('Error al crear persiana en API:', apiError);
        
        // Si falla, guardar solo en local con ID temporal
        const blindsJSON = await AsyncStorage.getItem('blinds');
        const blinds = blindsJSON ? JSON.parse(blindsJSON) : [];
        
        blinds.push({
          id: `temp-${Date.now()}`,
          ...blind,
          createdAt: new Date().toISOString()
        });
        
        await AsyncStorage.setItem('blinds', JSON.stringify(blinds));
        return true;
      }
    }
  } catch (error) {
    console.error('Error al guardar persiana:', error);
    throw error;
  }
};

export const deleteBlind = async (id) => {
  try {
    // Intentar eliminar en API
    try {
      await api.persianas.deletePersiana(id);
    } catch (apiError) {
      console.error('Error al eliminar persiana en API:', apiError);
    }
    
    // Eliminar en local
    const blindsJSON = await AsyncStorage.getItem('blinds');
    const blinds = blindsJSON ? JSON.parse(blindsJSON) : [];
    
    const updatedBlinds = blinds.filter(blind => blind._id !== id && blind.id !== id);
    await AsyncStorage.setItem('blinds', JSON.stringify(updatedBlinds));
    
    return true;
  } catch (error) {
    console.error('Error al eliminar persiana:', error);
    throw error;
  }
};

// Similarmente, puedes implementar las funciones para programaciones
export const getSchedules = async () => {
  try {
    // Intentar obtener desde la API
    try {
      const schedules = await api.programaciones.getProgramaciones();
      // Guardar en local
      await AsyncStorage.setItem('schedules', JSON.stringify(schedules));
      return schedules;
    } catch (apiError) {
      console.log('No se pudieron obtener programaciones de API, usando local');
    }
    
    // Si falla, obtener desde local
    const schedulesJSON = await AsyncStorage.getItem('schedules');
    return schedulesJSON ? JSON.parse(schedulesJSON) : [];
  } catch (error) {
    console.error('Error al obtener programaciones:', error);
    throw error;
  }
};

export const getSchedulesByBlindId = async (blindId) => {
  try {
    // Intentar obtener desde la API
    try {
      const schedules = await api.programaciones.getProgramacionesByPersiana(blindId);
      return schedules;
    } catch (apiError) {
      console.log('No se pudieron obtener programaciones de API, usando local');
    }
    
    // Si falla, obtener desde local
    const schedulesJSON = await AsyncStorage.getItem('schedules');
    const schedules = schedulesJSON ? JSON.parse(schedulesJSON) : [];
    
    return schedules.filter(schedule => schedule.persiana === blindId || schedule.persiana._id === blindId);
  } catch (error) {
    console.error('Error al obtener programaciones por ID de persiana:', error);
    throw error;
  }
};

export const saveSchedule = async (schedule) => {
  try {
    // Si la programación tiene ID, actualizarla en API
    if (schedule._id || schedule.id) {
      const id = schedule._id || schedule.id;
      try {
        const result = await api.programaciones.updateProgramacion(id, schedule);
        
        // Actualizar en local
        const schedulesJSON = await AsyncStorage.getItem('schedules');
        const schedules = schedulesJSON ? JSON.parse(schedulesJSON) : [];
        
        const scheduleIndex = schedules.findIndex(s => s._id === id || s.id === id);
        
        if (scheduleIndex !== -1) {
          schedules[scheduleIndex] = result.programacion;
        } else {
          schedules.push(result.programacion);
        }
        
        await AsyncStorage.setItem('schedules', JSON.stringify(schedules));
        return true;
      } catch (apiError) {
        console.error('Error al actualizar programación en API:', apiError);
        
        // Si falla, actualizar solo en local
        const schedulesJSON = await AsyncStorage.getItem('schedules');
        const schedules = schedulesJSON ? JSON.parse(schedulesJSON) : [];
        
        const scheduleIndex = schedules.findIndex(s => s._id === id || s.id === id);
        
        if (scheduleIndex !== -1) {
          schedules[scheduleIndex] = { ...schedules[scheduleIndex], ...schedule };
        } else {
          schedules.push(schedule);
        }
        
        await AsyncStorage.setItem('schedules', JSON.stringify(schedules));
        return true;
      }
    } else {
      // Si no tiene ID, es nueva, crearla en API
      try {
        const result = await api.programaciones.createProgramacion(schedule);
        
        // Guardar en local
        const schedulesJSON = await AsyncStorage.getItem('schedules');
        const schedules = schedulesJSON ? JSON.parse(schedulesJSON) : [];
        
        schedules.push(result.programacion);
        await AsyncStorage.setItem('schedules', JSON.stringify(schedules));
        
        return true;
      } catch (apiError) {
        console.error('Error al crear programación en API:', apiError);
        
        // Si falla, guardar solo en local con ID temporal
        const schedulesJSON = await AsyncStorage.getItem('schedules');
        const schedules = schedulesJSON ? JSON.parse(schedulesJSON) : [];
        
        schedules.push({
          id: `temp-${Date.now()}`,
          ...schedule,
          createdAt: new Date().toISOString()
        });
        
        await AsyncStorage.setItem('schedules', JSON.stringify(schedules));
        return true;
      }
    }
  } catch (error) {
    console.error('Error al guardar programación:', error);
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  try {
    // Intentar eliminar en API
    try {
      await api.programaciones.deleteProgramacion(id);
    } catch (apiError) {
      console.error('Error al eliminar programación en API:', apiError);
    }
    
    // Eliminar en local
    const schedulesJSON = await AsyncStorage.getItem('schedules');
    const schedules = schedulesJSON ? JSON.parse(schedulesJSON) : [];
    
    const updatedSchedules = schedules.filter(schedule => schedule._id !== id && schedule.id !== id);
    await AsyncStorage.setItem('schedules', JSON.stringify(updatedSchedules));
    
    return true;
  } catch (error) {
    console.error('Error al eliminar programación:', error);
    throw error;
  }
};

// Exportamos todas las funciones
export default {
  initDB,
  syncData,
  registerUser,
  loginUser,
  setLoggedInUser,
  getLoggedInUser,
  logoutUser,
  getBlinds,
  getBlindById,
  saveBlind,
  deleteBlind,
  getSchedules,
  getSchedulesByBlindId,
  saveSchedule,
  deleteSchedule
};