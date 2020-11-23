import merge from 'webpack-merge';
import TerserPlugin from "terser-webpack-plugin";
import common from './webpack.common.js';

export default merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ],

    splitChunks: {
      chunks: 'all'
    }
  },

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    assetFilter: (name) => !(/\.map$/.test(name) || (/\.svg$/.test(name)))
  }
});
