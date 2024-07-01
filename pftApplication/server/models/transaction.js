/*
    This is a simple first model to make this project work.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This schema is a first draft and will be improved later
const TransactionSchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
