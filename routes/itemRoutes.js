import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Item from "../models/itemModel.js";

// @desc     Fetch all items
// @route    GET /api/items
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await Item.find({});

    res.json(items);
  })
);

// @desc     Fetch single item
// @route    GET /api/items/:id
// @access   Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const tempManifestId = await req.params.id;

    const item = await Item.findOne({ manifestId: tempManifestId });

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found." });
    }
  })
);

export default router;
