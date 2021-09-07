require("dotenv").config();

const _ = require("lodash");

const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  create: async (req, res) => {
    const { id } = req.params;
    const { post } = req.body;
    const pic = req.file;
    let postPic;
    if (pic) {
      postPic = process.env.API_URL + "/public/post/" + pic.filename;
    }

    try {
      const _post = await Post.create({
        post,
        postPic,
        user: id,
        createdAt: new Date(),
      });
      const userById = await User.findById(id);
      userById.posts.push(_post);
      await userById.save();
      res.status(200).json(_post);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  find: async (req, res) => {
    try {
      const _post = await Post.find();
      if (_post && _post.length > 0 ) {
        const newPost = [];
        let counter = 0;
        _post.forEach(async (post, index, array) => {
          const singlePost = await Post.findById(post._id).populate("user");
          const user = await singlePost.user;
          newPost.push({
            ...singlePost._doc,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              profilePicture: user.profilePicture,
            },
          });
          counter++;
          if (counter === array.length) {
            const sortPost = _.sortBy(newPost, "createdAt");
            res.status(200).json(sortPost);
          }
        });
      }  else{
        res.status(400).json({message: "No post"})
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  like: async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    if (type) {
      if (type === 1 || type === -1) {
        try {
          const _post = await Post.findOneAndUpdate(
            { _id: id },
            { $inc: { likes: type } },
            {
              new: true,
            }
          );
          res.status(200).json(_post);
        } catch (err) {
          res.status(400).json(err);
        }
      } else {
        res
          .status(400)
          .json({ message: "type value should be either 1 or -1" });
      }
    } else {
      res.status(400).json({ error: "Path `type` is required" });
    }
  },
  deletePost: async (req, res)=>{
      const {id} = req.params
      
      try{
        const singlePost = await Post.findById(id);
        if(singlePost){
          const userId = singlePost.user
          await  User.findOneAndUpdate({_id:userId}, {$pull:{posts: id}}, {new:true})
          const delPost = await Post.deleteOne({_id: id})
          if(delPost.ok === 1){
            res.status(200).json({message:"Successfully deleted post"})
          }else{
            res.status(400).json({message:"Error occured"})
          }
        }
        else{
          res.status(400).json({message:"No post found"})
        }
      }catch(err){  
        res.status(400).json(err)
      }
  }
};
