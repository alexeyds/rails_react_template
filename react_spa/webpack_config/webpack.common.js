import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
  stats: {
    children: false
  },

  resolve: { 
    extensions: [".jsx", ".js"]
  },

  entry: {
    [`react_spa`]: ["./lib/initialize_spa.js"]
  },

  output: {
    publicPath: "/react_spa",
    path: path.resolve(__dirname, "../../public/react_spa"),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'lib/index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [ 
          "babel-loader"
        ]
      },
    ]
  },
};
