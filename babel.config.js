
module.exports = function(api) {
  api.cache(true);
  return {
    "presets":["@babel/preset-env"],
    "ignore": [/@babel[\/\\]runtime/],
    "plugins":["@babel/plugin-transform-runtime", "@babel/plugin-transform-modules-commonjs"],
    "babelrcRoots": [".", "node_modules"]
  };
}