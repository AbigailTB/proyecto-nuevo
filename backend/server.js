<<<<<<< HEAD
// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema y modelo para productos (ejemplo)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});
const Product = mongoose.model('Product', productSchema);

// Endpoint para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: '¡Hola desde el backend!' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// backend/server.js (agrega esto después de definir el modelo Product)
const insertSampleProducts = async () => {
  const existingProducts = await Product.find();
  if (existingProducts.length === 0) {
    const sampleProducts = [
      {
        name: 'Automatización Inteligente',
        description: 'Controla tus dispositivos de manera eficiente y segura.',
        price: 179.99,
        image: 'https://example.com/images/product1.jpg', // Usa una URL real
      },
      {
        name: 'Monitoreo Remoto',
        description: 'Supervisa tu hogar o negocio desde cualquier parte del mundo.',
        price: 212.49,
        image: 'https://example.com/images/product2.jpg',
      },
      {
        name: 'Eficiencia Energética',
        description: 'Optimiza el consumo de energía con tecnología IoT.',
        price: 170.99,
        image: 'https://example.com/images/product3.jpg',
      },
    ];
    await Product.insertMany(sampleProducts);
    console.log('Productos de muestra insertados');
  }
};

// Llama a la función después de conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado a MongoDB');
    insertSampleProducts(); // Inserta productos de prueba
  })
  .catch((err) => console.error('Error al conectar a MongoDB:', err));
=======
const express = require('express');
const mqtt = require('mqtt');
const WebSocket = require('ws');

const app = express();
const port = 3001;

// Conectar al broker Mosquitto en tu IP local
const mqttClient = mqtt.connect('mqtt://192.168.1.72:8081', {
  connectTimeout: 5000, // Tiempo de espera para la conexión (en milisegundos)
});

// Configurar WebSocket para comunicación con el frontend
const wss = new WebSocket.Server({ port: 8080 });

// Manejar la conexión del WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado al WebSocket');

  // Escuchar mensajes desde el frontend
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      // Publicar mensaje en el topic MQTT
      mqttClient.publish(data.topic, data.payload, (err) => {
        if (err) {
          console.error(`Error al publicar en ${data.topic}:`, err);
        } else {
          console.log(`Mensaje publicado en ${data.topic}: ${data.payload}`);
        }
      });
    } catch (error) {
      console.error('Error al parsear el mensaje del WebSocket:', error);
    }
  });

  // Manejar cierre de la conexión WebSocket
  ws.on('close', () => {
    console.log('Cliente desconectado del WebSocket');
  });

  // Manejar errores en el WebSocket
  ws.on('error', (error) => {
    console.error('Error en el WebSocket:', error);
  });
});

// Manejar la conexión al broker MQTT
mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT en 127.0.0.1:1883');
  
  // Opcional: Suscribirse al topic para depuración
  mqttClient.subscribe('persianas/comando', (err) => {
    if (err) {
      console.error('Error al suscribirse al topic:', err);
    } else {
      console.log('Suscrito al topic persianas/comando');
    }
  });
});

// Manejar mensajes recibidos del broker MQTT (opcional, para depuración)
mqttClient.on('message', (topic, message) => {
  console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Manejar errores en la conexión MQTT
mqttClient.on('error', (err) => {
  console.error('Error en la conexión MQTT:', err);
});

// Manejar desconexión del broker MQTT
mqttClient.on('close', () => {
  console.log('Desconectado del broker MQTT');
});

// Iniciar servidor Express
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
>>>>>>> 46cab1a (V 1.0.5 Pyct Implompleto pero ya con rutas)
