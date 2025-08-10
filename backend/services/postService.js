const Post = require("../models/Post");
const User = require("../models/User");

async function createPost(data) {
  return await Post.create(data);
}

async function getPosts() {
  return await Post.find().populate("author category comments");
}

async function getPostById(id) {
  return await Post.findById(id).populate("author category comments");
}

async function updatePost(id, data, user) {
  const post = await Post.findById(id).lean();
  if (!post) {
    return { message: "Post not found", status: 403 };
  }

  if (post.author.toString() !== user._id.toString() && user.role !== "admin") {
    return { message: "Not authorized to update this post", status: 403 };
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title: data.title,
      content: data.content,
    },
    { new: true }
  );

  return { post: updatedPost };
}

async function deletePost(id, user) {
  const post = await Post.findById(id);
  if (!post) {
    return { message: "Post not found", status: 403 };
  }

  if (post.author.toString() !== user._id.toString() && user.role !== "admin") {
    return { message: "Not authorized to delete this post", status: 403 };
  }
  return await Post.findByIdAndDelete(id);
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
