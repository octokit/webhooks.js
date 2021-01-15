#!/usr/bin/env ts-node-transpile-only

import { strict as assert } from "assert";
import * as fs from "fs";
import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { format } from "prettier";

type JSONSchemaWithRef = JSONSchema7 & Required<Pick<JSONSchema7, "$ref">>;

interface Schema extends JSONSchema7 {
  definitions: Record<string, JSONSchema7>;
  oneOf: JSONSchemaWithRef[];
}

const schema = require("@octokit/webhooks-definitions/schema.json") as Schema;

const titleCase = (str: string) => `${str[0].toUpperCase()}${str.substring(1)}`;

const guessAtInterfaceName = (str: string) =>
  str.split(/[$_-]/u).map(titleCase).join("");

const guessAtEventName = (name: string) => {
  const [, eventName] = /^(.+)[$_-]event/u.exec(name) ?? [];

  assert.ok(eventName, `unable to guess event name for "${name}"`);

  return eventName;
};
const guessAtActionName = (name: string) => name.replace("$", ".");

const getDefinitionName = (ref: string): string => {
  assert.ok(
    ref.startsWith("#/definitions/"),
    `${ref} does not reference a valid definition`
  );

  const [, name] = /^#\/definitions\/(.+)$/u.exec(ref) ?? [];

  assert.ok(name, `unable to find definition name ${ref}`);

  return name;
};

type NameAndActions = [name: string, actions: string[]];
type Property = [key: string, value: string];
type ImportsAndProperties = [imports: string[], properties: Property[]];

const buildEventProperties = ([
  eventName,
  actions,
]: NameAndActions): ImportsAndProperties => {
  const interfaceName = guessAtInterfaceName(eventName);
  const importsAndProperties: ImportsAndProperties = [
    [interfaceName],
    [[guessAtEventName(eventName), interfaceName]],
  ];

  if (actions.length) {
    actions.forEach((actionName) => {
      const actionInterfaceName = guessAtInterfaceName(`${actionName}_event`);

      importsAndProperties[0].push(actionInterfaceName);
      importsAndProperties[1].push([
        guessAtActionName(actionName),
        actionInterfaceName,
      ]);
    });
  }

  return importsAndProperties;
};

const isJSONSchemaWithRef = (
  object: JSONSchema7Definition
): object is JSONSchemaWithRef =>
  typeof object === "object" && object.$ref !== undefined;

const listEvents = () => {
  return schema.oneOf.map<NameAndActions>(({ $ref }) => {
    const name = getDefinitionName($ref);
    const definition = schema.definitions[name];

    assert.ok(definition, `unable to find definition named ${name}`);

    if (definition.oneOf?.every(isJSONSchemaWithRef)) {
      return [name, definition.oneOf.map((def) => getDefinitionName(def.$ref))];
    }

    return [name, []];
  });
};

const getImportsAndProperties = (): ImportsAndProperties => {
  const importsAndProperties = listEvents().map(buildEventProperties);

  return importsAndProperties.reduce<ImportsAndProperties>(
    (allImportsAndProperties, [imports, properties]) => {
      return [
        allImportsAndProperties[0].concat(imports),
        allImportsAndProperties[1].concat(properties),
      ];
    },
    [[], []]
  );
};

const outDir = "src/generated/";

const generateTypeScriptFile = (name: string, contents: string[]) => {
  fs.writeFileSync(
    `${outDir}/${name}.ts`,
    format(contents.join("\n"), { parser: "typescript" })
  );
};

const run = () => {
  const [imports, properties] = getImportsAndProperties();

  const lines: string[] = [
    "// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY",
    "// make edits in scripts/generate-types.ts",
    "",
    "import {",
    ...imports.map((str) => `  ${str},`),
    '} from "@octokit/webhooks-definitions/schema";',
    "",
    "export interface EmitterEventWebhookPayloadMap {",
    ...properties.map(([key, value]) => `"${key}": ${value}`),
    "}",
  ];

  generateTypeScriptFile("get-webhook-payload-type-from-event", lines);
  generateTypeScriptFile("webhook-names", [
    "// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY",
    "// make edits in scripts/generate-types.ts",
    "",
    "export const emitterEventNames = [",
    '"*",',
    '"error",',
    ...properties.map(([key]) => `"${key}",`),
    "];",
  ]);
};

run();
