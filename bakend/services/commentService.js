const Comment = require("../models/Comment");

async function createComment(data) {
  return await Comment.create(data);
}

async function getComments() {
  return await Comment.find().populate("author post");
}

async function getCommentById(id) {
  return await Comment.findById(id).populate("author post");
}

async function updateComment(id, data) {
  return await Comment.findByIdAndUpdate(id, data, { new: true });
}

async function deleteComment(id) {
  return await Comment.findByIdAndDelete(id);
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};
