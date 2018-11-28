const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
//We will modify this to hold inventory items
const SoldItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number,
    default: 0
  },
  sellPrice: {
    type: Number,
    default: 0
  },
  barcode: {
    type: String,
    default: ""
  },
});

module.exports = SoldItem = mongoose.model("soldItem", SoldItemSchema);
