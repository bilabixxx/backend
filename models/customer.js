const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Il nome è obbligatorio"],
    minlength: [3, "Il nome deve essere lungo almeno 3 caratteri"],
  },
  email: {
    type: String,
    required: [true, "L'email è obbligatoria"],
    match: [/\S+@\S+\.\S+/, "Email non valida"],
  },
  phone: {
    type: Number,
    required: [true, "Il numero di telefono è obbligatorio"],
  },
  // Dati di fatturazione
  billingAddress: {
    street: { type: String, required: [true, "La via è obbligatoria"] },
    city: { type: String, required: [true, "La città è obbligatoria"] },
    postalCode: {
      type: Number,
      required: [true, "Il codice postale è obbligatorio"],
    },
    country: { type: String, required: [true, "Il paese è obbligatorio"] },
  },
  taxCode: {
    type: String,
    validate: {
      validator: function (v) {
        return v || this.vatNumber; // Valida solo se taxCode è presente o vatNumber è presente
      },
      message: "O il codice fiscale o la partita IVA è obbligatoria.",
    },
  },
  vatNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return v || this.taxCode; // Valida solo se vatNumber è presente o taxCode è presente
      },
      message: "O il codice fiscale o la partita IVA è obbligatoria.",
    },
  },
  companyName: {
    type: String,
    required: false,
    default: null,
  },
});

// Middleware per verificare che almeno uno dei due campi sia presente
customerSchema.pre("validate", function (next) {
  if (!this.taxCode && !this.vatNumber) {
    this.invalidate(
      "taxCode",
      "O il codice fiscale o la partita IVA è obbligatoria."
    );
    this.invalidate(
      "vatNumber",
      "O il codice fiscale o la partita IVA è obbligatoria."
    );
  }
  next();
});

module.exports = mongoose.model("Customer", customerSchema);
