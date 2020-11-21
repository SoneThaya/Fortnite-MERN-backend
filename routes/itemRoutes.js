import express from "express";
const router = express.Router();
import {
  getItems,
  getItemById,
  deleteItem,
} from "../controllers/itemController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getItems);
router.route("/:id").get(getItemById).delete(protect, admin, deleteItem);

export default router;
