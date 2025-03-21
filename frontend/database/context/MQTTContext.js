<<<<<<< HEAD
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
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Paho from 'paho-mqtt';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const mqttClient = new Paho.Client('192.168.33.46', 1883, 'clientId-' + Math.random().toString(16).substr(2, 8));

    mqttClient.onConnectionLost = (responseObject) => {
      console.log('Conexión perdida:', responseObject.errorMessage);
      setIsConnected(false);
    };

    mqttClient.onMessageArrived = (message) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [message.destinationName]: message.payloadString,
      }));
    };

    const connectClient = () => {
      mqttClient.connect({
        onSuccess: () => {
          console.log('Conectado al broker MQTT');
          setIsConnected(true);
          setClient(mqttClient);
        },
        onFailure: (err) => {
          console.error('Error al conectar al broker MQTT:', err);
          setIsConnected(false);
          setTimeout(connectClient, 5000); // Reintentar conexión después de 5 segundos
        },
      });
    };

    connectClient();

    return () => {
      if (mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, []);

  const subscribe = (topic, callback) => {
    if (client && isConnected) {
      client.subscribe(topic);
      const interval = setInterval(() => {
        if (messages[topic]) {
          callback(messages[topic]);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  };

  const publish = (topic, message) => {
    if (client && isConnected) {
      const mqttMessage = new Paho.Message(message);
      mqttMessage.destinationName = topic;
      client.send(mqttMessage);
    }
  };

  return (
    <MQTTContext.Provider value={{ isConnected, subscribe, publish }}>
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
      {children}
    </MQTTContext.Provider>
  );
};

<<<<<<< HEAD
// Hook personalizado para usar MQTT en componentes
export const useMQTT = () => {
  const context = React.useContext(MQTTContext);
  if (!context) {
    throw new Error('useMQTT debe usarse dentro de un MQTTProvider');
  }
  return context;
};
=======
export const useMQTT = () => useContext(MQTTContext);
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
