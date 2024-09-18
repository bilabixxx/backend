const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "Il parametro MONGO_URI non è definito nelle variabili d'ambiente"
      );
    }

    await mongoose.connect(mongoUri); // Nessuna opzione aggiuntiva necessaria

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Errore di connessione:", error.message);
    process.exit(1); // Uscita in caso di errore
  }
};

module.exports = connectDB;
