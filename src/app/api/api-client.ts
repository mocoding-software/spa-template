import { addTask, fetch } from "domain-task";
import { Client } from "./api-client.generated";

export class ApiClient extends Client {
  public static fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    const task = fetch(url, init);
    addTask(task); // required for server render;
    return task;
  }

  constructor() {
    super("/api", ApiClient);
  }
}
