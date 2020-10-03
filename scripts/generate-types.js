const { pascalCase } = require("pascal-case");
const TypeWriter = require("@gimenete/type-writer");
const webhooks = require("@octokit/webhooks-definitions/index.json");
const { generateFile } = require("./generate-file");

const tw = new TypeWriter();
const eventPayloadMapping = [
  ["error", "WebhookEventHandlerError"],
  ["*", "any"],
];

const doNotEditThisFileDisclaimer = `
// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
// make edits in scripts/generate-types.js`;
const eventPayloadsVariable = "EventPayloads";
const eventNamesVariable = "EventNames";

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

webhooks.forEach(({ name, actions, examples }) => {
  if (!examples) {
    return;
  }

  const typeName = `WebhookPayload${pascalCase(name)}`;
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
`;

generateFile(
  "src/generated/get-webhook-payload-type-from-event.ts",
  getWebhookPayloadTypeFromEvent
);

const eventNamesContet = `
${doNotEditThisFileDisclaimer}
import {EventTypesPayload} from './get-webhook-payload-type-from-event';
export declare module ${eventNamesVariable} {
  type All = keyof EventTypesPayload
}
`;

generateFile("src/generated/event-names.ts", eventNamesContet);

const eventPayloadsContet = `
${doNotEditThisFileDisclaimer}

export declare module ${eventPayloadsVariable} {
  ${tw.generate("typescript", { inlined: false })}}
`;

generateFile("src/generated/event-payloads.ts", eventPayloadsContet);
