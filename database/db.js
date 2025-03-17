import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';

// Base de datos en memoria para pruebas
const initialUsers = [
  { email: 'admin@test.com', password: '123456' },
];

// Función para inicializar la base de datos
export const initDB = async () => {
  const storedUsers = await AsyncStorage.getItem(USERS_KEY);
  if (!storedUsers) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
};

// Función para registrar usuarios
export const registerUser = async (email, password) => {
  const storedUsers = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
  const userExists = storedUsers.some(user => user.email === email);

  if (userExists) return false;

  storedUsers.push({ email, password });
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(storedUsers));
  return true;
};

// Función para validar login
export const loginUser = async (email, password) => {
  const storedUsers = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
  return storedUsers.some(user => user.email === email && user.password === password);
};

// Cerrar sesión
export const logoutUser = async () => {
  await AsyncStorage.removeItem('loggedInUser');
};

// Guardar usuario autenticado
export const setLoggedInUser = async (email) => {
  await AsyncStorage.setItem('loggedInUser', email);
};

// Obtener usuario autenticado
export const getLoggedInUser = async () => {
  return await AsyncStorage.getItem('loggedInUser');
};
 