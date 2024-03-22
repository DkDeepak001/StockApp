
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { TRPCProvider } from "~/utils/api";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync()
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
    const checkAsyncStorage = async () => {
      const isTabGroup = segment[0] === "(tabs)";
      const isFirstTimeUser = !(await AsyncStorage.getItem('hasVisited')); // Use AsyncStorage to check if user has visited before

      console.log("AuthInitializer", isSignedIn, isTabGroup, segment, isSignedIn, isFirstTimeUser);

      if (isSignedIn !== undefined) {
        if (isSignedIn && !isTabGroup) {
          router.replace("/(tabs)/feed");
        } else if (isFirstTimeUser) {
          router.replace("/onboarding");
          await AsyncStorage.setItem('hasVisited', 'true'); // Use AsyncStorage to set the flag
        } else {
          router.replace("/authHome"); // Replace 'authHome' with the route for authenticated home page
        }
        await SplashScreen.hideAsync()
      }
    };

    checkAsyncStorage(); // Call the async function
  }, [isSignedIn]);



  return <Slot />
}
