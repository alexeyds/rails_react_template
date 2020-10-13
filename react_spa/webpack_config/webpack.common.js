import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export let publicPath = "/react_spa";

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
    publicPath,
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, path.join("../../public", publicPath)),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'lib/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"]
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          sassLoader()
        ],
      },
    ]
  },
};


function sassLoader() {
  return {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      sassOptions: {
        includePaths: ['lib', 'node_modules']
      },
    },
  };
}
