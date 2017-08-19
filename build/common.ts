import * as webpack from "webpack";
import * as path from "path";

const tempDir = path.join(__dirname, "../.tmp");
const wwwrootDir = path.join(__dirname, "..", "wwwroot/");
const noderootDir = path.join(__dirname, "..", "wwwroot_node/");

const alias = {
    // app (this might be removed if TsConfigPathsPlugin was working... )
    api: path.join(__dirname, "../src/app/api"),
    components: path.join(__dirname, "../src/app/components"),
    pages: path.join(__dirname, "../src/app/pages"),
    store: path.join(__dirname, "../src/app/store"),    

    // assets
    assets: path.join(__dirname, "../src/assets"),
}


export {
    tempDir,
    wwwrootDir,
    noderootDir,
    alias, 
}