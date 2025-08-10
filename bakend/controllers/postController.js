const postService = require("../services/postService");

async function create(req, res) {
  try {
    const post = await postService.createPost({
      ...req.body,
      author: req.user._id,
    });
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
  try {
    const { post, error } = await postService.updatePost(
      req.params.id,
      req.body,
      req.user
    );
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { error } = await postService.deletePost(req.params.id, req.user);
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }
    res.status(204).send({
      message: "post delete successfull",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { create, getAll, getById, update, remove };
