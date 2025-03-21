import apiClient from './client';

// Obtener todas las programaciones
export const getProgramaciones = async () => {
  try {
    const response = await apiClient.get('/programaciones');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener programaciones por persiana
export const getProgramacionesByPersiana = async (persianaId) => {
  try {
    const response = await apiClient.get(`/programaciones/persiana/${persianaId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener una programación por ID
export const getProgramacion = async (id) => {
  try {
    const response = await apiClient.get(`/programaciones/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Crear una nueva programación
export const createProgramacion = async (programacion) => {
  try {
    const response = await apiClient.post('/programaciones', programacion);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Actualizar una programación
export const updateProgramacion = async (id, programacion) => {
  try {
    const response = await apiClient.put(`/programaciones/${id}`, programacion);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Eliminar una programación
export const deleteProgramacion = async (id) => {
  try {
    const response = await apiClient.delete(`/programaciones/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Activar/desactivar una programación
export const toggleProgramacion = async (id) => {
  try {
    const response = await apiClient.put(`/programaciones/${id}/toggle`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getProgramaciones,
  getProgramacionesByPersiana,
  getProgramacion,
  createProgramacion,
  updateProgramacion,
  deleteProgramacion,
  toggleProgramacion
};