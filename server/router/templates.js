const express = require("express");
const router = express.Router();
const jpv = require("jpv");

// Import server collection
const templatesModel = require("../database/models/templates");
const getTemplate = new templatesModel();
// Validate pattern
const pattern = {
  name: "(string)",
  description: "(string)"
};

router.get("/", async (req, res, next) => {
  const list = await getTemplate.get();
  if (list.length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: list });
});

// Delete template
router.delete("/delete/:id", async (req, res, next) => {
  const message = await getTemplate.delete(req.params.id);

  res.json({ code: 200, data: "Successful deleted id:" + req.params.id });
});

router.post("/create", async (req, res, next) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    return res.json(401, { code: 401, message: "Error wrong data" });
    return;
  }

  var insertServer = new templatesModel(
    req.body.name,
    req.body.description,
    req.body.template
  );
  insertServer.insert();

  res.json([{ code: 200, message: "Successful created template" }]);
});

module.exports = router;
