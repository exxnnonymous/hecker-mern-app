const express = require("express");
const multer = require("multer");
const shortid = require("shortid");

const { create, find, like, deletePost } = require("../controllers/posts");
const { requireSignIn } = require("../middleware/authUser");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/post/");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/find", requireSignIn, find);
router.post("/create/:id", requireSignIn, upload.single("postPic"), create);
router.post("/like/:id", requireSignIn, like);
router.delete("/delete/:id", requireSignIn, deletePost )

module.exports = router;
