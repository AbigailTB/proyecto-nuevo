import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Paho from 'paho-mqtt';

export default function App() {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    // Configurar el cliente MQTT
    const mqttClient = new Paho.Client('localhost', 9001, 'clientId-' + Math.random().toString(16).substr(2, 8));
    
    // Callbacks
    mqttClient.onConnectionLost = (responseObject) => {
      console.log('Conexión perdida: ' + responseObject.errorMessage);
    };

    mqttClient.onMessageArrived = (message) => {
      console.log('Mensaje recibido: ' + message.payloadString);
      setReceivedMessage(message.payloadString);
    };

    // Conectar al broker
    mqttClient.connect({
      useSSL: false,
      onSuccess: () => {
        console.log('Conectado al broker');
        mqttClient.subscribe('test/topic');
      },
      onFailure: (err) => {
        console.log('Error al conectar: ', err);
      },
    });

    setClient(mqttClient);

    // Limpieza al desmontar
    return () => {
      if (mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (client && client.isConnected()) {
      const mqttMessage = new Paho.Message(message);
      mqttMessage.destinationName = 'test/topic';
      client.send(mqttMessage);
      setMessage(''); // Limpiar el input
    } else {
      console.log('No está conectado');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Mensaje recibido: {receivedMessage}</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Escribe un mensaje"
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});