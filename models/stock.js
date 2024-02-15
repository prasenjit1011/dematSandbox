const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const stockSchema = new Schema({
  sid:{
    type: String,
    required: true
  },
  share_name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  sold_qty: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('demat', stockSchema);