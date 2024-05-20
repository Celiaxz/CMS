const { fetchCategories } = require("../utils/allDataFetcher");

//controller to get all categories
const getCategories = (req, res) => {
  const categories = fetchCategories();
  if (categories) {
    res.json(categories);
  } else {
    res.status(404).json({ message: "Categories not found!" });
  }
};

module.exports = { getCategories };
