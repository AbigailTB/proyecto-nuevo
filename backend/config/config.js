module.exports = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
    mqttBroker: process.env.MQTT_BROKER || 'mqtt://broker.hivemq.com',
};