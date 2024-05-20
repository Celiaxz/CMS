const {
  fetchAllData,
  fetchArticleByPage,
  fetchArticleById,
  fetchTags,
  fetchArticlesByTag,
  fetchArticleByCategory,
  filterArticleByTags,
} = require("../utils/allDataFetcher");

// Controller to get all articles
const getAllArticles = (req, res) => {
  const articles = fetchAllData();
  res.json(articles);
};

// Controller to get articles by page
const getArticlesByPage = (req, res) => {
  const pageId = req.params.id;
  const articles = fetchArticleByPage(pageId);
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Page not found!" });
  }
};

// Controller to get a single article by ID
const getArticleById = (req, res) => {
  const article = fetchArticleById(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article not found!" });
  }
};

// Controller to get articles by category
const getArticlesByCategory = (req, res) => {
  const articles = fetchArticleByCategory(req.params.id);
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Category not found!" });
  }
};

// Controller to get articles by tag
const getArticlesByTag = (req, res) => {
  const articles = fetchArticlesByTag(req.params.id);
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Tag not found!" });
  }
};

// Controller to get all tags
const getTags = (req, res) => {
  const tags = fetchTags();
  if (tags) {
    res.json(tags);
  } else {
    res.status(404).json({ message: "Tag not found!" });
  }
};

// Controller to filter articles by tags
const filterArticlesByTags = (req, res) => {
  const requestTags = req.body.tags;
  const articles = filterArticleByTags(requestTags);
  res.json(articles);
};

// Controller to get the number of pages
const getNumbOfPages = (req, res) => {
  res.json(3);
};

module.exports = {
  getAllArticles,
  getArticlesByPage,
  getArticleById,
  getArticlesByCategory,
  getArticlesByTag,
  getTags,
  filterArticlesByTags,
  getNumbOfPages,
};
