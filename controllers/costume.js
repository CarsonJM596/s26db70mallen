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

exports.costume_view_all_Page = async function(req, res) {
  try {
    let theCostumes = await Costume.find();

    res.render('costumes', {
      title: 'Costume Search Results',
      results: theCostumes
    });

  } catch(err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

exports.costume_create_post = async function(req, res) {
  console.log(req.body);

  let document = new Costume();

  // Pull data from request body (JSON)
  document.costume_type = req.body.costume_type;
  document.size = req.body.size;
  document.cost = req.body.cost;

  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

exports.costume_detail = async function(req, res) {
  console.log("detail " + req.params.id);

  try {
    const result = await Costume.findById(req.params.id);
    
    if (!result) {
      res.status(404).send({ error: "Costume not found" });
      return;
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: `Error retrieving document for id ${req.params.id}` });
  }
};

exports.costume_update_put = async function(req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

  try {
    let toUpdate = await Costume.findById(req.params.id);

    if (!toUpdate) {
      res.status(404).send({ error: "Costume not found" });
      return;
    }

    // Update fields
    if (req.body.costume_type)
      toUpdate.costume_type = req.body.costume_type;

    if (req.body.cost)
      toUpdate.cost = req.body.cost;

    if (req.body.size)
      toUpdate.size = req.body.size;

    let result = await toUpdate.save();

    res.send(result);

  } catch (err) {
    console.error(err); 
    res.status(500).send({ error: `Update for id ${req.params.id} failed` });
  }
};

exports.costume_delete = async function(req, res) {
  console.log("delete " + req.params.id);

  try {
    const result = await Costume.findByIdAndDelete(req.params.id);

    // If nothing was deleted
    if (!result) {
      res.status(404).send({ error: "Costume not found" });
      return;
    }

    console.log("Removed " + result);
    res.send(result);

  } catch (err) {
    res.status(500);
    res.send({ error: `Error deleting ${err}` });
  }
};

exports.costume_view_one_Page = async function(req, res) {
  console.log("single view for id " + req.query.id);

  try {
    let result = await Costume.findById(req.query.id);

    if (!result) {
      res.render('costumedetail', {
        title: 'Costume Detail',
        toShow: null
      });
      return;
    }

    res.render('costumedetail', {
      title: 'Costume Detail',
      toShow: result
    });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
 
exports.costume_create_Page = function(req, res) {
  console.log("create view");

  try {
    res.render('costumecreate', {
      title: 'Costume Create'
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.costume_update_Page = async function(req, res) {
  console.log("update view for item " + req.query.id);

  try {
    let result = await Costume.findById(req.query.id);

    if (!result) {
      res.render('costumeupdate', {
        title: 'Costume Update',
        toShow: null
      });
      return;
    }

    res.render('costumeupdate', {
      title: 'Costume Update',
      toShow: result
    });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.costume_delete_Page = async function(req, res) {
  console.log("Delete view for id " + req.query.id);

  try {
    let result = await Costume.findById(req.query.id);

    if (!result) {
      res.render('costumedelete', {
        title: 'Costume Delete',
        toShow: null
      });
      return;
    }

    res.render('costumedelete', {
      title: 'Costume Delete',
      toShow: result
    });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};