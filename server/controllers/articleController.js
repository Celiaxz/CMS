const {
  fetchAllData,
  fetchArticleByPage,
  fetchArticleById,
  fetchTags,
  fetchArticlesByTag,
  fetchArticleByCategory,
} = require("../utils/allDataFetcher");

//controller to get all articles
const getAllArticles = (req, res) => {
  const articles = fetchAllData();
  res.json(articles);
};

//controller to get articles by page
const getArticlesByPage = (req, res) => {
  const pageId = req.params.pageId;
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

// app.get("/category/:id", (req, res) => {
//   const id = req.params.id;
//   const allData = fetchAllData();
//   const category = [];
//   if (allData.length == 0) {
//     res.json("Page not found!");
//   } else {
//     allData.forEach((article) => {
//       if (article.category.name === id) {
//         category.push(article);
//       }
//     });
//     res.json(category);
//   }
// });

// controller to get a signle article by ID
const getArticlesByCategory = (req, res) => {
  const articles = fetchArticleByCategory(req.params.id);
  res.json(articles);
};

//controller to get articles by tag
const getArticlesByTag = (req, res) => {
  const articles = fetchArticlesByTag(req.params.id);
  res.json(articles);
};

// Controller to get all tags
const getTags = (req, res) => {
  const tags = fetchTags();
  res.json(tags);
};
// Controller to filter articles by tags
const filterArticlesByTags = (req, res) => {
  const requestTags = req.body.tags;
  const articles = filterArticlesByTags(requestTags);
  res.json(articles);
};

// app.get("/numofpages", (req, res) => {
//   try {
//     res.json(3);
//   } catch (e) {
//     console.log("Error: ", e);
//     res.json("Page not found!");
//   }
// });

//controller to get the number of pages
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
