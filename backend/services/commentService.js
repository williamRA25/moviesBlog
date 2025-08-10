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

async function updateComment(id, data, user) {
  const comment = await Comment.findById(id).lean();
  if (!comment) {
    return { error: { message: "Comment not found", status: 404 } };
  }

  if (
    comment.author.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    return {
      error: { message: "Not authorized to update this comment", status: 403 },
    };
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { content: data.content },
    { new: true }
  );

  return { comment: updatedComment };
}

async function deleteComment(id, user) {
  const comment = await Comment.findById(id);
  if (!comment) {
    return { error: { message: "Comment not found", status: 404 } };
  }

  if (
    comment.author.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    return {
      error: { message: "Not authorized to delete this comment", status: 403 },
    };
  }

  await Comment.findByIdAndDelete(id);
  return {};
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};
