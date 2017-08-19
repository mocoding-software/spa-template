import * as Redux from 'redux';
import { ApiClient, ExampleDto } from 'api';
import { Automata, automataReducer } from "redux-automata";

export interface IExampleApiState {
    isFetching: boolean;
    data?: ExampleDto
}

const automata = new Automata<IExampleApiState>("Get Example API");

// States
const Idle = automata.State("Idle", () => ({ isFetching: false }))
const Fetching = automata.State("Fetching", () => ({ isFetching: true }));
const Fetched = automata.State<ExampleDto>("Fetched", (state, data) => ({ isFetching: false, data }));

// Actions
const Fetch = automata.Action("Fetch");
const Receive = automata.Action<ExampleDto>("Receive");
const Refresh = automata.Action("Refresh");


//transitions
function MakeApiCall (dispatch: Redux.Dispatch<any>) {
    var client = new ApiClient();
    client.serverTimeGet().then((data)=> dispatch(Receive(data)));
}

automata
    .In(Idle)
        .On(Fetch)
            .Execute(MakeApiCall)
            .GoTo(Fetching)
    .In(Fetching)
        .On(Receive)
            .GoTo(Fetched)
    .In(Fetched)
        .On(Refresh)
            .Execute(MakeApiCall)
            .GoTo(Fetching)

automata.BeginWith(Idle);

const exampleApiReducer = automataReducer(automata);

const GetServerTime = Fetch({});
const RefreshServerTime = Refresh({});

export {
    exampleApiReducer,
    GetServerTime,
    RefreshServerTime
}
