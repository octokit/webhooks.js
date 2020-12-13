const fs = require("fs");

const pathToEventPayloads = "src/generated/event-payloads.ts";

const eventPayloadsRaw = fs.readFileSync(pathToEventPayloads, "utf-8");
let updatedPayloadsRaw = eventPayloadsRaw;

const removeType = (typeName) => {
  const startOfTypeIndex = eventPayloadsRaw.indexOf(`type ${typeName} =`) + 2;
  let endOfTypeIndex = eventPayloadsRaw.indexOf("type ", startOfTypeIndex + 1);

  if (endOfTypeIndex === -1) {
    endOfTypeIndex = eventPayloadsRaw.indexOf(";\n}", startOfTypeIndex) + 1;
  }

  if (startOfTypeIndex === -1) {
    throw new Error(`could not find start of type named "${typeName}"`);
  }

  if (endOfTypeIndex === -1) {
    throw new Error(`could not find end of type named "${typeName}"`);
  }

  const fullType = updatedPayloadsRaw.slice(
    startOfTypeIndex - 2,
    endOfTypeIndex
  );

  console.log(fullType);

  updatedPayloadsRaw = updatedPayloadsRaw.replace(fullType, "");
};

const replaceTypeBody = (typeName, newBody) => {
  const startOfTypeIndex = eventPayloadsRaw.indexOf(`type ${typeName} =`) + 2;
  let endOfTypeIndex = eventPayloadsRaw.indexOf("type ", startOfTypeIndex + 1);

  if (endOfTypeIndex === -1) {
    endOfTypeIndex = eventPayloadsRaw.indexOf(";\n}", startOfTypeIndex) + 1;
  }

  if (startOfTypeIndex === -1) {
    throw new Error(`could not find start of type named "${typeName}"`);
  }

  if (endOfTypeIndex === -1) {
    throw new Error(`could not find end of type named "${typeName}"`);
  }

  const currentBody = updatedPayloadsRaw.slice(
    startOfTypeIndex + `type ${typeName} =`.length,
    endOfTypeIndex
  );

  updatedPayloadsRaw = updatedPayloadsRaw.replace(currentBody, newBody);
};

const openingBraceIndex = eventPayloadsRaw.indexOf("{");
const closingBraceIndex = eventPayloadsRaw.lastIndexOf("}");

const whatsInBetween = eventPayloadsRaw.substring(
  openingBraceIndex + 1,
  closingBraceIndex
);

const parseRawType = (rawType) => {
  const indexOfEquals = rawType.indexOf("=");
  const lengthOfType = rawType.startsWith("type ") ? "type ".length : 0;

  const name = rawType.substring(lengthOfType, indexOfEquals).trim();
  const body = rawType.substring(indexOfEquals, rawType.lastIndexOf(";"));

  return [name, body];
};

const parseTypeName = (typeName) => {
  const removeStart = typeName.substring("WebhookPayload".length);
  const chars = removeStart.split("");
  let eventName = chars.shift() ?? "";

  while (!whatsInBetween.includes(`WebhookPayload${eventName} =`)) {
    const nextChar = chars.shift();

    if (!nextChar) {
      throw new Error();
    }

    eventName += nextChar;
  }

  if (chars.length) {
    const actionName = typeName.substring(
      `WebhookPayload${eventName}`.length,
      typeName.indexOf("Action")
    );

    const whatsLeft = typeName.substring(
      `WebhookPayload${eventName}${actionName}Action`.length
    );
    return [eventName, actionName, whatsLeft];
  }

  return [eventName];
};

const groupCountsByEventName = (count) => {
  const eventNames = {};

  count.names.map(parseTypeName).forEach(([eventName]) => {
    if (!(eventName in eventNames)) {
      eventNames[eventName] = 0;
    }

    eventNames[eventName] += 1;
  });

  return eventNames;
};

const counts = {};
const countType = ([name, body]) => {
  if (!(body in counts)) {
    counts[body] = { count: 0, names: [] };
  }

  counts[body].count += 1;
  counts[body].names.push(name);
};

const rawTypes = whatsInBetween
  .trim()
  .split("type ")
  .slice(1)
  .map((s) => `type ${s}`)
  .map(parseRawType);

module.exports = rawTypes;

rawTypes.forEach(countType);

module.exports.counts = counts;

let duplicatedLines = 0;

Object.entries(counts)
  .filter(([, count]) => count.count > 1)
  .forEach(([body, count]) => {
    duplicatedLines += body.split("\n").length * (count.count - 1);

    const groupedByEventNames = groupCountsByEventName(count);

    console.log(
      "type was seen",
      count.count,
      "times - body is",
      body.length,
      "chars",
      `(${body.split("\n").length} lines)`,
      groupedByEventNames
    );
  });

console.warn("could have saved", duplicatedLines, "lines");

const someTypes = Array.from(
  eventPayloadsRaw.matchAll(/type (\w+) = (\w+);\n/g)
);

someTypes.forEach(([, typeName, typeAliasName]) => {
  const [, aliasFor] =
    someTypes.find(([, typeName2]) => {
      return typeName2 === typeAliasName;
    }) || [];

  if (aliasFor) {
    console.log(aliasFor);

    // replaceTypeBody(typeName, aliasFor);
  }
});

// removeType("WebhookPayloadCheckRunRequestedActionActionCheckRunAppOwner");
fs.writeFileSync(pathToEventPayloads, updatedPayloadsRaw);
