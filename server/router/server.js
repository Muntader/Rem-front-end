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

router.get("/", async (req, res, next) => {
  const list = await getServer.get();
  if (list.length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: list });
});

router.delete("/delete/:id", async (req, res, next) => {
  const message = await getServer.delete(req.params.id);

  res.json({ code: 200, data: "Successful deleted id:" + req.params.id });
});

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
