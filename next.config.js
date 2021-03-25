const withCSS = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
]);

module.exports = withPlugins([[withCSS, { target: "serverless" }], [withTM]]);
