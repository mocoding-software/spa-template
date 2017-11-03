import { ApiClient, ExampleDto } from "api";
import * as Redux from "redux";
import { createTaskAutomation, TaskState } from "redux-automata";

export type ExampleApiState = TaskState<ExampleDto>;

function getServerTime() {
    const api = new ApiClient();
    return api.serverTimeGet();
}

const automation = createTaskAutomation<ExampleDto>("Get Data", getServerTime);

const GetServerTime = automation.start;
const RefreshServerTime = automation.restart;
const exampleApiReducer = automation.reducer;

export {
    exampleApiReducer,
    GetServerTime,
    RefreshServerTime
};
