import * as webpack from "webpack";
import { WebpackConfigBuilder } from "webpack-typescript-builder";

import { alias, noderootDir, wwwrootDir } from "./common";
import plugins from "./plugins";
import { serverVendorsDll, vendorsDll } from "./webpack.config.vendors";

const isProduction = (process.argv.indexOf("-p") !== -1);

const client: webpack.Entry = {
    index: ["./src/client/index"]
};

const clientDev: webpack.Entry = {
    index: [
        "css-hot-loader/hotModuleReplacement", // https://github.com/shepherdwind/css-hot-loader/issues/37
        "react-hot-loader/patch",
        "./src/client/index.dev"
    ]
};

const server: webpack.Entry = {
    index: ["./src/server/prerender/index"]
};

const clientConfigBuilder = new WebpackConfigBuilder(isProduction ? client : clientDev);
const clientConfig = clientConfigBuilder.toUmdConfig(wwwrootDir, ...plugins, vendorsDll.consume());
clientConfig.resolve.alias = alias;

const serverConfigBuilder = new WebpackConfigBuilder(server);
const serverConfig = serverConfigBuilder.toServerConfig(noderootDir, ...plugins, serverVendorsDll.consume());
serverConfig.resolve.alias = alias;

if (!isProduction) {
     // Until fixed: https://github.com/aspnet/JavaScriptServices/issues/1191
    clientConfig.output.publicPath = "/_hmr/";
    serverConfig.output.publicPath = "/_hmr/";
    clientConfig.devtool = "eval-source-map";
    serverConfig.devtool = "eval-source-map";
} else {
}

export = [clientConfig, serverConfig];
