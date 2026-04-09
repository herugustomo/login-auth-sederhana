const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Selamat datang di dashboard",
    user: req.user,
  });
});

module.exports = router;
