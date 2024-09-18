const Quote = require("../models/quote");

// Creare un preventivo
const createQuote = async (req, res) => {
  try {
    const newQuote = await Quote.create(req.body);
    const populatedQuote = await Quote.findById(newQuote._id)
      .populate("customer")
      .populate("products.product");
    res.status(201).json(populatedQuote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ottenere tutti i preventivi
const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate({
        path: "customer",
        select: "name email phone billingAddress taxCode vatNumber companyName", // Seleziona i campi desiderati
      })
      .populate({
        path: "products.product",
        select: "name price iva", // Seleziona i campi del prodotto necessari
      });

    res.status(200).json(quotes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Errore durante il recupero dei preventivi" });
  }
};

// Ottenere un preventivo per ID
const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate("customer")
      .populate("products.product");
    if (!quote) {
      return res.status(404).json({ error: "Preventivo non trovato" });
    }
    res.status(200).json(quote);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Errore durante il recupero del preventivo" });
  }
};

// Aggiornare un preventivo
const updateQuote = async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedQuote) {
      return res.status(404).json({ error: "Preventivo non trovato" });
    }
    res.status(200).json(updatedQuote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminare un preventivo
const deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ error: "Preventivo non trovato" });
    }
    res.status(200).json({ message: "Preventivo eliminato con successo" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Errore durante la cancellazione del preventivo" });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
};
