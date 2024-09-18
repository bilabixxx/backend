const Product = require("../models/product");

// Creare un nuovo prodotto
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ottenere tutti i prodotti
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Errore durante il recupero dei prodotti" });
  }
};

// Ottenere un prodotto per ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Errore durante il recupero del prodotto" });
  }
};

// Aggiornare un prodotto
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminare un prodotto
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }
    res.status(200).json({ message: "Prodotto eliminato con successo" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Errore durante la cancellazione del prodotto" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
