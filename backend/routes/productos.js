const express = require('express');
const router = express.Router();
const Producto = require('../models/productos');
const auth = require('../middleware/auth');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    // Filtros opcionales
    const { category, brand, minPrice, maxPrice } = req.query;
    
    let filter = {};
    
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    const productos = await Producto.find(filter);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// Obtener un producto específico
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
});

// Buscar productos
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    
    const productos = await Producto.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
        { brand: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    
    res.json(productos);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ message: 'Error al buscar productos', error: error.message });
  }
});

module.exports = router;