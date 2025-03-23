// frontend/database/mqtt/mqttService.js
import * as mqtt from 'mqtt/dist/mqtt';
import { Buffer } from 'buffer';
import config from '../config';

global.Buffer = Buffer;

// Configuración del broker MQTT usando la variable de entorno
const MQTT_BROKER = config.mqttBroker;
const MQTT_OPTIONS = {
  clientId: `persianas_app_${Math.random().toString(16).slice(3)}`,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
};


class MQTTService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.topics = {};
    this.callbacks = {};
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        if (this.client && this.isConnected) {
          console.log('Ya conectado a MQTT');
          resolve(true);
          return;
        }

        console.log('Intentando conectar a MQTT broker...');
        this.client = mqtt.connect(MQTT_BROKER, MQTT_OPTIONS);

        this.client.on('connect', () => {
          console.log('Conectado exitosamente al broker MQTT');
          this.isConnected = true;
          
          // Re-suscribirse a todos los topics previos
          Object.keys(this.topics).forEach(topic => {
            if (this.topics[topic]) {
              this.client.subscribe(topic);
              console.log(`Re-suscrito al topic: ${topic}`);
            }
          });
          
          resolve(true);
        });

        this.client.on('error', (err) => {
          console.error('Error de conexión MQTT:', err);
          this.isConnected = false;
          reject(err);
        });

        this.client.on('message', (topic, message) => {
          const messageStr = message.toString();
          console.log(`Mensaje recibido en ${topic}: ${messageStr}`);
          
          try {
            // Intentar parsear como JSON
            const jsonMessage = JSON.parse(messageStr);
            
            // Ejecutar callbacks registrados para este topic
            if (this.callbacks[topic]) {
              this.callbacks[topic].forEach(callback => {
                callback(jsonMessage);
              });
            }
          } catch (e) {
            // Si no es JSON, enviar como string
            if (this.callbacks[topic]) {
              this.callbacks[topic].forEach(callback => {
                callback(messageStr);
              });
            }
          }
        });

        this.client.on('reconnect', () => {
          console.log('Intentando reconectar a MQTT...');
        });

        this.client.on('offline', () => {
          console.log('MQTT cliente desconectado');
          this.isConnected = false;
        });
      } catch (error) {
        console.error('Error inicializando cliente MQTT:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.client && this.isConnected) {
        this.client.end(true, {}, () => {
          console.log('Desconectado del broker MQTT');
          this.isConnected = false;
          this.topics = {};
          this.callbacks = {};
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }

  subscribe(topic, callback) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('No conectado a MQTT'));
        return;
      }

      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Error al suscribirse a ${topic}:`, err);
          reject(err);
          return;
        }
        
        console.log(`Suscrito al topic: ${topic}`);
        this.topics[topic] = true;
        
        // Registrar callback
        if (callback) {
          if (!this.callbacks[topic]) {
            this.callbacks[topic] = [];
          }
          this.callbacks[topic].push(callback);
        }
        
        resolve(true);
      });
    });
  }

  unsubscribe(topic, callback) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('No conectado a MQTT'));
        return;
      }

      // Si se proporciona un callback, solo eliminamos ese callback
      if (callback && this.callbacks[topic]) {
        this.callbacks[topic] = this.callbacks[topic].filter(cb => cb !== callback);
        resolve(true);
        return;
      }

      // Si no hay callback o es el último, desuscribirse del topic
      this.client.unsubscribe(topic, (err) => {
        if (err) {
          console.error(`Error al desuscribirse de ${topic}:`, err);
          reject(err);
          return;
        }
        
        console.log(`Desuscrito del topic: ${topic}`);
        this.topics[topic] = false;
        this.callbacks[topic] = [];
        resolve(true);
      });
    });
  }

  publish(topic, message) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('No conectado a MQTT'));
        return;
      }

      // Convertir objetos a JSON
      const messageContent = typeof message === 'object' 
        ? JSON.stringify(message) 
        : String(message);

      this.client.publish(topic, messageContent, (err) => {
        if (err) {
          console.error(`Error al publicar en ${topic}:`, err);
          reject(err);
          return;
        }
        
        console.log(`Mensaje publicado en ${topic}: ${messageContent}`);
        resolve(true);
      });
    });
  }
}

// Singleton instance
const mqttClient = new MQTTService();
export default mqttClient;
