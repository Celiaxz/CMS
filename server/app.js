const express = require("express");
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/config")(app);
