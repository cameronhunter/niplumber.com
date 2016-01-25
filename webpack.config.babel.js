import webpack from "webpack";
import path from "path";

export default {
  entry: {
    app: path.join(__dirname, "src", "client.js")
  },
  output: {
    path: path.join(__dirname, "static", "dist"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: { cacheDirectory: true } }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
