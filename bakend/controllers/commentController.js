const commentService = require("../services/commentService");

async function create(req, res) {
  try {
    const comment = await commentService.createComment(req.body);
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
  const comment = await commentService.updateComment(req.params.id, req.body);
  res.json(comment);
}

async function remove(req, res) {
  await commentService.deleteComment(req.params.id);
  res.status(204).end();
}

module.exports = { create, getAll, getById, update, remove };
