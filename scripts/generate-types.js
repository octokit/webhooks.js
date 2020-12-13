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

    // const typesForThisAction = Object.keys(tw.keypaths).filter((k) =>
    //   k.startsWith(`${typeName}${pascalCase(action)}Action`)
    // );
    //
    // typesForThisAction.forEach((tName) => {
    //   const similarTypes = tw.findSimilarTypes(tName);
    //
    //   similarTypes.forEach(([theName, similarType]) => {
    //     tw.keypaths[similarType] = { [theName]: {} };
    //     // delete tw.keypaths[similarType];
    //   });
    // });

    // console.log(typesForThisAction);

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

// ItemHeadRepo
tw.add([{ id: 0, url: "string", name: "string" }], {
  rootTypeName: "ItemHeadRepo",
});

tw.add([{ ref: "string", sha: "string", repo: "ItemHeadRepo" }], {
  rootTypeName: "ItemHead",
});

tw.add([{ id: 0, url: "string", name: "string" }], {
  rootTypeName: "ItemBaseRepo",
});

tw.add([{ ref: "string", sha: "string", repo: "ItemBaseRepo" }], {
  rootTypeName: "ItemBase",
});

tw.add(
  [{ url: "string", id: 0, number: 0, head: "ItemHead", base: "ItemBase" }],
  {
    rootTypeName: "Item",
  }
);

delete tw.keypaths.ItemHeadRepo.string;
delete tw.keypaths.ItemBaseRepo.string;
delete tw.keypaths.ItemHead.string;
delete tw.keypaths.ItemBase.string;
delete tw.keypaths.Item.string;

console.log(tw.keypaths.ItemHead);
console.log(tw.keypaths.ItemHeadRepo);

const replaceWithCommonTypePre = (commonTypeName) => [
  commonTypeName,
  Object.keys(tw.keypaths)
    .filter((k) => k.endsWith(commonTypeName) && k !== commonTypeName)
    .reduce((all, typeName) => {
      delete tw.keypaths[typeName];

      all.push(typeName);

      return all;
    }, []),
];

const replaceWithCommonTypePost = (commonTypeName, typesToReplace) => {
  typesToReplace.forEach((typeName) => {
    console.log(typeName);
    eventPayloadsContent = eventPayloadsContent
      .split("\n")
      .filter((line) => !line.trim().startsWith(`type ${typeName} = any`))
      .join("\n");
    eventPayloadsContent = eventPayloadsContent.replace(
      `: ${typeName}`,
      `: ${commonTypeName}`
    );
    eventPayloadsContent = eventPayloadsContent.replace(
      `<${typeName}>`,
      `<${commonTypeName}>`
    );
  });
};

const allTypesToReplace = [
  "ItemHeadRepo",
  "ItemHead",
  "ItemBaseRepo",
  "ItemBase",
  "Item",
].map(replaceWithCommonTypePre);

let eventPayloadsContent = `
${doNotEditThisFileDisclaimer}

export declare module ${eventPayloadsVariable} {
  ${tw.generate("typescript", { inlined: false })}}
`;

allTypesToReplace.forEach(([commonTypeName, typesToReplace]) => {
  replaceWithCommonTypePost(commonTypeName, typesToReplace);
});

generateFile("src/generated/event-payloads.ts", eventPayloadsContent);
