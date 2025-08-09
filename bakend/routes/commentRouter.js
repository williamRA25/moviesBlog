const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/", authenticate, commentController.create);
router.get("/", commentController.getAll);
router.get("/:id", commentController.getById);
router.put("/:id", authenticate, commentController.update);
router.delete("/:id", authenticate, commentController.remove);

module.exports = router;
