export interface MiddlewareEvent {
	id: string | string[] | undefined,
	name: string | string[] | undefined,
	payload: Payload,
	signature: string | string[] | undefined
}

type Payload = {
	action: string
}

export interface MiddlewareOptions {
	path?: string,
	secret?: string,
	transform?: (value: MiddlewareEvent) => MiddlewareEvent | PromiseLike<MiddlewareEvent>
}

type Hooks = {
	[key: string]: Function[]
}

export interface MiddlewareState extends MiddlewareOptions {
	eventHandler?: any,
	hooks: Hooks
}
