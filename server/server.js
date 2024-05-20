const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/config")(app);

// Helper function to read JSON files
const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};
