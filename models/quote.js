const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Il cliente è obbligatorio"],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: {
        type: String,
        required: [true, "Il nome del prodotto è obbligatorio"],
      },
      price: {
        type: Number,
        required: [true, "Il prezzo è obbligatorio"],
        min: [0, "Il prezzo deve essere positivo"],
      },
      iva: {
        type: Number,
        min: [0, "L'IVA non può essere negativa"],
        max: [22, "L'IVA non può essere superiore al 22%"],
      },
      quantity: {
        type: Number,
        min: [1, "La quantità non può essere negativa"],
      },
    },
  ],
  discount: {
    type: Number,
    min: [0, "Lo sconto non può essere negativo"], // Corretto il min a 0
  },
  discountType: {
    type: String,
    enum: ["percent", "euro"], // Definisce i valori accettabili per il tipo di sconto
    default: "percent", // Imposta un valore predefinito, se necessario
  },
  totalPrice: {
    type: Number,
    required: [true, "Il prezzo totale è obbligatorio"],
  },
});

module.exports = mongoose.model("Quote", quoteSchema);
