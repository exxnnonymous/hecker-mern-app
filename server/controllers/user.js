const User = require("../models/user");

module.exports = {
  find: async (req, res) => {
    try {
      const _user = await User.find();
      res.status(200).json(_user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  postByUser: async (req, res) => {
    const { id } = req.params;
    try {
      const _user = await User.findById(id).populate("posts");
      if (_user) {
        res.status(200).json(_user.posts);
      } else {
        res.status(400).json({ message: "Invalid user id !" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addProfilePic: async (req, res) => {
    const file = req.file;
    const body = req.body;
    res.json({ msg: "hello", file, body });
  },
};
