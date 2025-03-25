// frontend/database/config.js
import { MONGODB_URI, PORT, JWT_SECRET, MQTT_BROKER } from '@env';

export default {
  mongoURI: MONGODB_URI || 'mongodb://localhost:27017/tienda_persianas',
  port: PORT || 5000,
  jwtSecret: JWT_SECRET || 'default_jwt_secret',
  apiUrl: __DEV__ 
    ? 'http://192.168.33.46:5000/api' // URL de desarrollo (reemplaza con tu IP local)
    : 'https://tu-servidor-produccion.com/api', // URL de producción
  mqttBroker: MQTT_BROKER || 'mqtt://broker.hivemq.com'
};