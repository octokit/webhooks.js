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
  transform: {
    "^.+\\.tsx?$": ["ts-jest",
      {
        tsconfig: "test/tsconfig.json",
      }
    ],
  },
  restoreMocks: true,
  testEnvironment: "node",
  testRegex: /test\/.*\/.*.test.ts/u.source,
};

// We have to use a CommonJS export here due to `verbatimModuleSyntax`
module.exports = config;
