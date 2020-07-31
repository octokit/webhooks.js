import { EventNames } from "./generated/event-names";
export interface WebhookEvent<T = any> {
  id: string;
  name: EventNames.StringNames;
  payload: T;
}

export interface Options {
  path?: string;
  secret?: string;
  transform?: (value: WebhookEvent) => WebhookEvent | PromiseLike<WebhookEvent>;
}

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options {
  eventHandler?: any;
  hooks: Hooks;
}
