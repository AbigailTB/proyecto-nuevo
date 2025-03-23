const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // MongoDB error de ID inválido
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID de recurso inválido' });
    }
  
    // MongoDB error de validación
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
  
    // MongoDB error de duplicado
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Ya existe un registro con ese valor' });
    }
  
    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
  
    // Error de JWT expirado
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
  
    // Error genérico
    res.status(err.statusCode || 500).json({
      message: err.message || 'Error del servidor',
    });
  };
  
  module.exports = errorHandler;