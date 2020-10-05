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

export type All = keyof EventTypesPayload
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
