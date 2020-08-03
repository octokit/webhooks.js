import { EventNames } from "./generated/event-names";
export interface WebhookEvent<T = any> {
  id: string;
  name: EventNames.StringNames;
  payload: T;
}

export interface Options<T extends WebhookEvent> {
  path?: string;
  secret?: string;
  transform?: TransformMethod<T>;
}

type TransformMethod<T extends WebhookEvent> = (
  event: WebhookEvent
) => T | PromiseLike<T>;

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options<any> {
  eventHandler?: any;
  hooks: Hooks;
}
