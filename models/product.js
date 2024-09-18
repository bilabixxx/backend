const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Il nome del prodotto è obbligatorio"],
      minlength: [
        3,
        "Il nome del prodotto deve essere lungo almeno 3 caratteri",
      ],
    },
    description: {
      type: String,
      required: [true, "La desrizione del prodotto è obbligatoria"],
      minlength: [10, "La descrizione deve essere lunga almeno 10 caratteri"],
    },
    price: {
      type: Number,
      required: [true, "Il prezzo è obbligatorio"],
      min: [0, "Il prezzo deve essere positivo"],
    },
    discount: {
      type: Number,
      min: [0, "Lo sconto non può essere negativo"],
      max: [100, "Lo sconto non può essere superiore a 100"],
    },
    iva: {
      type: Number,
      min: [0, "L'IVA non può essere negativa"],
      max: [22, "L'IVA non può essere superiore al 22%"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
