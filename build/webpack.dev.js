// Since WebpackDevMiddleware on .NET does not play nice with Typescript - creating this file to compile on the fly.
require('ts-node/register')
module.exports = require("./webpack.config.ts");;