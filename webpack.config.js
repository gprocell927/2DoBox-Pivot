const path = require('path');

module.exports = {
  entry: {
    main: "./lib/scripts.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  }
};
