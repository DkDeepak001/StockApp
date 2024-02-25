import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "react-native";
import { api } from "~/utils/api";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter()
  const { data } = api.auth.getSession.useQuery();
  const { signOut } = useAuth()
  const handleLogout = () => {
    console.log("logout")
    signOut()
  }
  return (
    <View className="flex-1 bg-black">
      <Text className="text-white">Tab One</Text>
      <View className="" />
      <Pressable onPress={handleLogout} className="bg-red-400 px-4 py-2">
        <Text className="text-white font-bold">Logout</Text>
      </Pressable>
    </View>
  );
}

