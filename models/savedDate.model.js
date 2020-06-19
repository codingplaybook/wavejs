const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedDateSchema = new Schema ({
  savedDate: { type: Number, required: true }
},
{
  timestamps: true
});

const SavedDate = mongoose.model('SavedDate', savedDateSchema);
module.exports = SavedDate;