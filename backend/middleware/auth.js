const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado' });
    }
    
    // Verificar token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
    req.user = decodedToken; // Añadir usuario decodificado a la request
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Acceso denegado: Token inválido' });
  }
};