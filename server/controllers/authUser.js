const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    const { email, password, name } = req.body;
    const pic = req.file;
    try {
      const _foundUser = await User.findOne({ email: email });
      if (_foundUser) {
        res
          .status(400)
          .json({ message: "This email has already been registered" });
      } else {
        try {
          let profilePicture;
          if (pic) {
            profilePicture = `https://exo-hecker.herokuapp.com/public/profilepic/${pic.filename}`;
          } else {
            profilePicture =
              "images/default-profile-male.png";
          }
          const _user = await User.create({
            name,
            email,
            profilePicture,
            password,
            createdAt: new Date(),
          });

          const token = jwt.sign(
            { _id: _user._id },
            process.env.JWT_ACCESS_SECRET
          );

          res.status(200).json({
            token,
            user: {
              _id: _user._id,
              name: _user.name,
              email: _user.email,
              profilePicture: _user.profilePicture,
            },
          });
        } catch (error) {
          res.status(400).json(error);
        }
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const _user = await User.findOne({ email: email });
      if (_user) {
        if (_user.authenticate(password)) {
          const token = jwt.sign(
            { _id: _user._id },
            process.env.JWT_ACCESS_SECRET
          );

          const { _id, name, email, profilePicture } = _user;

          res.status(200).json({
            token,
            user: {
              _id,
              name,
              email,
              profilePicture,
            },
          });
        } else {
          return res.status(400).json({
            message: "Incorrect Password",
          });
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
