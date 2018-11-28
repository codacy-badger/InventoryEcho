const express = require("express");
const router = express.Router();

// Item Model
const SoldItem = require("../../models/soldItem");

// @route   get request api/sales
// @desc    Get all items
// @access  Public
router.get("/", (req, res) => {
  SoldItem.find() //Find all values in MongoDB
    .sort({ date: -1 }) //Sort By date in descending order
    .then(items => res.json(items)); //parse items into json format
});

// @route   post request api/sales
// @desc    Create an item
// @access  Public
router.post("/", (req, res) => {
  const newItem = new SoldItem({
    name: req.body.name,
    quantity: req.body.quantity,
    sellPrice: req.body.sellPrice,
    barcode: req.body.barcode,
  });

  newItem.save().then(soldItem => res.json(soldItem));
});

// @route   delete request api/sales/:id
// @desc    Delete an item
// @access  Public
router.delete("/:id", (req, res) => {
  SoldItem.findById(req.params.id)
    .then(soldItem => soldItem.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   delete request api/sales/:id
// @desc    Delete an item
// @access  Public
router.delete("/", (req, res) => {
  SoldItem.remove({})
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
