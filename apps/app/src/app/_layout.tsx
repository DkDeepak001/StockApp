
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { TRPCProvider } from "~/utils/api";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function RootLayout() {
  return <RootLayoutNav />;
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return AsyncStorage.getItem(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return AsyncStorage.setItem(key, value);
    } catch (err) {
      return;
    }
  },
};


function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <TRPCProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <AuthInitalizer />
            <FlashMessage position="top" hideStatusBar={false} statusBarHeight={StatusBar.currentHeight} />


          </SafeAreaProvider>
        </GestureHandlerRootView>
      </TRPCProvider>
    </ClerkProvider>
  );
}


const AuthInitalizer = () => {
  const { isSignedIn } = useAuth()
  const segment = useSegments()
  const router = useRouter()

  useEffect(() => {
    const isTabGroup = segment[0] === "(auth)"
    console.log("AuthInitalizer", isSignedIn, isTabGroup, segment)

    if (isSignedIn && !isTabGroup) {
      router.replace("/(tabs)/feed")
    } else {
      router.replace("/onboarding")
    }
  }, [isSignedIn])

  return <Slot />
}
