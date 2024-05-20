const fs = require("fs");
const path = require("path");

// Helper function to read JSON files
const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const fetchAllData = () => {
  try {
    const data1 = readJsonFile(
      path.join(__dirname, `../fixtures/articles/page1.json`)
    );
    const data2 = readJsonFile(
      path.join(__dirname, `../fixtures/articles/page2.json`)
    );
    const data3 = readJsonFile(
      path.join(__dirname, `../fixtures/articles/page3.json`)
    );
    //all article comine  in one array
    const allData = {
      articles: [...data1.articles, ...data2.articles, ...data3.articles],
    };
    return allData.articles;
  } catch (e) {
    console.error("Error: ", e);
    return [];
  }
};
//get article for particular page(paginatation)
const fetchArticleByPage = (pageId) => {
  try {
    const data = readJsonFile(
      path.join(__dirname, `../fixtures/articles/page${pageId}.json`)
    );
    return data.articles;
  } catch (error) {
    console.error("error while handling", error);
    return null;
  }
};
//fetch all categories
const fetchCategories = () => {
  try {
    const data = readJsonFile(
      path.join(__dirname, `../fixtures/categories.json`)
    );
    res.json(data);
  } catch (error) {
    console.log("error fetching categories ", error);
  }
};
//fetch single article by its own id
//search all data array for add that matches id parameter
const fetchArticleById = () => {
  const allData = fetchAllData();
  return allData.find((article) => `${article.id}` === id);
};

//fetch articles by category
const fetchArticleByCategory = () => {
  const allData = fetchAllData();
  return allData.filter((article) => article.category.name === categoryId);
};

//fetch articlec by tag
const fetchArticlesByTag = (tagId) => {
  const allData = fetchAllData();
  return allData.filter((article) => article.tags.includes(tagId));
};

// const allData = fetchAllData();
// const allTags = new Set();
// if (allData.length == 0) {
//   res.json("Page not found!");
// } else {
//   allData.forEach((article) => {
//     article.tags.forEach((tag) => {
//       allTags.add(tag);
//     });
//   });
//   res.json([...allTags]);
// }

//fetch all unique tags
const fetchTags = () => {
  const allData = fetchAllData();
  //new set creates and checks
  const tags = new Set();
  allData.forEach((article) => {
    article.tags.forEach((tag) => tags.add(tag));
  });
  return [...tags];
};

// const isTagIncluded = (requestTags, articleTags) => {
//   for (let i = 0; i <= articleTags.length; i++) {
//     const tag = articleTags[i];
//     if (requestTags.includes(tag)) {
//       return true;
//     }
//   }
//   return false;
// };

//filter articles by multiple tags
const filterArticleByTags = (requestTags) => {
  const allData = fetchAllData();
  return allData.filter((article) =>
    requestTags.some((tag) => article.tags.includes(tag))
  );
};

module.exports = {
  fetchAllData,
  fetchArticleByPage,
  fetchCategories,
  fetchArticleById,
  fetchArticleByCategory,
  fetchArticlesByTag,
  fetchTags,
  filterArticleByTags,
};
