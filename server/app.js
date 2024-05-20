const express = require("express");
const mongoose = require("mongoose");
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
const configMiddleware = require("./config");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./midleware/authMiddleware");

const app = express();

//middleware config
configMiddleware(app);
//import user route
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/CMS";
// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// User routes
app.use("/api/users", userRoutes);

//import all routes/controllers

const {
  getAllArticles,
  getArticlesByPage,
  getArticleById,
  getArticlesByCategory,
  //   getArticlesByTag,
  getTags,
  filterArticlesByTags,
  getNumbOfPages,
} = require("./controllers/articleController");

const { getCategories } = require("./controllers/categoryController");

app.get("/api/categories", getCategories);

app.get("/api/articles", getAllArticles);
app.get("/api/articles/page/:id", getArticlesByPage);
app.get("/api/articles/:id", getArticleById);
app.get("/api/articles/category/:id", getArticlesByCategory);

app.get("/api/tags", getTags);
app.post("/api/tags/filter", filterArticlesByTags);

app.get("/api/numofpages", getNumbOfPages);

module.exports = app;
