const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a transaction
router.post('/', async (req, res) => {
  const transaction = new Transaction({
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category
  });
  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get a transaction by ID
router.get('/:id', getTransaction, (req, res) => {
  res.json(res.transaction);
});

// update a transaction
router.patch('/:id', getTransaction, async (req, res) => {
  if (req.body.description != null) {
    res.transaction.description = req.body.description;
  }
  if (req.body.amount != null) {
    res.transaction.amount = req.body.amount;
  }
  if (req.body.date != null) {
    res.transaction.date = req.body.date;
  }   
  if (req.body.category != null) {
    res.transaction.category = req.body.category;
  }
  try {
    const updatedTransaction = await res.transaction.save();
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a transaction
router.delete('/:id', getTransaction, async (req, res) => {
  try {
    await res.transaction.remove();
    res.json({ message: 'Deleted Transaction' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get transaction by ID
async function getTransaction(req, res, next) {
  let transaction;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (transaction == null) {
      return res.status(404).json({ message: 'Cannot find transaction' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.transaction = transaction;
  next();
}

module.exports = router;
