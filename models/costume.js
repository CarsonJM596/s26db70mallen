const mongoose = require("mongoose");

const costumeSchema = mongoose.Schema({
  costume_type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    min: [1, "Cost must be at least 1"],
    max: [1000, "Cost must be under 1000"]
  }
});

module.exports = mongoose.model("Costume", costumeSchema);