const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: String, required: true },
  name: String,
  amount: Number,
  narration: String
});

module.exports = mongoose.model('Record', recordSchema);
