import { EventNames } from './generated/types'
export interface WebhookEvent {
  id: string | string[] | undefined;
  name: EventNames.AllEventTypes;
  payload: Payload;
  signature: string | string[] | undefined;
}

type Payload = {
  action: string;
};

export interface EventHandlerOptions {
  path?: string;
  secret?: string;
  transform?: (value: WebhookEvent) => WebhookEvent | PromiseLike<WebhookEvent>;
}

type Hooks = {
  [key: string]: Function[];
};

export interface EventState extends EventHandlerOptions {
  eventHandler?: any;
  hooks: Hooks;
}
