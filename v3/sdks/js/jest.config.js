module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.polywrap/"],
  globals: {
    'ts-jest': {
      tsconfig: "tsconfig.json",
      diagnostics: false
    }
  }
};
