const express = require("express");
const router = express.Router();
const jpv = require("jpv");

// Import server collection
const serversModel = require("../database/models/servers");
const getServer = new serversModel();
// Validate pattern
const pattern = {
  name: "(string)",
  domain: "[url]"
};

// Get server list
router.get("/", async (req, res, next) => {
  const list = await getServer.get();
  if (list.length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: list });
});

// Get server item
router.get("/edit/:id", async (req, res, next) => {
  const info = await getServer.getItem(req.params.id);

  if (info[0].length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: info[0] });
});

// Update server
router.post("/update", async (req, res, next) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    return res.status(401).json({ code: 401, message: "Error wrong data" });
  }

  var insertServer = new serversModel(
    req.body.name,
    req.body.api_key,
    req.body.domain,
    req.body.id
  );
  insertServer.update();

  res.json({
    code: 200,
    message: `successful update server id: ${req.body.id}`
  });
});

// Delete server
router.delete("/delete/:id", async (req, res, next) => {
  const message = await getServer.delete(req.params.id);

  res.json({ code: 200, data: "Successful deleted id:" + req.params.id });
});

// Create server
router.post("/create", async (req, res, next) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    return res.json(401, { code: 401, message: "Error wrong data" });
  }

  var insertServer = new serversModel(
    req.body.name,
    req.body.api_key,
    req.body.domain
  );
  insertServer.insert();

  res.json({ code: 200, message: "successful add server" });
});

module.exports = router;
