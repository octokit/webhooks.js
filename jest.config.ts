import type { Config } from "@jest/types";
import "ts-jest";

const config: Config.InitialOptions = {
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "test/tsconfig.json",
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "ipaddr.js": "<rootDir>/node_modules/ipaddr.js/lib/ipaddr.js",
    "^(.+)\\.jsx?$": "$1",
  },
  restoreMocks: true,
  testEnvironment: "node",
  testRegex: /test\/.*\/.*.test.ts/u.source,
};

// We have to use a CommonJS export here due to `verbatimModuleSyntax`
module.exports = config;
