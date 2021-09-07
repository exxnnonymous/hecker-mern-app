const express = require("express");
const { signup, signin } = require("../controllers/authUser");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profilepic/");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/signup", upload.single("profilePicture"), signup);
router.post("/signin", signin);

module.exports = router;
