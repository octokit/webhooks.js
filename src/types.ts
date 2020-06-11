import { EventNames } from './generated/event-names'




export interface WebhookEvent {
  id: string;
  name: EventNames.AllEventTypes;
  payload: Payload;
  signature: string;
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
