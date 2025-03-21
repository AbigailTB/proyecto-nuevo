import apiClient from './client';

// Obtener todas las persianas
export const getPersianas = async () => {
  try {
    const response = await apiClient.get('/persianas');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener una persiana por ID
export const getPersiana = async (id) => {
  try {
    const response = await apiClient.get(`/persianas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Crear una nueva persiana
export const createPersiana = async (persiana) => {
  try {
    const response = await apiClient.post('/persianas', persiana);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Actualizar una persiana
export const updatePersiana = async (id, persiana) => {
  try {
    const response = await apiClient.put(`/persianas/${id}`, persiana);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Eliminar una persiana
export const deletePersiana = async (id) => {
  try {
    const response = await apiClient.delete(`/persianas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Actualizar estado de una persiana
export const updateEstadoPersiana = async (id, estado, nivelApertura) => {
  try {
    const response = await apiClient.put(`/persianas/${id}/estado`, { 
      estado, 
      nivelApertura 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getPersianas,
  getPersiana,
  createPersiana,
  updatePersiana,
  deletePersiana,
  updateEstadoPersiana
};