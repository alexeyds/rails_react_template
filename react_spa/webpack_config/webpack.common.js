import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export let publicPath = "/react_spa/";

export default {
  stats: {
    children: false
  },

  resolve: { 
    extensions: [".jsx", ".js"]
  },

  entry: {
    [`react_spa`]: ["regenerator-runtime/runtime", "./lib/initialize_spa.js"],
    ['stylesheets']: ["./styles/application.scss"]
  },

  output: {
    publicPath,
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, path.join("../../public", publicPath)),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'lib/index.html' }),
    new MiniCssExtractPlugin({ filename: 'styles/[name].[contenthash:8].css' }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'BABEL_ENV'])
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

      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: [/fonts/],
        use: [imagesLoader()],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        exclude: [/images/],
        use: [fontsLoader()],
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
        includePaths: ['styles', 'node_modules']
      },
    },
  };
}

function imagesLoader() {
  return {
    loader: 'file-loader',    
    options: {
      name: 'images/[name].[contenthash:8].[ext]',
    },
  };
}

function fontsLoader() {
  return {
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[contenthash:8].[ext]'
    }
  };
}