const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;
