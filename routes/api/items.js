const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route   get request api/items
// @desc    Get all items
// @access  Public
router.get("/", (req, res) => {
  Item.find() //Find all values in MongoDB
    .sort({ date: -1 }) //Sort By date in descending order
    .then(items => res.json(items)); //parse items into json format
});

// @route   post request api/items
// @desc    Create an item
// @access  Public
router.post("/", (req, res) => {
  //Get Item fields and save it to a new item object
  const newItem = {};

  if (req.body.name) newItem.name = req.body.name;
  if (req.body.quantity) newItem.quantity = req.body.quantity;
  if (req.body.purchasePrice) newItem.purchasePrice = req.body.purchasePrice;

  if (req.body.sellPrice) newItem.sellPrice = req.body.sellPrice;
  if (req.body.barcode) newItem.barcode = req.body.barcode;

  //If an ID was passed, then we will look for the item by the passed ID and try to updae it
  if (req.body._id) {
    Item.find({ _id: req.body._id }).then((item => {
      if (item) {
        Item.findOneAndUpdate(
          { _id: req.body._id },
          { $set: newItem },
          { new: false }
        ).then((item) => res.json(item))
      } else {
        errors = { query: "item not found" };
        return res.status(404).json(errors);
      }
    }))
  } else {
    //If there was no ID passed, then we know we are trying to add a new item.
    new Item(newItem).save().then((item) => res.json(item));
  }
});

// @route GET api/product/search
// @desc Search for a product using the input string from search bar
// @access Public
// receive req to query from submitQuery at /actions/queryActions.js
//NOTE:
// search/?string <-we use-> req.query
// search/:string <-we use-> req.params
router.get("/search/", (req, res) => {
  if (req.query.name) {
    // find part of string which include lower and upper case
    const regex = new RegExp(req.query.name, "i");
    // find return [ ]
    Item.find({ name: regex })
      .then(item => {
        if (!item) {
          // if item not found
          errors = { query: "item not found" };
          return res.status(404).json(errors);
        }
        res.send(item);
      })
      .catch(err => {
        console.error(err);
      });
  } else if (req.query.barcode) {
    // find part of string which include lower and upper case
    const regex = new RegExp(req.query.barcode, "i");
    // find return [ ]
    Item.find({ barcode: regex })
      .then(item => {
        if (!item) {
          // if item not found
          errors = { query: "item not found" };
          return res.status(404).json(errors);
        }
        res.send(item);
      })
      .catch(err => {
        console.error(err);
      });
  }
});

// @route   delete request api/items/:id
// @desc    Delete an item
// @access  Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => { console.log("FAIL\n\n\n\n\n\n"); res.status(404).json({ success: false }) });
});

module.exports = router;
