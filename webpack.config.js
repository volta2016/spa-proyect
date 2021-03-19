const path = require("path");
module.exports = {
  entry: path.join(__dirname, "src", "app.js"),
  output: {
    path: path.join(__dirname, "public"),
    filename: "apps.js",
  },
  mode: "development",
};
