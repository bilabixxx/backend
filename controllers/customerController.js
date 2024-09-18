const Customer = require("../models/customer");

// Creazione di un nuovo cliente
const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ottenere tutti i clienti
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Errore durante il recupero dei clienti" });
  }
};

// Ottenere un cliente specifico per ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Errore durante il recupero del cliente" });
  }
};

// Aggiornamento di un cliente
const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancellazione di un cliente
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }
    res.status(200).json({ message: "Cliente cancellato con successo" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Errore durante la cancellazione del cliente" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
