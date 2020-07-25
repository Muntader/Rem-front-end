const express = require("express");
const router = express.Router();
const jpv = require("jpv");
const restrictMiddleware = require("../auth/restrictMiddleware");

// Import server collection
const templatesModel = require("../database/models/templates");
const getTemplate = new templatesModel();
// Validate pattern
const pattern = {
  name: "(string)",
  description: "(string)"
};

router.get("/",restrictMiddleware, async (req, res, next) => {
  const list = await getTemplate.get();
  if (list.length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: list });
});

// Delete template
router.delete("/delete/:id",restrictMiddleware, async (req, res, next) => {
  const message = await getTemplate.delete(req.params.id);

  res.json({ code: 200, data: "Successful deleted id:" + req.params.id });
});

// Get template item
router.get("/edit/:id",restrictMiddleware, async (req, res, next) => {
  const info = await getTemplate.getItem(req.params.id);

  if (info[0].length === 0) {
    return res.json({ code: 204, data: null });
  }

  res.json({ code: 200, data: info[0] });
});

// Update template
router.post("/update",restrictMiddleware, async (req, res, next) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    return res.status(500).json({ code: 500, message: "Error wrong data" });
  }

  var updateTemplate = new templatesModel(
    req.body.name,
    req.body.description,
    req.body.template,
    req.body.id
  );

  console.log(updateTemplate)

  updateTemplate.update();

  res.json({
    code: 200,
    message: `successful update template id: ${req.body.id}`
  });
});

router.post("/create",restrictMiddleware, async (req, res, next) => {
  const valid = jpv.validate(req.body, pattern);

  if (!valid) {
    return res.json(500, { code: 500, message: "Error wrong data" });
  }

  var insertTemplate = new templatesModel(
    req.body.name,
    req.body.description,
    req.body.template
  );

  insertTemplate.insert();

  res.json([{ code: 200, message: "Successful created template" }]);
});

module.exports = router;
