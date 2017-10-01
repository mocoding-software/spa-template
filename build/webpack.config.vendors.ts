import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

import { Dll, WebpackConfigBuilder } from "webpack-typescript-builder";

import { alias, noderootDir, tempDir, wwwrootDir } from "./common";
import plugins from "./plugins";

const vendorsName = "_vendors";

export const vendorsDll = new Dll(vendorsName, "umd", tempDir);
export const serverVendorsDll = new Dll(vendorsName, "commonjs2", tempDir);

const entry: webpack.Entry = {};
entry[vendorsName] = ["./src/app/vendors"];

const configBuilder = new WebpackConfigBuilder(entry);

const clientConfig = configBuilder.toUmdConfig(wwwrootDir, ...plugins, vendorsDll.produce());
clientConfig.resolve.alias = alias;

const serverConfig = configBuilder.toServerConfig(noderootDir, ...plugins, serverVendorsDll.produce());
serverConfig.resolve.alias = alias;

export default [clientConfig, serverConfig];
