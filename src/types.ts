import { EventNames } from "./generated/event-names";
export interface WebhookEvent<T> {
  id: string;
  name: EventNames.StringNames;
  payload: T;
}

export interface Options {
  path?: string;
  secret?: string;
  transform?: (
    value: WebhookEvent<any>
  ) => WebhookEvent<any> | PromiseLike<WebhookEvent<any>>;
}

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options {
  eventHandler?: any;
  hooks: Hooks;
}
