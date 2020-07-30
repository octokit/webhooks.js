// import { EventNames } from "./generated/types";
export interface WebhookEvent<T> {
  id: string;
  name: string; // EventNames.AllEventTypes is not correct, only the event names are supported here, not the <event name>.<action> combinations
  payload: T;
}

export interface EventHandlerOptions {
  path?: string;
  secret?: string;
  transform?: (
    value: WebhookEvent<any>
  ) => WebhookEvent<any> | PromiseLike<WebhookEvent<any>>;
}

type Hooks = {
  [key: string]: Function[];
};

export interface EventState extends EventHandlerOptions {
  eventHandler?: any;
  hooks: Hooks;
}
