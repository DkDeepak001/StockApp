module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "nativewind/babel",
        {
          allowModuleTransform: [
            "expo-image",
            "react-native-safe-area-context",
            "react-native",
            "react-native-gesture-handler",
          ],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
