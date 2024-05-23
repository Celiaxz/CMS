const express = require("express");
const mongoose = require("mongoose");
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
const configMiddleware = require("./config");

//authmiddlewre to protect certain routes
const authMiddleware = require("./midleware/authMiddleware");

const {
  loginUser,
  registerUser,
  verifyUser,
} = require("./controllers/userController");

//import all routes/controllers
const {
  getAllArticles,
  getArticlesByPage,
  getArticleById,
  getArticlesByCategory,
  getTags,
  filterArticles,
  getNumbOfPages,
} = require("./controllers/articleController");
const { getCategories } = require("./controllers/categoryController");

//initialize express app by calling express function
const app = express();

//apply middleware config to app by calling configmidd fuction with app instance as argument
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
/
//define route for requests, when request is made to specific path
//callback function is executed
// user routes
app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);
app.get("/api/users/verify", authMiddleware, verifyUser);

app.get("/api/categories", getCategories);

app.get("/api/articles", getAllArticles);
app.get("/api/articles/:id", getArticleById);
app.get("/api/articles/category/:id", getArticlesByCategory);

app.get("/api/tags", getTags);

app.post("/api/filter/articles", filterArticles); // for filtering tags & categories

app.get("/api/articles/page/:id", getArticlesByPage); //get articles in a page
app.get("/api/numofpages", getNumbOfPages);

module.exports = app;
