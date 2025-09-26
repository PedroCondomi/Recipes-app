const { Router } = require("express");
const verifyAuth = require("../middlewares/googleauth");
const router = Router();

router.get("/me", verifyAuth, (req, res) => {
  const { displayName, image, email } = req.user;
  res.json({ displayName, image, email });
});

module.exports = router;
