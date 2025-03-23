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