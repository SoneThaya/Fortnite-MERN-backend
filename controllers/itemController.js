import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

// @desc     Fetch all items
// @route    GET /api/items
// @access   Public
const getItems = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const items = await Item.find({ ...keyword });

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
    name: "Sample",
    user: req.user._id,
    imageUrl: "sample",
    manifestId: 99999,
    rarity: "Sample",
    storeCategory: "Sample",
    vBucks: 0,
    numReviews: 0,
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
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

// @desc     Create new review
// @route    POST /api/items/:id/reviews
// @access   Private
const createItemReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const tempManifestId = await req.params.id;

  const item = await Item.findOne({ manifestId: tempManifestId });

  if (item) {
    const alreadyReviewed = item.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Item already reviewed.");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    item.reviews.push(review);

    item.numReviews = item.reviews.length;

    item.rating =
      item.reviews.reduce((acc, cur) => cur.rating + acc, 0) /
      item.reviews.length;

    await item.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export {
  getItems,
  getItemById,
  deleteItem,
  updateItem,
  createItem,
  createItemReview,
};
