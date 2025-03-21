import apiClient from './client';

// Enviar mensaje de contacto
export const enviarMensaje = async (mensaje) => {
  try {
    const response = await apiClient.post('/contacto', mensaje);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  enviarMensaje
};