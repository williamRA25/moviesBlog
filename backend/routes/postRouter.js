const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/", authenticate, postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.put("/:id", authenticate, postController.update);
router.delete("/:id", authenticate, postController.remove);

module.exports = router;
