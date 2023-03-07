module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  ignorePatterns: ["**/wrap/**/*.ts", "**/__tests__/**/*.*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "es2019",
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    "eslint-plugin-import",
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "prettier/prettier": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_",
    }],
    "@typescript-eslint/no-floating-promises": "error",
    "import/order": [
      "error",
      {
        "groups": [["index", "sibling", "parent", "internal"], ["external", "builtin"], "object"],
        "newlines-between": "always"
      }
    ],
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/naming-convention": ["error",
      {selector: "default", format: ['camelCase']},
      {selector: ["objectLiteralProperty", "parameterProperty", "classMethod"], format: ['camelCase'], leadingUnderscore: "allow"},
      //variable must be in camel or upper case
      {selector: ["classProperty", "variable"], format: ["camelCase", "UPPER_CASE"], leadingUnderscore: "allow"},
      //classes and types must be in PascalCase
      {selector: ["typeLike", "enum"], format: ['PascalCase']},
      {selector: ["parameter"], format: ['snake_case', "camelCase"], leadingUnderscore: "allow"},
      {selector: "enumMember", format: null},
      {selector: "function", format: null, leadingUnderscore: "allowSingleOrDouble"},
    ],
  },
  "overrides": [
    {
      "files": ["**/__tests__/**/*.ts", "*.spec.ts"],
      "rules": {
        "import/no-extraneous-dependencies": "off"
      }
    },
    {
      "files": ["*.d.ts"],
      "rules": {
        "@typescript-eslint/triple-slash-reference": "off"
      }
    }
  ]
};