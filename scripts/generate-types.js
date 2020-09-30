const { pascalCase } = require("pascal-case");
const TypeWriter = require("@gimenete/type-writer");
const webhooks = require("@octokit/webhooks-definitions/index.json");
const { generateFile } = require("./generate-file");

const eventTypes = [];
const tw = new TypeWriter();

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

const generateEventNameType = (event, name, actions) => `type ${event} =
      | "${name}"
      ${actions
        .map((action) => {
          return `| "${name}.${action}"`;
        })
        .join("\n")}
`;

eventTypes.push(`type ErrorEvent = "error"`, `type WildcardEvent = "*"`);

const conditionalType = [
  `export type GetWebhookPayloadTypeFromEvent<E = EventNames.All, T = WebhookEvent> = `,
  `E extends ${eventNamesVariable}.ErrorEvent ? WebhookEventHandlerError :`,
  `E extends ${eventNamesVariable}.WildcardEvent ? any :`,
];

webhooks.forEach(({ name, actions, examples }) => {
  if (!examples) {
    return;
  }

  const typeName = `WebhookPayload${pascalCase(name)}`;
  tw.add(examples, generatePayloadType(typeName));

  const event = `${pascalCase(name)}Event`;

  const eventNameType = generateEventNameType(event, name, actions);
  const eventNameTypeKey = eventNameType.split(" ")[1];

  eventTypes.push(eventNameType);
  conditionalType.push(
    `E extends ${eventNamesVariable}.${eventNameTypeKey} ? WebhookEvent<${eventPayloadsVariable}.${typeName}> & T:`
  );
});

conditionalType.push("never");

const getWebhookPayloadTypeFromEvent = `
${doNotEditThisFileDisclaimer}

import { ${eventNamesVariable} } from "./event-names";
import { ${eventPayloadsVariable} } from "./event-payloads";
import { WebhookEvent, WebhookEventHandlerError } from "../types";

${conditionalType.join("\n")}
`;

generateFile(
  "src/generated/get-webhook-payload-type-from-event.ts",
  getWebhookPayloadTypeFromEvent
);

const eventNamesContet = `
${doNotEditThisFileDisclaimer}

export declare module ${eventNamesVariable} {
  ${eventTypes.join("\n")}

  type StringNames =
    ${webhooks.map(({ name }) => `"${name}"`).join(" | ")};

  type All =
    ${eventTypes.map((event) => event.split(" ")[1]).join(" | ")};
}
`;

generateFile("src/generated/event-names.ts", eventNamesContet);

const eventPayloadsContet = `
${doNotEditThisFileDisclaimer}

export declare module ${eventPayloadsVariable} {
  ${tw.generate("typescript", { inlined: false })}}
`;

generateFile("src/generated/event-payloads.ts", eventPayloadsContet);
