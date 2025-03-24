import React, { useEffect, useState } from 'react';

const MqttComponent = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [topic, setTopic] = useState('mi/topic/test');
  const [payload, setPayload] = useState('');

  // Conectar al WebSocket del backend
  useEffect(() => {
<<<<<<< HEAD
    const websocket = new WebSocket('ws://192.168.33.46:5000');
=======
    const websocket = new WebSocket('ws://localhost:8081');
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
    setWs(websocket);

    // Escuchar mensajes del backend
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, `Topic: ${data.topic}, Mensaje: ${data.payload}`]);
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      websocket.close();
    };
  }, []);

  // Enviar mensaje al backend
  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = { topic, payload };
      ws.send(JSON.stringify(message));
      setPayload(''); // Limpiar input
    }
  };

  return (
    <div>
      <h1>Conexión MQTT con React</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic"
      />
      <input
        type="text"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        placeholder="Mensaje"
      />
      <button onClick={sendMessage}>Enviar</button>
      <h2>Mensajes recibidos:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MqttComponent;