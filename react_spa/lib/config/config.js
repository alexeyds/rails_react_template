let node_env = process.env.NODE_ENV;
let babel_env = process.env.BABEL_ENV;

let env = {
  isTest: node_env === "test",
  isDevelopment: node_env === "development",
  isProduction: node_env === "production",
  isBrowser: babel_env === "browser"
};

export default {
  env
};