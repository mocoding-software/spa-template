import { Client } from "./Client";
import * as AppModule from '../app';

//run client
 var client = new Client("app");
client.run(AppModule.App);