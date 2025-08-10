const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.post("/", authenticate, authorize, categoryController.create);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.put("/:id", authenticate, authorize, categoryController.update);
router.delete("/:id", authenticate, authorize, categoryController.remove);

module.exports = router;
