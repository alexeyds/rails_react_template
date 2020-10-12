import merge from "webpack-merge";
import common, { publicPath } from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: {
      index: publicPath
    }
  },
  devtool: false
});
