const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new Dotenv({
      path: '../.env',
      allowEmptyValues: true,
    }),
  ],
  output: {
    filename: 'starter.js',
    path: path.resolve(__dirname, 'out'),
    clean: true,
  },
}
