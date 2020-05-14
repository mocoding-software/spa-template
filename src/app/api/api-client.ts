import { addTask, fetch } from "domain-task";
import { Client } from "./api-client.generated";

import moment from "moment";

export class ApiClient extends Client {
  public static dateTimeReviver(key: string, value: unknown): unknown {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    return typeof value === "string" && dateFormat.test(value)
      ? moment(new Date(value))
      : value;
  }

  public static fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    const task = fetch(url, init);

    addTask(task); // required for server render;

    return task;
  }

  constructor() {
    super("/api", ApiClient);

    this.jsonParseReviver = ApiClient.dateTimeReviver;
  }
}
