module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: "readonly",
  },
  extends: [
    "airbnb",

    "plugin:react/recommended",
    "plugin:react-hooks/recommended",

    "plugin:jsx-a11y/strict",

    "plugin:prettier/recommended",
    "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2017,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jsx-a11y"],
  rules: {
    // Use typescript rules here
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_$" },
    ],

    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
    "react-hooks/exhaustive-deps": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",

    // Next.js
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],

    quotes: ["error", "double", { avoidEscape: true }],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],

    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],

    "default-case": ["error", { commentPattern: "^All\\scases\\sspecified" }],
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
