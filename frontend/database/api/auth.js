import apiClient from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from './config';

// Registrar usuario
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    
// Guardar token y datos del usuario
if (response.data.token) {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
  }
  
  return response.data;
} catch (error) {
  throw error.response?.data || error;
}
};

// Cerrar sesión
export const logout = async () => {
try {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  await AsyncStorage.removeItem(USER_DATA_KEY);
  return true;
} catch (error) {
  console.error('Error al cerrar sesión:', error);
  throw error;
}
};

// Obtener usuario actual
export const getCurrentUser = async () => {
try {
  const userJson = await AsyncStorage.getItem(USER_DATA_KEY);
  return userJson ? JSON.parse(userJson) : null;
} catch (error) {
  console.error('Error al obtener usuario actual:', error);
  return null;
}
};

// Verificar si hay sesión activa
export const isAuthenticated = async () => {
try {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
} catch (error) {
  return false;
}
};

// Obtener perfil del servidor
export const getProfile = async () => {
try {
  const response = await apiClient.get('/auth/me');
  return response.data;
} catch (error) {
  throw error.response?.data || error;
}
};

export default {
register,
login,
logout,
getCurrentUser,
isAuthenticated,
getProfile
};