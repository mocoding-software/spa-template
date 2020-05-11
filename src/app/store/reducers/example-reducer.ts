import { ApiClient, ExampleDto } from "api";
import { createTaskAutomation, TaskState } from "redux-automata";

export type ExampleApiState = TaskState<ExampleDto>;

function getServerTime(): Promise<ExampleDto> {
  const api = new ApiClient();
  return api.serverTime();
}

const automation = createTaskAutomation<ExampleDto>("Get Data", getServerTime);

const GetServerTime = automation.start;
const RefreshServerTime = automation.restart;
const exampleApiReducer = automation.reducer;

export { exampleApiReducer, GetServerTime, RefreshServerTime };
