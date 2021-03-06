module.exports = function(api) {
  api.cache.using(isBrowser);

  let presets = ["@babel/preset-react"];
  let plugins = [moduleResolverPlugin(), '@babel/plugin-proposal-class-properties'];

  if (isBrowser()) {
    presets.push(envPresetForBrowser());
    plugins.push(stripTestIdsPlugin());
  } else {
    presets.push(envPresetForNode());
    plugins.push(ignoreStylesPlugin());
    plugins.push(ignoreImagesPlugin());
  }

  return { presets, plugins };
};

function isBrowser() {
  return process.env.BABEL_ENV === 'browser';
}

function moduleResolverPlugin() {
  return [
    "module-resolver",
    {
      "root": [
        "./lib"
      ],
      "alias": {
        "test": "./test",
        "styles": "./styles",
        "images": "./images",
        "support": "./support"
      }
    }
  ];
}

function envPresetForBrowser() {
  return [
    "@babel/preset-env", 
    {
      "useBuiltIns": "entry", 
      "debug": false,
      "corejs": 3
    }
  ];
}

function envPresetForNode() {
  return [
    "@babel/preset-env", 
    {
      targets: {
        esmodules: true,
      },
    }
  ];
}

function stripTestIdsPlugin() {
  return [
    "react-remove-properties", 
    {
      "properties": ["test-id"]
    }
  ];
}

function ignoreStylesPlugin() {
  return [
    "transform-require-ignore", 
    { 
      "extensions": [".less", ".sass", "scss"] 
    }
  ];
}

function ignoreImagesPlugin() {
  return [
    "transform-assets", 
    { 
      "extensions": ["svg", "png", "jpg", "jpeg", "gif"],
      "name": "[name].[ext]"
    }
  ];
}
