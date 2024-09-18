const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const quoteRoutes = require("./routes/quoteRoutes");

dotenv.config();

const app = express();

// Middleware di sicurezza
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(mongoSanitize());
app.use(express.json());
app.use(morgan("combined"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // Limita a 100 richieste per finestra
  message: "Troppe richieste da questo IP, riprova più tardi.",
});
app.use(limiter);

// Rotte
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);

// Middleware per la gestione degli errori
app.use(errorHandler);

// Gestione degli errori
app.use((err, req, res, next) => {
  console.error("Errore:", err.stack);
  res.status(500).json({ error: "Si è verificato un errore inatteso!" });
});

// Connessione al database e avvio del server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server in esecuzione sulla porta ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Impossibile connettersi al database:", error.message);
    process.exit(1); // Uscita se la connessione fallisce
  });
