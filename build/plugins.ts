import * as path from "path";
// @ts-ignore
import { ReactLoadablePlugin } from "react-loadable/webpack";
import * as webpack from "webpack";

const plugins: webpack.Plugin[] = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // ignore optional dependencies
    new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve("node-noop")), // Workaround for https://github.com/andris9/encoding/issues/16
    new ReactLoadablePlugin({
        filename: "./wwwroot_node/react-loadable.json",
    })
];

export default plugins;
