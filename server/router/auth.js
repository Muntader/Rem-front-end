const express = require("express");
const router = express.Router();

// Auth login
router.post("/login", async (req, res, next) => {
  if (req.body.key === "5f7dd8dacb6c11ea87d00242ac130003") {
    req.session.access_key =  "5f7dd8dacb6c11ea87d00242ac130003"
    return res.json({ access_key: "5f7dd8dacb6c11ea87d00242ac130003" })
  }
  res.status(401).json({ message: 'Bad credentials' })
});

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.access_key
  res.json({ ok: true })
})


module.exports = router;
