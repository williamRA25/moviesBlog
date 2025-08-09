const Category = require("../models/Category");

async function createCategory(data) {
  return await Category.create(data);
}

async function getCategories() {
  return await Category.find();
}

async function getCategoryById(id) {
  return await Category.findById(id);
}

async function updateCategory(id, data) {
  return await Category.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCategory(id) {
  return await Category.findByIdAndDelete(id);
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
