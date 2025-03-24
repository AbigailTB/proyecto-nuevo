// frontend/database/mqtt/mqttService.js
<<<<<<< HEAD
import { Client, Message } from 'paho-mqtt';

// Configuration for your MQTT broker
const MQTT_HOST = '192.168.33.46';
const MQTT_PORT = 1883;
const MQTT_CLIENT_ID = 'app-' + Math.random().toString(16).substr(2, 8);
=======
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

>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49

class MQTTService {
  constructor() {
    this.client = null;
    this.isConnected = false;
<<<<<<< HEAD
    this.topicCallbacks = new Map();
=======
    this.topics = {};
    this.callbacks = {};
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
<<<<<<< HEAD
        // Create client if not exists
        if (!this.client) {
          this.client = new Client(MQTT_HOST, MQTT_PORT, MQTT_CLIENT_ID);
          
          // Set callbacks
          this.client.onConnectionLost = this._onConnectionLost.bind(this);
          this.client.onMessageArrived = this._onMessageArrived.bind(this);
        }

        // Connect to broker
        this.client.connect({
          onSuccess: () => {
            console.log('MQTT Connected successfully');
            this.isConnected = true;
            
            // Resubscribe to topics
            this.topicCallbacks.forEach((callbacks, topic) => {
              this.client.subscribe(topic);
            });
            
            resolve(true);
          },
          onFailure: (error) => {
            console.error('MQTT Connection failed:', error);
            this.isConnected = false;
            reject(error);
          },
          useSSL: false
        });
      } catch (error) {
        console.error('MQTT Connection error:', error);
=======
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
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
        reject(error);
      }
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.client && this.isConnected) {
<<<<<<< HEAD
        this.client.disconnect();
        this.isConnected = false;
      }
      resolve(true);
=======
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
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    });
  }

  subscribe(topic, callback) {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
      try {
        // Add callback to topic
        if (!this.topicCallbacks.has(topic)) {
          this.topicCallbacks.set(topic, []);
        }
        
        if (callback) {
          this.topicCallbacks.get(topic).push(callback);
        }
        
        // Subscribe if connected
        if (this.isConnected && this.client) {
          this.client.subscribe(topic, {
            onSuccess: () => {
              console.log(`Subscribed to ${topic}`);
              resolve(true);
            },
            onFailure: (error) => {
              console.error(`Failed to subscribe to ${topic}:`, error);
              reject(error);
            }
          });
        } else {
          console.log(`Will subscribe to ${topic} when connected`);
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  unsubscribe(topic) {
    return new Promise((resolve, reject) => {
      try {
        // Remove callbacks
        this.topicCallbacks.delete(topic);
        
        // Unsubscribe if connected
        if (this.isConnected && this.client) {
          this.client.unsubscribe(topic, {
            onSuccess: () => resolve(true),
            onFailure: (error) => reject(error)
          });
        } else {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
=======
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
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    });
  }

  publish(topic, message) {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
      if (!this.isConnected || !this.client) {
        reject(new Error('MQTT client not connected'));
        return;
      }
      
      try {
        const payload = typeof message === 'string' ? message : JSON.stringify(message);
        const mqttMessage = new Message(payload);
        mqttMessage.destinationName = topic;
        
        this.client.send(mqttMessage);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  _onConnectionLost(response) {
    this.isConnected = false;
    console.log(`MQTT Connection lost: ${response.errorMessage}`);
    
    // Try to reconnect after a delay
    setTimeout(() => {
      if (!this.isConnected) {
        this.connect().catch(console.error);
      }
    }, 5000);
  }

  _onMessageArrived(message) {
    const topic = message.destinationName;
    let payload = message.payloadString;
    
    // Try to parse JSON
    try {
      if (payload.startsWith('{') || payload.startsWith('[')) {
        payload = JSON.parse(payload);
      }
    } catch (error) {
      // Keep as string if parsing fails
    }
    
    // Call callbacks for this topic
    if (this.topicCallbacks.has(topic)) {
      this.topicCallbacks.get(topic).forEach(callback => {
        try {
          callback(payload, topic);
        } catch (error) {
          console.error('Error in MQTT callback:', error);
        }
      });
    }
  }
}

// Create and export singleton
const mqttClient = new MQTTService();
export default mqttClient;
=======
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
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
