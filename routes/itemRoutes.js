import express from "express";
const router = express.Router();
import {
  getItems,
  getItemById,
  deleteItem,
  createItem,
  updateItem,
  createItemReview,
  getTopItems,
} from "../controllers/itemController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getItems).post(protect, admin, createItem);
router.route("/:id/reviews").post(protect, createItemReview);
router.get("/top", getTopItems);
router
  .route("/:id")
  .get(getItemById)
  .delete(protect, admin, deleteItem)
  .put(protect, admin, updateItem);

export default router;
