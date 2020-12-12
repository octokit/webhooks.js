const { pascalCase } = require("pascal-case");
const TypeWriter = require("@gimenete/type-writer");
const webhooks = require("@octokit/webhooks-definitions/index.json");
const { generateFile } = require("./generate-file");

const tw = new TypeWriter();
const eventPayloadMapping = [
  ["error", "WebhookEventHandlerError"],
  ["*", "WebhookEvent<any>"],
];

const doNotEditThisFileDisclaimer = `
// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
// make edits in scripts/generate-types.js`;
const eventPayloadsVariable = "EventPayloads";

const generatePayloadType = (typeName) => ({
  rootTypeName: typeName,
  namedKeyPaths: {
    [`${typeName}.repository`]: "PayloadRepository",
    // This prevents a naming colision between the payload of a `installation_repositories` event
    // and the `repositories` attribute of a `installation` event
    "WebhookPayloadInstallation.repositories":
      "WebhookPayloadInstallation_Repositories",
  },
});

const generateEventNameType = (name, actions) => [
  name,
  ...actions.map((action) => {
    return `${name}.${action}`;
  }),
];

const addPayloadWithActions = (name, actions, examples, typeName) => {
  // add the payload without any examples so we can make it a union
  tw.add([], generatePayloadType(typeName));
  tw.keypaths[typeName] = {};

  if (tw.keypaths[`${typeName}Action`]) {
    delete tw.keypaths[`${typeName}Action`].string;

    actions.forEach(
      (action) => (tw.keypaths[`${typeName}Action`][`"${action}"`] = {})
    );
  }

  eventPayloadMapping.push([
    name,
    `WebhookEvent<${eventPayloadsVariable}.${typeName}>`,
  ]);

  actions.forEach((action) => {
    const actionTypeName = `${typeName}${pascalCase(action)}Action`;
    const actionEventName = `${name}.${action}`;

    const examplesForAction = examples.filter(
      (example) => example.action === action
    );

    if (examplesForAction.length === 0) {
      console.warn("No examples exist for", actionEventName);

      examplesForAction.push({ action });
    }

    tw.add(
      examplesForAction,
      generatePayloadType(`${typeName}${pascalCase(action)}Action`)
    );

    // remove the "| string" type, since it can't just any old string
    delete tw.keypaths[`${actionTypeName}Action`].string;
    tw.keypaths[`${actionTypeName}Action`][`"${action}"`] = {};

    // add this action to union of types for the event
    tw.keypaths[typeName][actionTypeName] = {};

    eventPayloadMapping.push([
      actionEventName,
      `WebhookEvent<${eventPayloadsVariable}.${actionTypeName}>`,
    ]);
  });
};

webhooks.forEach(({ name, actions, examples }) => {
  if (!examples) {
    return;
  }

  const typeName = `WebhookPayload${pascalCase(name)}`;

  if (actions.length) {
    addPayloadWithActions(name, actions, examples, typeName);

    return;
  }

  tw.add(examples, generatePayloadType(typeName));

  const eventNameTypes = generateEventNameType(name, actions);
  eventNameTypes.forEach((type) => {
    eventPayloadMapping.push([
      type,
      `WebhookEvent<${eventPayloadsVariable}.${typeName}>`,
    ]);
  });
});

const getWebhookPayloadTypeFromEvent = `
${doNotEditThisFileDisclaimer}

import { ${eventPayloadsVariable} } from "./event-payloads";
import { WebhookEvent, WebhookEventHandlerError } from "../types";

export interface EventTypesPayload {
  ${eventPayloadMapping.map(([name, type]) => `"${name}": ${type}`).join(`,\n`)}
}

export type WebhookEvents = keyof EventTypesPayload
`;

generateFile(
  "src/generated/get-webhook-payload-type-from-event.ts",
  getWebhookPayloadTypeFromEvent
);

const eventPayloadsContent = `
${doNotEditThisFileDisclaimer}

export declare module ${eventPayloadsVariable} {
  ${tw.generate("typescript", { inlined: false })}}
`;

generateFile("src/generated/event-payloads.ts", eventPayloadsContent);
