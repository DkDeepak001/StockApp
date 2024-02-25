import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { TRPCProvider } from "~/utils/api";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        <AuthInitalizer />
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
      router.replace("/home")
    } else {
      router.replace("/login")
    }
  }, [isSignedIn])

  return <Slot />
}
