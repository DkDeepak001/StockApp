import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/commons/button";

export default function AuthHome() {
  const router = useRouter()
  return (
    <SafeAreaView className="bg-black flex flex-1  items-center justify-center">
      <View className="w-screen items-center gap-y-3">
        <Button variants="fill" onPress={() => router.push('/login')}>
          <Text className="text-black font-bold text-lg">Login</Text>
        </Button>
        <Button variants="outline" onPress={() => router.push("/register")}>
          <Text className="text-white font-bold text-lg">Register</Text>
        </Button>

      </View>
    </SafeAreaView>
  )
}
