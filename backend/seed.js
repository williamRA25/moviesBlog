require("dotenv").config();

const authService = require("./services/authService");
const categoryService = require("./services/categoryService");
const postService = require("./services/postService");
const commentService = require("./services/commentService");

const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Category = require("./models/Category");
const User = require("./models/User");

const postsData = require("./data.json");
const usersData = require("./users.json");

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedDatabase() {
  // 1️⃣ Crear usuarios desde users.json
  console.log("👤 Creando usuarios...");
  let createdUsers = [];
  for (const user of usersData) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      try {
        await authService.registerUser(user);
        console.log(`✅ Usuario creado: ${user.email}`);
      } catch (error) {
        console.error(
          `❌ Error creando usuario ${user.email}: ${error.message}`
        );
      }
    } else {
      console.log(`ℹ Usuario ya existe: ${user.email}`);
    }
  }
  createdUsers = await User.find();

  // 2️⃣ Crear categorías, posts y comentarios
  for (const postData of postsData) {
    // Categoría
    let category = await Category.findOne({ name: postData.category.name });
    if (!category) {
      category = await categoryService.createCategory({
        name: postData.category.name,
      });
      console.log(`✅ Categoría creada: ${category.name}`);
    }

    // Autor aleatorio
    const randomAuthor = getRandomElement(createdUsers);

    // Post
    const existingPost = await Post.findOne({ title: postData.title });
    if (!existingPost) {
      const newPost = await postService.createPost({
        title: postData.title,
        content: postData.content,
        image: postData.image,
        author: randomAuthor._id,
        category: category._id,
      });
      console.log(`✅ Post creado: ${newPost.title}`);

      // Comentario con usuario aleatorio
      const randomCommentAuthor = getRandomElement(createdUsers);
      const comment = await commentService.createComment({
        content: `Comentario de prueba del usuario ${randomCommentAuthor.name} ${randomCommentAuthor.lastname} para el post ${newPost.title}`,
        author: randomCommentAuthor._id,
        post: newPost._id,
      });

      // Relacionar comentario al post
      newPost.comments.push(comment._id);
      await newPost.save();

      console.log(`💬 Comentario creado por ${randomCommentAuthor.email}`);
    } else {
      console.log(`ℹ Post ya existe: ${postData.title}`);
    }
  }

  console.log("✅ Seed completado");
}

module.exports = seedDatabase;
