// frontend/database/context/MQTTContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as Paho from 'paho-mqtt';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [messages, setMessages] = useState({});
  const [lastMessage, setLastMessage] = useState(null);
  const [lastTopic, setLastTopic] = useState(null);
  const [sensorData, setSensorData] = useState({
    temperatura: -1,
    humedad: -1,
    luz: undefined,
    motor: 'OFF',
    velocidad: 0
  });

  useEffect(() => {
    const clientId = 'clientId-' + Math.random().toString(16).substr(2, 8);
    const mqttClient = new Paho.Client('192.168.33.46', 1883, clientId);

    mqttClient.onConnectionLost = (responseObject) => {
      console.log('Conexión perdida:', responseObject.errorMessage);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };

    mqttClient.onMessageArrived = (message) => {
      const topic = message.destinationName;
      const payload = message.payloadString;
      
      // Actualizar mensajes por topic
      setMessages((prevMessages) => ({
        ...prevMessages,
        [topic]: payload,
      }));
      
      // Actualizar último mensaje recibido
      setLastMessage(payload);
      setLastTopic(topic);
      
      // Procesar datos de sensores
      if (topic === 'sensores/datos') {
        try {
          const data = JSON.parse(payload);
          setSensorData(data);
        } catch (error) {
          console.error('Error al procesar datos de sensores:', error);
        }
      }
    };

    const connectClient = () => {
      setConnectionStatus('connecting');
      mqttClient.connect({
        onSuccess: () => {
          console.log('Conectado al broker MQTT');
          setIsConnected(true);
          setConnectionStatus('connected');
          setClient(mqttClient);
          
          // Suscribirse al tópico de sensores automáticamente
          mqttClient.subscribe('sensores/datos');
        },
        onFailure: (err) => {
          console.error('Error al conectar al broker MQTT:', err);
          setIsConnected(false);
          setConnectionStatus('error');
          // Reintentar conexión después de 5 segundos
          setTimeout(connectClient, 5000);
        },
      });
    };

    connectClient();

    return () => {
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, []);

  const connectMQTT = useCallback(async () => {
    if (client && !client.isConnected()) {
      setConnectionStatus('connecting');
      client.connect({
        onSuccess: () => {
          setIsConnected(true);
          setConnectionStatus('connected');
          
          // Reintentar suscripciones
          client.subscribe('sensores/datos');
        },
        onFailure: (err) => {
          console.error('Error reconectando a MQTT:', err);
          setConnectionStatus('error');
          setIsConnected(false);
        }
      });
    }
  }, [client]);

  const subscribe = useCallback((topic, callback) => {
    if (client && isConnected) {
      client.subscribe(topic);
      console.log(`Suscrito a: ${topic}`);
      
      // Si se proporciona un callback, configuramos un listener para este topic
      if (callback) {
        // Si es el tópico de sensores, procesa el objeto sensorData
        if (topic === 'sensores/datos') {
          callback(sensorData);
          
          // Configurar un efecto para reenviar actualizaciones de sensorData
          const interval = setInterval(() => {
            callback(sensorData);
          }, 1000);
          
          return () => clearInterval(interval);
        } else {
          // Para otros tópicos, procesa los mensajes normales
          const wrappedCallback = () => {
            if (messages[topic]) {
              callback(messages[topic]);
            }
          };
          
          // Ejecutar callback de inmediato si hay un mensaje
          if (messages[topic]) {
            callback(messages[topic]);
          }
          
          // Configurar un intervalo para verificar nuevos mensajes
          const interval = setInterval(wrappedCallback, 100);
          return () => clearInterval(interval);
        }
      }
    }
  }, [client, isConnected, messages, sensorData]);

  const unsubscribe = useCallback((topic) => {
    if (client && isConnected) {
      client.unsubscribe(topic);
      console.log(`Cancelada suscripción a: ${topic}`);
    }
  }, [client, isConnected]);

  const publish = useCallback((topic, message) => {
    if (client && isConnected) {
      const messageStr = typeof message === 'object' ? JSON.stringify(message) : message;
      const mqttMessage = new Paho.Message(messageStr);
      mqttMessage.destinationName = topic;
      client.send(mqttMessage);
      console.log(`Mensaje enviado a ${topic}: ${messageStr}`);
      return true;
    }
    console.warn('No se pudo enviar el mensaje. Cliente no conectado.');
    return false;
  }, [client, isConnected]);

  return (
    <MQTTContext.Provider
      value={{
        isConnected,
        connectionStatus,
        lastMessage,
        lastTopic,
        sensorData,
        connect: connectMQTT,
        publish,
        subscribe,
        unsubscribe,
        client
      }}
    >
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => {
  const context = useContext(MQTTContext);
  if (!context) {
    throw new Error('useMQTT debe usarse dentro de un MQTTProvider');
  }
  return context;
};