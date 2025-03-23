import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as db from '../db';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Comprobar si hay sesión activa al iniciar la app
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setIsLoading(true);
        // Inicializar la base de datos si es necesario
        await db.initDB();
        
        // Verificar si hay sesión activa
        const isAuthenticated = await api.auth.isAuthenticated();
        if (isAuthenticated) {
          const user = await api.auth.getCurrentUser();
          setUserToken('token-exists');
          setUserData(user);
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      const success = await db.loginUser(email, password);
      
      if (success) {
        const user = await db.getLoggedInUser();
        setUserToken('token-exists');
        setUserData(user);
        
        // Sincronizar datos
        await db.syncData();
        
        return { success: true };
      } else {
        return { success: false, message: 'Credenciales inválidas' };
      }
    } catch (error) {
      return { success: false, message: error.message || 'Error al iniciar sesión' };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para registrar usuario
  const register = async (nombre, email, password) => {
    setIsLoading(true);
    
    try {
      const success = await db.registerUser(nombre, email, password);
      
      if (success) {
        return { success: true };
      } else {
        return { success: false, message: 'El email ya está registrado' };
      }
    } catch (error) {
      return { success: false, message: error.message || 'Error al registrar usuario' };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setIsLoading(true);
    
    try {
      await db.logoutUser();
      setUserToken(null);
      setUserData(null);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Error al cerrar sesión');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userData,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};