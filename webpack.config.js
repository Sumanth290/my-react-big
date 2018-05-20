
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if(process.env.NODE_ENV === "test"){
  require('dotenv').config({path : ".env.test"});
}else if(process.env.NODE_ENV === "development"){
  require('dotenv').config({path : ".env.development"});
}

module.exports = (env,argv) => {
  const isProd = env === "production" ;
  const CSSExtract = new ExtractTextPlugin("styles.css");
  return {
    entry : "./src/app.jsx",
    output : {
      path : path.join(__dirname,"public","dist"),
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
      CSSExtract,
      new webpack.DefinePlugin({
        "process.ENV.FIREBASE_API_KEY" : JSON.stringify(process.ENV.FIREBASE_API_KEY),
        "process.ENV.FIREBASE_AUTH_DOMAIN" : JSON.stringify(process.ENV.FIREBASE_AUTH_DOMAIN),
        "process.ENV.FIREBASE_DATABASE_URL" : JSON.stringify(process.ENV.FIREBASE_DATABASE_URL),
        "process.ENV.FIREBASE_PROJECT_ID" : JSON.stringify(process.ENV.FIREBASE_PROJECT_ID),
        "process.ENV.FIREBASE_STORAGE_BUCKET" : JSON.stringify(process.ENV.FIREBASE_STORAGE_BUCKET),
        "process.ENV.FIREBASE_MESSAGING_SENDER_ID" : JSON.stringify(process.ENV.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],
    devtool : isProd ? "source-map" : "inline-source-map",
    devServer : {
      contentBase : path.join(__dirname,"public"),
      historyApiFallback : true,
      publicPath : "/dist/"
    }
  }
};
