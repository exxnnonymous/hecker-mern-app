const express = require("express");

const { find, postByUser, addProfilePic } = require("../controllers/user");
const { requireSignIn } = require("../middleware/authUser");

const router = express.Router();

router.get("/find", requireSignIn, find);
router.get("/find/post/:id", requireSignIn, postByUser);

module.exports = router;
