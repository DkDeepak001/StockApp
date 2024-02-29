import type { ExpoConfig } from "expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "stockapp",
  slug: "stockapp",
  version: "1.0.0",
  owner: "dk_deepak",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  assetBundlePatterns: [" **/* "],
  ios: {
    bundleIdentifier: "com.stockapp",
    supportsTablet: true,
  },
  android: {
    package: "com.stockapp",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#000000",
    },
  },
  extra: {
    eas: {
      projectId: "ca406790-6e94-43b0-ae96-86455b9121c4",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
});
export default defineConfig;
