const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");
const sales = require("./routes/api/sales");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// MongoDB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/items", items);
app.use("/api/sales", sales);

/* include process.env.PORT in case we 
   go to HEROKU, else just use port 3000 */
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port " + port));
