const mongoose = require("mongoose");
const accountTypes = ['CONTA_CORRENTE', 'POUPANÇA', 'INVESTIMENTO'];
const validAccountTypes = (value) => {
  return accountTypes.includes(value);
}

const finances = new mongoose.Schema({
  bankName: {
    type: String,
    required: 'Bank Name is required',
    dropDups: true
  },
  accountType: {
    type: String,
    required: 'Account Type is required',
    validate: [validAccountTypes, `Possible types of accounts: ${accountTypes.join(', ')}`],
    dropDups: true
  },
  name: { type: String, required: 'Name is required' },
  cardLimit: {
    type: Number,
    default: 0
  },
  createdAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('finances', finances);