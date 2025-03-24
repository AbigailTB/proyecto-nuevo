import { API_URL } from '@env';

<<<<<<< HEAD
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
=======
const client = {
  async get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async post(endpoint, body) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json();
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
  },
};

export default client;