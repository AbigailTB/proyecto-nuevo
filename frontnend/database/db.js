import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';

// Base de datos en memoria para pruebas
const initialUsers = [
  { name: 'Administrador', email: 'admin@test.com', password: '123456' },
];

// Función para inicializar la base de datos
export const initDB = async () => {
  const storedUsers = await AsyncStorage.getItem(USERS_KEY);
  if (!storedUsers) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
};

// Función para registrar usuarios modificada para incluir el nombre
export const registerUser = async (name, email, password) => {
  try {
    const storedUsers = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
    const userExists = storedUsers.some(user => user.email === email);
    
    if (userExists) return false;
    
    storedUsers.push({ name, email, password });
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(storedUsers));
    return true;
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    throw error;
  }
};

// Función para validar login
export const loginUser = async (email, password) => {
  try {
    const storedUsers = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
    return storedUsers.some(user => user.email === email && user.password === password);
  } catch (error) {
    console.error('Error en la validación de usuario:', error);
    throw error;
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('loggedInUser');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Guardar usuario autenticado
export const setLoggedInUser = async (email) => {
  try {
    await AsyncStorage.setItem('loggedInUser', email);
  } catch (error) {
    console.error('Error al guardar usuario autenticado:', error);
    throw error;
  }
};

// Obtener usuario autenticado
export const getLoggedInUser = async () => {
  try {
    return await AsyncStorage.getItem('loggedInUser');
  } catch (error) {
    console.error('Error al obtener usuario autenticado:', error);
    throw error;
  }
};

// Función para obtener los datos del usuario actual
export const getCurrentUserData = async () => {
  try {
    const email = await getLoggedInUser();
    if (!email) return null;
    
    const storedUsers = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
    return storedUsers.find(user => user.email === email) || null;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};