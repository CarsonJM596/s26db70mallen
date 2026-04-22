const mongoose = require("mongoose");

const costumeSchema = mongoose.Schema({
  costume_type: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  size: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    min: 1,
    max: 1000
  }
});

module.exports = mongoose.model("Costume", costumeSchema);