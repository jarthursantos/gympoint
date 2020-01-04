module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "prettier",
    "prettier/react",
  ],
  globals: {
    __DEV__: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "prettier",
    "import-helpers"
  ],
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
    "no-param-reassign": "off",
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
        "warn",
        {
        extensions: ['.jsx', 'js'],
        }
    ],
    "camelcase": "off",
    "import/prefer-default-export": "off",
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    }
  }
};