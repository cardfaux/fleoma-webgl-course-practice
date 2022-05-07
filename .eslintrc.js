module.exports = {
  root: true,
  extends: [""],
  globals: {
    IS_DEVELOPMENT: "readonly",
  },
  parserOptions: {
    ecmasVersion: 2020,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single"],
  },
};
