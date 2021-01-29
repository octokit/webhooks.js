import { Config } from "@jest/types";
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
  globals: {
    "ts-jest": {
      tsconfig: {
        esModuleInterop: true,
      },
    },
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: /test\/.*\/.*.test.ts/u.source,
};

export default config;
