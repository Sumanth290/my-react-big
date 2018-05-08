
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env,argv) => {
  const isProd = env === "production" ;
  const CSSExtract = new ExtractTextPlugin("styles.css");
  return {
    entry : "./src/app.jsx",
    output : {
      path : path.join(__dirname,"public"),
      filename : "bundle.js"
    },
    mode : "none",
    module : {
        rules : [{
          loader : "babel-loader",
          test : /\.jsx?$/,
          exclude : /node_modules/
        },
        {
          test : /.s?css$/,
          use : CSSExtract.extract({
            use : [
              {
                loader : "css-loader",
                options : {
                  sourceMap : true
                }
              },
              {
                loader : "sass-loader",
                options : {
                  sourceMap : true
                }
              }
            ]
          })
        }]
    },
    plugins : [
      CSSExtract
    ],
    devtool : isProd ? "source-map" : "inline-source-map",
    devServer : {
      contentBase : path.join(__dirname,"public"),
      historyApiFallback : true
    }
  }
};
