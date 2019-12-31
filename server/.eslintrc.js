module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', "import-helpers"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "/^react/",
          "module",
          "/^~/",
          ["parent", "sibling", "index"],
        ],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
};
