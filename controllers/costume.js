const Costume = require('../models/costume');

// List all costumes
exports.costume_list = async function(req, res) {
  try {
    const result = await Costume.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get one costume by ID
exports.costume_detail = async function(req, res) {
  try {
    const result = await Costume.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a costume
exports.costume_create_post = async function(req, res) {
  try {
    let document = new Costume({
      costume_type: req.body.costume_type,
      size: req.body.size,
      cost: req.body.cost
    });

    const result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a costume
exports.costume_delete = async function(req, res) {
  try {
    const result = await Costume.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a costume
exports.costume_update_put = async function(req, res) {
  try {
    let toUpdate = await Costume.findById(req.params.id);

    if (req.body.costume_type) toUpdate.costume_type = req.body.costume_type;
    if (req.body.size) toUpdate.size = req.body.size;
    if (req.body.cost) toUpdate.cost = req.body.cost;

    const result = await toUpdate.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};