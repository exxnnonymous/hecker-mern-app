const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    post: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postPic: { type: String },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
