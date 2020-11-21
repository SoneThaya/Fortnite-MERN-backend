import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

// @desc     Fetch all items
// @route    GET /api/items
// @access   Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});

  res.json(items);
});

// @desc     Fetch single item
// @route    GET /api/items/:id
// @access   Public
const getItemById = asyncHandler(async (req, res) => {
  const tempManifestId = await req.params.id;

  const item = await Item.findOne({ manifestId: tempManifestId });

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc     Delete an item
// @route    DELETE /api/items/:id
// @access   Private/Admin
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: "Item removed!" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export { getItems, getItemById, deleteItem };
