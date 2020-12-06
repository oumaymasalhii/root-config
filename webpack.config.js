const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "start";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
  });

  const merge = webpackMerge({
    customizeArray: webpackMerge.unique(
      "plugins",
      ["HtmlWebpackPlugin"],
      (plugin) => plugin.constructor && plugin.constructor.name
    ),
  });

  return merge(
    {
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          template: "src/index.ejs",
          templateParameters: {
            isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
            orgName,
          },
        }),
        new webpack.LoaderOptionsPlugin({
          // test: /\.xxx$/, // may apply this only for some modules
          options: {
            modules: {
              rules: [
                {
                  test: /\.(png|jpe?g|gif|svg|xml)$/i,
                  use: [
                    {
                      loader: "file-loader",
                    },
                  ],
                },
                {
                  test: /\.svg$/,
                  use: [
                    {
                      loader: 'svg-url-loader',
                      options: {
                        limit: 10000,
                      },
                    },
                  ],
                },
              ],
            },
          },
        }),
      ],
    },
    defaultConfig,
    {


      // modify the webpack config however you'd like to by adding to this object
    }
  );
};
