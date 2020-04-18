export interface MiddlewareEvent {
	id: string | string[] | undefined,
	name: string | string[] | undefined,
	payload: object,
	signature: string | string[] | undefined
}

export interface MiddlewareOptions {
	path?: string,
	secret?: string
}

export type MiddlewareState = {
	eventHandler: any,
	path: string,
	secret: string
}
