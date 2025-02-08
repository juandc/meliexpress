import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./", });

const config: Config = {
  roots: ["./src/app/(api)", "./src/api"],
  coverageProvider: "v8",
  testEnvironment: "node",
  moduleNameMapper: {
    // Uncomment to provide the Next.js cache function
    // react: "next/dist/compiled/react/cjs/react.development.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default createJestConfig(config);
