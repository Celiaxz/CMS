const { fetchCategories } = require("../utils/allDataFetcher");

//handle request to get all categories
//calls fetchcategorie to retrieve categories and send as JSON
const getCategories = (req, res) => {
  const categories = fetchCategories();
  if (categories) {
    res.json(categories);
  } else {
    res.status(404).json({ message: "Categories not found!" });
  }
};

module.exports = { getCategories };
