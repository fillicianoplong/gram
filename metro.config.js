const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const asyncStorageRoot = path.dirname(
  require.resolve("@react-native-async-storage/async-storage/package.json")
);

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "@react-native-async-storage/async-storage") {
    return {
      filePath: path.join(asyncStorageRoot, "lib/commonjs/index.js"),
      type: "sourceFile",
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
