var path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".json", ".vue"],
    alias: {
      utils: path.resolve(__dirname, "../../../utils/MyUtilFn"),
    },
  },
};
