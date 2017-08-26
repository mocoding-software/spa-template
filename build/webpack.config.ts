import * as webpack from "webpack";
import { WebpackConfigBuilder } from "webpack-typescript-builder";

import { alias, wwwrootDir, noderootDir } from "./common";
import plugins from "./plugins";
import { vendorsDll, serverVendorsDll } from "./webpack.config.vendors";

const isProduction = (process.argv.indexOf('-p') !== -1);

const client: webpack.Entry = {
    "index": ["./src/client/index"]
}

const clientDev: webpack.Entry = {
    "index": [
        "react-hot-loader/patch",
        "./src/client/index.dev"
    ]
}

const server: webpack.Entry = {
     "index": ["./src/server/prerender/index"]
}

const clientConfigBuilder = new WebpackConfigBuilder(isProduction ? client : clientDev);
let clientConfig = clientConfigBuilder.toUmdConfig(wwwrootDir, ...plugins, vendorsDll.consume());
clientConfig.resolve.alias = alias;

const serverConfigBuilder = new WebpackConfigBuilder(server);
let serverConfig = serverConfigBuilder.toServerConfig(noderootDir, ...plugins, serverVendorsDll.consume());
serverConfig.resolve.alias = alias;

if (!isProduction) { //Until fixed: https://github.com/aspnet/JavaScriptServices/issues/1191
    clientConfig.output.publicPath = "_/";
    serverConfig.output.publicPath = "_/";
}

export = [clientConfig, serverConfig];