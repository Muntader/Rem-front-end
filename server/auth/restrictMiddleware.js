module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token !== "5f7dd8dacb6c11ea87d00242ac130003") {
      res.status(401).json({ message: 'Bad credentials' })
    } else {
      next();
    }
  } catch {
    res.status(401).json({ message: 'Bad credentials' })

  }
};
