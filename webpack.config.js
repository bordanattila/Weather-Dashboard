const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

// Load environment variables from .env
dotenv.config();

module.exports = {
  // Other Webpack config options...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    }),
  ],
};
