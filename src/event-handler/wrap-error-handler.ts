// Errors thrown or rejected Promises in "error" event handlers are not handled
// as they are in the webhook event handlers. If errors occur, we log a

import AggregateError from "aggregate-error";
import { EventTypesPayload } from "../generated/get-webhook-payload-type-from-event";
import { Handler } from "../types";

// "Fatal: Error occured" message to stdout
export function wrapErrorHandler(
  handler: Handler<"error">,
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
