const express = require('express');
const {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
} = require('../controllers/quoteController');

const router = express.Router();

// Rotte per gestire i preventivi
router.post('/', createQuote);
router.get('/', getQuotes);
router.get('/:id', getQuoteById);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);

module.exports = router;
