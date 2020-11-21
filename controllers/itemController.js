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
  const tempManifestId = await req.params.id;

  const item = await Item.findOne({ manifestId: tempManifestId });

  if (item) {
    await item.remove();
    res.json({ message: "Item removed!" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc     Create an item
// @route    POST /api/items
// @access   Private/Admin
const createItem = asyncHandler(async (req, res) => {
  const item = new Item({
    name: "Sample name",
    user: req.user._id,
    imageUrl: "",
    manifestId: 0,
    rarity: "",
    storeCategory: "",
    vBucks: 0,
    numReviews: 0,
  });

  const createdItem = await item.save();
  res.status(201).json(createItem);
});

// @desc     Update an item
// @route    PUT /api/items/:id
// @access   Private/Admin
const updateItem = asyncHandler(async (req, res) => {
  const {
    name,
    imageUrl,
    manifestId,
    rarity,
    storeCategory,
    vBucks,
  } = req.body;

  const item = await Item.findById(req.params.id);

  if (item) {
    item.name = name;
    item.imageUrl = imageUrl;
    item.manifestId = manifestId;
    item.rarity = rarity;
    item.storeCategory = storeCategory;
    item.vBucks = vBucks;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export { getItems, getItemById, deleteItem, updateItem, createItem };
