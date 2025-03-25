// frontend/database/mqtt/mqttService.js
import * as Paho from 'paho-mqtt';

// Configuración para el broker MQTT
const MQTT_HOST = '192.168.33.46';
const MQTT_PORT = 1883;
const MQTT_CLIENT_ID = 'app-' + Math.random().toString(16).substr(2, 8);

class MQTTService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.topicCallbacks = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        // Crear cliente si no existe
        if (!this.client) {
          this.client = new Paho.Client(MQTT_HOST, MQTT_PORT, MQTT_CLIENT_ID);
          
          // Configurar callbacks
          this.client.onConnectionLost = this._onConnectionLost.bind(this);
          this.client.onMessageArrived = this._onMessageArrived.bind(this);
        }

        // Conectar al broker
        this.client.connect({
          onSuccess: () => {
            console.log('MQTT conectado exitosamente');
            this.isConnected = true;
            
            // Re-suscribirse a los tópicos
            this.topicCallbacks.forEach((callbacks, topic) => {
              this.client.subscribe(topic);
              console.log(`Re-suscrito al tópico: ${topic}`);
            });
            
            resolve(true);
          },
          onFailure: (error) => {
            console.error('MQTT falló al conectar:', error);
            this.isConnected = false;
            reject(error);
          },
          useSSL: false
        });
      } catch (error) {
        console.error('MQTT error de conexión:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.client && this.isConnected) {
        this.client.disconnect();
        console.log('Desconectado del broker MQTT');
        this.isConnected = false;
      }
      resolve(true);
    });
  }

  subscribe(topic, callback) {
    return new Promise((resolve, reject) => {
      try {
        // Agregar callback al tópico
        if (!this.topicCallbacks.has(topic)) {
          this.topicCallbacks.set(topic, []);
        }
        
        if (callback) {
          this.topicCallbacks.get(topic).push(callback);
        }
        
        // Suscribirse si está conectado
        if (this.isConnected && this.client) {
          this.client.subscribe(topic, {
            onSuccess: () => {
              console.log(`Suscrito a ${topic}`);
              resolve(true);
            },
            onFailure: (error) => {
              console.error(`Error al suscribirse a ${topic}:`, error);
              reject(error);
            }
          });
        } else {
          console.log(`Se suscribirá a ${topic} cuando esté conectado`);
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  unsubscribe(topic, callback) {
    return new Promise((resolve, reject) => {
      try {
        // Si se proporciona un callback específico, solo eliminar ese callback
        if (callback && this.topicCallbacks.has(topic)) {
          const callbacks = this.topicCallbacks.get(topic);
          const updatedCallbacks = callbacks.filter(cb => cb !== callback);
          
          if (updatedCallbacks.length === 0) {
            // Si no quedan callbacks, desuscribirse completamente
            this.topicCallbacks.delete(topic);
            
            if (this.isConnected && this.client) {
              this.client.unsubscribe(topic, {
                onSuccess: () => {
                  console.log(`Desuscrito de ${topic}`);
                  resolve(true);
                },
                onFailure: (error) => reject(error)
              });
            } else {
              resolve(true);
            }
          } else {
            // Actualizar la lista de callbacks
            this.topicCallbacks.set(topic, updatedCallbacks);
            resolve(true);
          }
        } else {
          // Eliminar todos los callbacks
          this.topicCallbacks.delete(topic);
          
          // Desuscribirse si está conectado
          if (this.isConnected && this.client) {
            this.client.unsubscribe(topic, {
              onSuccess: () => {
                console.log(`Desuscrito de ${topic}`);
                resolve(true);
              },
              onFailure: (error) => reject(error)
            });
          } else {
            resolve(true);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  publish(topic, message) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.client) {
        reject(new Error('Cliente MQTT no conectado'));
        return;
      }
      
      try {
        const payload = typeof message === 'object' ? JSON.stringify(message) : String(message);
        const mqttMessage = new Paho.Message(payload);
        mqttMessage.destinationName = topic;
        
        this.client.send(mqttMessage);
        console.log(`Mensaje publicado en ${topic}: ${payload}`);
        resolve(true);
      } catch (error) {
        console.error(`Error al publicar en ${topic}:`, error);
        reject(error);
      }
    });
  }

  _onConnectionLost(response) {
    this.isConnected = false;
    console.log(`MQTT Conexión perdida: ${response.errorMessage}`);
    
    // Intentar reconectar después de un retraso
    setTimeout(() => {
      if (!this.isConnected) {
        console.log('Intentando reconectar a MQTT...');
        this.connect().catch(console.error);
      }
    }, 5000);
  }

  _onMessageArrived(message) {
    const topic = message.destinationName;
    let payload = message.payloadString;
    
    // Intentar parsear JSON
    try {
      if (payload.startsWith('{') || payload.startsWith('[')) {
        payload = JSON.parse(payload);
      }
    } catch (error) {
      // Mantener como string si falla el parseo
    }
    
    console.log(`Mensaje recibido en ${topic}:`, typeof payload === 'string' ? payload : 'objeto JSON');
    
    // Llamar a los callbacks para este tópico
    if (this.topicCallbacks.has(topic)) {
      this.topicCallbacks.get(topic).forEach(callback => {
        try {
          callback(payload, topic);
        } catch (error) {
          console.error('Error en callback MQTT:', error);
        }
      });
    }
  }
}

// Crear y exportar singleton
const mqttClient = new MQTTService();
export default mqttClient;