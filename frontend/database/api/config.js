// API URL
export const API_URL = __DEV__ 
  ? 'http://192.168.33.46:5000/api' // URL de desarrollo (con la última IP actualizada)
  : 'https://tu-servidor-produccion.com/api'; // URL de producción

// AsyncStorage keys
export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';
export const PERSIST_DATA_KEY = 'persist_data';