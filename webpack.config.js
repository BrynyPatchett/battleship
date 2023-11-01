const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    plugins: [
        new HtmlWebpackPlugin({
          title: 'BattleshipS',
          template:'./src/index.html',
        }),
      ],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: false,
    },
  };