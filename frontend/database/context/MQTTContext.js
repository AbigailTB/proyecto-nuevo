// frontend/database/context/MQTTContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import mqttClient from '../mqtt/mqttService';

export const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState(null);
  const [lastTopic, setLastTopic] = useState(null);

  // Conectar al inicio
  useEffect(() => {
    connectMQTT();
    
    // Limpiar al desmontar
    return () => {
      mqttClient.disconnect().catch(console.error);
    };
  }, []);

  const connectMQTT = useCallback(async () => {
    try {
      setConnectionStatus('connecting');
      await mqttClient.connect();
      setIsConnected(true);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Error conectando a MQTT:', error);
      setConnectionStatus('error');
      setIsConnected(false);
    }
  }, []);

  const publishMessage = useCallback(async (topic, message) => {
    if (!isConnected) {
      await connectMQTT();
    }
    
    try {
      return await mqttClient.publish(topic, message);
    } catch (error) {
      console.error('Error publicando mensaje MQTT:', error);
      return false;
    }
  }, [isConnected, connectMQTT]);

  const subscribeToTopic = useCallback(async (topic, callback) => {
    if (!isConnected) {
      await connectMQTT();
    }
    
    try {
      const wrappedCallback = (data) => {
        // Actualizar estado para UI
        setLastMessage(data);
        setLastTopic(topic);
        
        // Llamar al callback original
        if (callback) callback(data);
      };
      
      return await mqttClient.subscribe(topic, wrappedCallback);
    } catch (error) {
      console.error('Error suscribiéndose a topic MQTT:', error);
      return false;
    }
  }, [isConnected, connectMQTT]);

  const unsubscribeFromTopic = useCallback(async (topic, callback) => {
    if (!isConnected) return false;
    
    try {
      return await mqttClient.unsubscribe(topic, callback);
    } catch (error) {
      console.error('Error cancelando suscripción MQTT:', error);
      return false;
    }
  }, [isConnected]);

  return (
    <MQTTContext.Provider 
      value={{
        isConnected,
        connectionStatus,
        lastMessage,
        lastTopic,
        connect: connectMQTT,
        publish: publishMessage,
        subscribe: subscribeToTopic,
        unsubscribe: unsubscribeFromTopic,
        // Acceso directo al cliente para casos avanzados
        client: mqttClient
      }}
    >
      {children}
    </MQTTContext.Provider>
  );
};

// Hook personalizado para usar MQTT en componentes
export const useMQTT = () => {
  const context = React.useContext(MQTTContext);
  if (!context) {
    throw new Error('useMQTT debe usarse dentro de un MQTTProvider');
  }
  return context;
};