import { API_URL } from '@env';

const API_URL = 'http://192.168.33.46:5000';

const client = {
  async get(endpoint) {
    try {
      console.log(`Fetching from: ${API_URL}${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      if (!response.ok) {
        // Maneja errores de respuesta HTTP
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en solicitud GET:', error);
      // Puedes personalizar el manejo de errores aquí
      throw error;
    }
  },

  async post(endpoint, body) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error en solicitud POST:', error);
      throw error;
    }
  },
};

export default client;