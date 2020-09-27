// Errors thrown or rejected Promises in "error" event handlers are not handled
// as they are in the webhook event handlers. If errors occur, we log a
// "Fatal: Error occured" message to stdout
// @ts-ignore
import AggregateError from "aggregate-error";
import {
  All,
  EventTypesPayload,
} from "../generated/get-webhook-payload-type-from-event";
import { Handler } from "../types";

// "Fatal: Error occured" message to stdout
export function wrapErrorHandler<T extends All>(
  handler: Handler<T>,
  error: EventTypesPayload["error"] | AggregateError<any>
) {
  let returnValue;

  try {
    returnValue = handler(error);
  } catch (error) {
    console.log('FATAL: Error occured in "error" event handler');
    console.log(error);
  }

  if (returnValue && returnValue.catch) {
    returnValue.catch((error: Error) => {
      console.log('FATAL: Error occured in "error" event handler');
      console.log(error);
    });
  }
}
