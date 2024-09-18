const errorHandler = (err, req, res, next) => {
    console.error(err.message);
  
    // Se l'errore è di tipo di MongoDB
    if (err.name === 'MongoError') {
      return res.status(500).json({ message: 'Errore del database', error: err.message });
    }
  
    // Gestione degli errori generali
    res.status(500).json({
      message: 'Errore del server',
      error: err.message,
    });
  };
  
  module.exports = errorHandler;
  