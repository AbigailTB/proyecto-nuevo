// frontend/database/mqtt/mqttService.js
import { Client, Message } from 'paho-mqtt';

// Configuration for your MQTT broker
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
        reject(error);
      }
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.client && this.isConnected) {
        this.client.disconnect();
        this.isConnected = false;
      }
      resolve(true);
    });
  }

  subscribe(topic, callback) {
    return new Promise((resolve, reject) => {
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
    });
  }

  publish(topic, message) {
    return new Promise((resolve, reject) => {
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