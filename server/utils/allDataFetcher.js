const fs = require("fs");
const path = require("path");

// Helper function to read JSON files
const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

// Fetch all data from the JSON files
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
    const allData = {
      articles: [...data1.articles, ...data2.articles, ...data3.articles],
    };
    return allData.articles;
  } catch (e) {
    console.error("Error: ", e);
    return [];
  }
};

// Get articles for a specific page
const fetchArticleByPage = (pageId) => {
  try {
    const data = readJsonFile(
      path.join(__dirname, `../fixtures/articles/page${pageId}.json`)
    );
    return data.articles;
  } catch (error) {
    console.error("Error while handling", error);
    return null;
  }
};

// Fetch all categories
const fetchCategories = () => {
  try {
    return readJsonFile(path.join(__dirname, `../fixtures/categories.json`));
  } catch (error) {
    console.error("Error fetching categories ", error);
    return null;
  }
};

// Fetch a single article by ID
const fetchArticleById = (id) => {
  const allData = fetchAllData();
  return allData.find((article) => `${article.id}` === id);
};

// Fetch articles by category ID
const fetchArticleByCategory = (categoryId) => {
  const allData = fetchAllData();
  return allData.filter((article) => `${article.category.id}` === categoryId);
};

// Fetch articles by tag ID
// const fetchArticlesByTag = (tagId) => {
//   const allData = fetchAllData();
//   return allData.filter((article) => article.tags.includes(tagId));
// };

// Fetch all unique tags
const fetchTags = () => {
  const allData = fetchAllData();
  const allTags = new Set();
  if (allData.length === 0) {
    return [];
  }
  allData.forEach((article) => {
    article.tags.forEach((tag) => {
      allTags.add(tag);
    });
  });
  return [...allTags];
};

// Filter articles by multiple tags
const filterArticleByTags = (requestTags) => {
  const allData = fetchAllData();
  return allData.filter((article) =>
    requestTags.some((tag) => article.tags.includes(tag))
  );
};

// Filter articles by multiple categories
const filterArticleByCategories = (requestCategories) => {
  const allData = fetchAllData();
  return allData.filter((article) =>
    requestCategories.some((categories) =>
      article.category.name.includes(categories)
    )
  );
};

// Filter articles by multiple categories
const filterArticleByTagsAndCategories = (requestTags, requestCategories) => {
  const allData = fetchAllData();
  return allData.filter((article) => {
    const shouldIncludeTag = requestTags.some((tag) =>
      article.tags.includes(tag)
    );
    const shouldIncludeCategory = requestCategories.some((categories) =>
      article.category.name.includes(categories)
    );
    return shouldIncludeTag && shouldIncludeCategory;
  });
};

module.exports = {
  fetchAllData,
  fetchArticleByPage,
  fetchCategories,
  fetchArticleById,
  fetchArticleByCategory,
  //   fetchArticlesByTag,
  fetchTags,
  filterArticleByTags,
  filterArticleByCategories,
  filterArticleByTagsAndCategories,
};
