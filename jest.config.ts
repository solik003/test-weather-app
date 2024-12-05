import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Using ts-jest for TypeScript support
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  testEnvironment: 'jest-environment-jsdom', // Ensure jsdom is used for tests
  setupFiles: ["<rootDir>/src/setupTests.ts"],
    "moduleNameMapper": {
      "\\.(scss|css)$": "identity-obj-proxy"
    }
};

export default config;
