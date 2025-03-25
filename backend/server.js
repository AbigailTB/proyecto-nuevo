const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const mqtt = require('mqtt');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Inicializar WebSockets
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Cliente conectado a WebSockets');

    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Configurar conexión a MQTT (si usas IoT con MQTT)
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com'); // Cambia por tu broker MQTT

mqttClient.on('connect', () => {
    console.log('Conectado a MQTT');
    mqttClient.subscribe('iot/datos');
});

mqttClient.on('message', (topic, message) => {
    console.log(`Mensaje MQTT recibido: ${message.toString()}`);
    io.emit('datos-iot', message.toString()); // Enviar datos a WebSockets
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`
    ============================================
    🚀  Servidor ejecutándose en el puerto ${PORT}
    📅  ${new Date().toLocaleString()}
    ============================================
  `);
});

// Manejo de errores
server.on('error', (error) => {
    console.error('Error en el servidor:', error);
    process.exit(1);
});
