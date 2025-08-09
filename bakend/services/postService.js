const Post = require("../models/Post");

async function createPost(data) {
  return await Post.create(data);
}

async function getPosts() {
  return await Post.find().populate("author category comments");
}

async function getPostById(id) {
  return await Post.findById(id).populate("author category comments");
}

async function updatePost(id, data) {
  return await Post.findByIdAndUpdate(id, data, { new: true });
}

async function deletePost(id) {
  return await Post.findByIdAndDelete(id);
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
