#!/usr/bin/env ts-node-transpile-only

import { strict as assert } from "node:assert";
import * as fs from "node:fs";
import type { OpenAPI3, OperationObject, PathItemObject } from "./types.js";
import { format } from "prettier";

const schema = (await import("@wolfy1339/openapi-webhooks")).default.schemas[
  "api.github.com"
] as OpenAPI3;

const getEmitterEvents = (): string[] => {
  return Array.from(events).sort();
};
const eventsMap: Record<string, Set<string>> = {};
const events = new Set<string>();

for (let webhookDefinitionKey of Object.keys(schema.webhooks!)) {
  const webhookDefinition = schema.webhooks![
    webhookDefinitionKey
  ] as PathItemObject;
  const operationDefinition = webhookDefinition.post as OperationObject;
  const emitterEventName = operationDefinition
    .operationId!.replace(/-/g, "_")
    .replace("/", ".");

  const [eventName] = emitterEventName.split(".");
  events.add(eventName);
  events.add(emitterEventName);
  eventsMap[eventName] ||= new Set<string>();
  eventsMap[eventName].add(webhookDefinitionKey);
}

const outDir = "src/generated/";

const generateTypeScriptFile = async (name: string, contents: string[]) => {
  fs.writeFileSync(
    `${outDir}/${name}.ts`,
    await format(contents.join("\n"), { parser: "typescript" }),
  );
};

const asCode = (str: string): string => `\`${str}\``;
const asLink = (event: string): string => {
  const link = `https://docs.github.com/en/webhooks-and-events/webhook-events-and-payloads#${event.replace(
    /[^a-z_0-9]/g,
    "",
  )}`;

  return `[${asCode(event)}](${link})`;
};

const updateReadme = async (properties: string[]) => {
  const headers = "| Event | Actions |";

  const events = properties.reduce<Record<string, string[]>>(
    (events, property) => {
      console.log(property);
      const [event, action] = property.split(".");

      events[event] ||= [];

      if (action) {
        events[event].push(action);
      }

      return events;
    },
    {},
  );

  const rows = Object.entries(events).map(
    ([event, actions]) =>
      `| ${asLink(event)} | ${actions.map(asCode).join("<br>")} |`,
  );

  const table = await format([headers, "| --- | --- |", ...rows].join("\n"), {
    parser: "markdown",
  });

  const readme = fs.readFileSync("README.md", "utf-8");

  const TableStartString =
    "<!-- autogenerated via scripts/generate-types.ts -->";
  const TableEndString =
    "<!-- /autogenerated via scripts/generate-types.ts -->";
  const tableStartIndex = readme.indexOf(TableStartString);
  const tableEndIndex = readme.indexOf(TableEndString);

  assert.ok(tableStartIndex !== -1, "cannot find start of table");
  assert.ok(tableEndIndex !== -1, "cannot find end of table");

  fs.writeFileSync(
    "README.md",
    `${readme.slice(
      0,
      tableStartIndex + TableStartString.length,
    )}\n\n${table}\n${readme.slice(tableEndIndex)}`,
  );
};

const run = async () => {
  const emitterEvents = getEmitterEvents();

  await generateTypeScriptFile("webhook-names", [
    "// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY",
    "// make edits in scripts/generate-types.ts",
    "",
    "export const emitterEventNames = [",
    ...emitterEvents.map((key) => `"${key}",`),
    "] as const;",
  ]);

  await generateTypeScriptFile("webhook-identifiers", [
    "// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY",
    "// make edits in scripts/generate-types.ts",
    "",
    "import type { WebhookEventDefinition } from '../types.js';",
    "",
    "export type EventPayloadMap = {",
    ...Object.keys(eventsMap).map(
      (key) =>
        `"${key}": ${Array.from(eventsMap[key])
          .map((event) => `WebhookEventDefinition<` + `"${event}">`)
          .join(" | ")}`,
    ),
    "}",
    "export type WebhookEventName = keyof EventPayloadMap;",
  ]);

  await updateReadme(emitterEvents);
};

run();
