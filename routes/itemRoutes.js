import express from "express";
const router = express.Router();
import {
  getItems,
  getItemById,
  deleteItem,
  createItem,
  updateItem,
} from "../controllers/itemController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getItems).post(protect, admin, createItem);
router
  .route("/:id")
  .get(getItemById)
  .delete(protect, admin, deleteItem)
  .put(protect, admin, updateItem);

export default router;
