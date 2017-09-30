import { AppContainer } from "react-hot-loader";
import { logger } from "redux-logger";
import * as AppModule from "../app";
import { Client } from "./Client";

// run client
const client = new Client("app", AppContainer, logger);
client.run(AppModule.App);

if (module.hot) {
    module.hot.accept("../app", () => {
        const { App } = require<typeof AppModule>("../app");
        // re-run application
        client.run(App);
    });
}
