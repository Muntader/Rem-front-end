const express = require("express");
const router = express.Router();
const jpv = require("jpv");
const restrictMiddleware = require("../auth/restrictMiddleware");

// Import server collection
const serversModel = require("../database/models/servers");
const getServer = new serversModel();
// Validate pattern
const pattern = {
  name: "(string)"
  // domain: "[url]"
};

// Get server list
router.get("/",restrictMiddleware, async (req, res, next) => {
  const list = await getServer.get();
  if (list.length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: list });
});

// Get server item
router.get("/edit/:id",restrictMiddleware, async (req, res, next) => {
  const info = await getServer.getItem(req.params.id);

  if (info[0].length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: info[0] });
});

// Update server
router.post("/update",restrictMiddleware, async (req, res, next) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    return res.status(500).json({ code: 500, message: "Error wrong data" });
  }

  var insertServer = new serversModel(
    req.body.name,
    req.body.api_key,
    req.body.domain,
    req.body.cloud_domain,
    req.body.id
  );
  insertServer.update();

  res.json({
    code: 200,
    message: `successful update server id: ${req.body.id}`
  });
});

// Delete server
router.delete("/delete/:id",restrictMiddleware, async (req, res) => {
  const message = await getServer.delete(req.params.id);

  res.json({ code: 200, data: "Successful deleted id:" + req.params.id });
});

// Create server
router.post("/create",restrictMiddleware, async (req, res) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    return res.json(500, { code: 500, message: "Error wrong data" });
  }

  var insertServer = new serversModel(
    req.body.name,
    req.body.api_key,
    req.body.domain,
    req.body.cloud_domain
  );
  insertServer.insert();

  res.json({ code: 200, message: "successful add server" });
});

module.exports = router;
