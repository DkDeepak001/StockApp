import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/commons/button";
import AuthHomeImage from '../../../assets/images/auth/home.png'
import { Image } from "expo-image";
export default function AuthHome() {
  const router = useRouter()
  return (
    <SafeAreaView className="bg-black flex flex-1  items-center justify-center gap-y-10">
      <View className="w-full h-2/5 ">
        <Image source={AuthHomeImage} className="w-full h-full -ml-4" />
      </View>
      <View className="w-screen items-center gap-y-3">
        <Text className="font-bold text-white text-3xl text-center px-14 mb-2">Welcome to Investors Insight Hub</Text>
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
