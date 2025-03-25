import { API_URL } from '@env';

// URL de API como fallback en caso de que no esté disponible en las variables de entorno
const API_URL_FALLBACK = 'http://192.168.33.46:5000';

const client = {
  async get(endpoint) {
    try {
      const baseUrl = API_URL || API_URL_FALLBACK;
      console.log(`Fetching from: ${baseUrl}${endpoint}`);
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
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
      const baseUrl = API_URL || API_URL_FALLBACK;
      const response = await fetch(`${baseUrl}${endpoint}`, {
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
  
  async put(endpoint, body) {
    try {
      const baseUrl = API_URL || API_URL_FALLBACK;
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'PUT',
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
      console.error('Error en solicitud PUT:', error);
      throw error;
    }
  },
  
  async delete(endpoint) {
    try {
      const baseUrl = API_URL || API_URL_FALLBACK;
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error en solicitud DELETE:', error);
      throw error;
    }
  }
};

export default client;