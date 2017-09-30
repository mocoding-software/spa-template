import * as AppModule from "../app";
import { Client } from "./Client";

// run client
const client = new Client("app");
client.run(AppModule.App);
