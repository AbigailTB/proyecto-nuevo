import apiClient from './client';

// Obtener todos los productos
export const getProductos = async (filters = {}) => {
  try {
    const response = await apiClient.get('/productos', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener un producto por ID
export const getProducto = async (id) => {
  try {
    const response = await apiClient.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Buscar productos
export const searchProductos = async (query) => {
  try {
    const response = await apiClient.get(`/productos/search/${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getProductos,
  getProducto,
  searchProductos
};