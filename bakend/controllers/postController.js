const postService = require("../services/postService");

async function create(req, res) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAll(req, res) {
  const posts = await postService.getPosts();
  res.json(posts);
}

async function getById(req, res) {
  const post = await postService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
}

async function update(req, res) {
  const post = await postService.updatePost(req.params.id, req.body);
  res.json(post);
}

async function remove(req, res) {
  await postService.deletePost(req.params.id);
  res.status(204).end();
}

module.exports = { create, getAll, getById, update, remove };
