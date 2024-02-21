module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "airbnb",
    "plugin:import/errors", 
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
        "moduleDirectory": ["node_modules", "src/"],
        "paths": ["src"]
      }
    }
  },
  plugins: [
    'react-refresh',
    "react",
    "@typescript-eslint"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-unused-vars": 0,
    "comma-dangle": ["error", "always-multiline"],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/media-has-caption": "off",
    "import/order": [
      "error",
      {
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "newlines-between": "always",
        "pathGroups": [
          { "group": "internal", "position": "after", "pattern": "pages/**" },
          { "group": "internal", "position": "after", "pattern": "widgets/**" },
          { "group": "internal", "position": "after", "pattern": "features/**" },
          { "group": "internal", "position": "after", "pattern": "entities/**" },
          { "group": "internal", "position": "after", "pattern": "shared/**" },
          { "group": "external", "position": "before", "pattern": "react" }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"]
      }
    ],
    "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
  },
}