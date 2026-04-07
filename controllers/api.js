exports.api = function(req, res) {
  res.send([
    {
      resource: "costumes",
      verbs: ["GET", "POST", "PUT", "DELETE"]
    }
  ]);
};