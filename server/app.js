const express = require("express");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
const configMiddleware = require("./config");

//middleware config
configMiddleware(app);

//import all routes/controllers

const {
  getAllArticles,
  getArticlesByPage,
  getArticleById,
  getArticlesByCategory,
  getArticlesByTag,
  getTags,
  filterArticlesByTags,
  getNumbOfPages,
} = require("./controllers/articleController");

const { getCategories } = require("./controllers/categoryController");

app.get("api/categories", getCategories);

app.get("/api/articles", getAllArticles);
app.get("/api/articles/page/:id", getArticlesByPage);
app.get("/api/articles/:id", getArticleById);
app.get("/api/articles/category/:id", getArticlesByCategory);
app.get("/api/articles/tag/:id", getArticlesByTag);
app.get("/api/articles/tags", getTags);
app.post("/api/articles/filter/tags", filterArticlesByTags);
app.get("/api/articles/numofpages", getNumbOfPages);

module.exports = app;
