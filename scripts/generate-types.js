const { pascalCase } = require("pascal-case");
const TypeWriter = require("@gimenete/type-writer");
const webhooks = require("@octokit/webhooks-definitions/index.json");
const { generateFile } = require("./generate-file");

const eventTypes = [];
const tw = new TypeWriter();

const doNotEditThisFileDisclaimer = `
// DO NOT EDIT THIS FILE DIRECTLY
// make edits in scripts/generate-types.js
`;
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

eventTypes.push(
  `type ErrorEvent = "error"`,
  `type WildcardEvent = "*"`
)

const conditionalType = [
  `type GetWebhookPayloadTypeFromEvent<T> = `,
  `T extends ${eventNamesVariable}.ErrorEvent ? Error :`,
  `T extends ${eventNamesVariable}.WildcardEvent ? any :`,
];

webhooks.forEach(({ name, actions, examples }) => {
  if (!examples) {
    return;
  }

  const typeName = `WebhookPayload${pascalCase(name)}`;
  tw.add(examples, generatePayloadType(typeName));

  const event = `${pascalCase(name)}Event`;

  const eventNameType = generateEventNameType(event, name, actions);
  const eventNameTypeKey = eventNameType.split(' ')[1];

  eventTypes.push(eventNameType);
  conditionalType.push(
    `T extends ${eventNamesVariable}.${eventNameTypeKey} ? ${eventPayloadsVariable}.WebhookEvent<${eventPayloadsVariable}.${typeName}> :`
  );
});

conditionalType.push('never')

const definitionTypes = `
${doNotEditThisFileDisclaimer}
export { EventNames } from './event-names'
export { EventPayloads } from './event-payloads'
export { Webhooks } from './api'
`;

generateFile("src/generated/types.ts", definitionTypes);

const apiContent = `
import http from "http";
import { ${eventNamesVariable} } from "./event-names";
import { ${eventPayloadsVariable} } from "./event-payloads";
type Options = {
  secret: string
  path?: string
  transform?: (event: ${eventPayloadsVariable}.WebhookEvent<any>) => ${eventPayloadsVariable}.WebhookEvent<any> & { [key: string]: any }
}

${conditionalType.join("\n")}

declare class Webhooks {
  constructor (options?: Options)
  public on <T extends ${eventNamesVariable}.AllEventTypes>(event: T | T[], callback: (event: GetWebhookPayloadTypeFromEvent<T>) => Promise<void> | void): void
  public sign (data: any): string
  public verify (eventPayload: any, signature: string): boolean
  public verifyAndReceive (options: { id: string, name: string, payload: any, signature: string }): Promise<void>
  public receive (options: { id: string, name: string, payload: any }): Promise<void>
  public removeListener <T extends ${eventNamesVariable}.AllEventTypes>(event: T | T[], callback: (event: GetWebhookPayloadTypeFromEvent<T>) => Promise<void> | void): void
  public middleware (request: http.IncomingMessage, response: http.ServerResponse, next?: (err?: any) => void): void | Promise<void>
}

export default Webhooks;
export { Webhooks };
`;

generateFile("src/generated/api.ts", apiContent);

const eventNamesContet = `
${doNotEditThisFileDisclaimer}
export declare module ${eventNamesVariable} {
  ${eventTypes.join("\n")}
  type AllEventTypes =
    ${eventTypes
    .map((event) => event.split(' ')[1])
    .join(" | ")};
}
`;

generateFile("src/generated/event-names.ts", eventNamesContet);

const eventPayloadsContet = `
${doNotEditThisFileDisclaimer}
export declare module ${eventPayloadsVariable} {
  ${tw.generate("typescript", { inlined: false })}
  interface WebhookEvent<T> {
    id: string;
    name: string;
    payload: T;
    protocol?: "http" | "https";
    host?: string;
    url?: string;
  }
}
`;

generateFile("src/generated/event-payloads.ts", eventPayloadsContet);
