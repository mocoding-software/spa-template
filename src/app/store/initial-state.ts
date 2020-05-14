import { ApiClient } from "api";

export function onParseInitialState(state: string): unknown {
  return JSON.parse(state, ApiClient.dateTimeReviver);
}
