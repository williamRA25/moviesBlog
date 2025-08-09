const categoryService = require("../services/categoryService");

async function create(req, res) {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAll(req, res) {
  const categories = await categoryService.getCategories();
  res.json(categories);
}

async function getById(req, res) {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
}

async function update(req, res) {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body
  );
  res.json(category);
}

async function remove(req, res) {
  await categoryService.deleteCategory(req.params.id);
  res.status(204).end();
}

module.exports = { create, getAll, getById, update, remove };
