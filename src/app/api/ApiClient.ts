import { Client, IClient } from "./ApiClient.generated"
import { fetch, addTask } from 'domain-task';
import * as moment from 'moment';

export class ApiClient extends Client {
    /**
     *
     */
    constructor() {
        super("/api", ApiClient);

        this.jsonParseReviver = ApiClient.dateTimeReviver;
    }

    public static dateTimeReviver(key: string, value: any): any {
        const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
        return (typeof value === "string" && dateFormat.test(value))
            ? moment(new Date(value))
            : value;
    }

    public static fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {                
        var task = fetch(url, init);                
        addTask(task); //required for server render;
        return task;
    }
}