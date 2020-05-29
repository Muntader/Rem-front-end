const express = require("express");
const router = express.Router();
const jpv = require("jpv");

// Import server collection
const serversModel = require("../database/models/templates");
const getServer = new serversModel();
// Validate pattern
const pattern = {
  name: "(string)",
  description: "(string)"
};

router.get("/", async (req, res, next) => {
  const list = await getServer.get();
  if (list.length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: list });
});

router.post("/create", async (req, res, next) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    res.json("error");
    return;
  }

  var insertServer = new serversModel(
    req.body.name,
    req.body.description,
    req.body.template
  );
  insertServer.insert();

  res.json([{ code: 200, message: "Successful created template" }]);
});

module.exports = router;
