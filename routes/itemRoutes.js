import express from "express";
const router = express.Router();
import { getItems, getItemById } from "../controllers/itemController.js";

router.route("/").get(getItems);
router.route("/:id").get(getItemById);

export default router;
