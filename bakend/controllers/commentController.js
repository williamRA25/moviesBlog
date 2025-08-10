const commentService = require("../services/commentService");

async function create(req, res) {
  try {
    const comment = await commentService.createComment({
      ...req.body,
      author: req.user._id,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAll(req, res) {
  const comments = await commentService.getComments();
  res.json(comments);
}

async function getById(req, res) {
  const comment = await commentService.getCommentById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  res.json(comment);
}

async function update(req, res) {
  try {
    const { comment, error } = await commentService.updateComment(
      req.params.id,
      req.body,
      req.user
    );
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { error } = await commentService.deleteComment(
      req.params.id,
      req.user
    );
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }
    res.status(204).json({
      message: "comment delete successfull",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { create, getAll, getById, update, remove };
