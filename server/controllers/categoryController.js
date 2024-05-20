const { fetchCategories } = require("../utils/allDataFetcher");

// app.get("/categories", (req, res) => {
//   try {
//     //function
//     const data = readJsonFile(path.join(__dirname, `fixtures/categories.json`));
//     res.json(data);
//   } catch (e) {
//     console.log("Error: ", e);
//     res.json("Page not found!");
//   }
// });

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
