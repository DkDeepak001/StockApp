import { useSignIn, useSession } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native'
export default function LoginScreen() {
  let router = useRouter()
  const { signIn, isLoaded, setActive } = useSignIn()
  const { session } = useSession()

  const handleLogin = async () => {
    try {
      tryLogin()
    } catch (err: any) {
      if (err.errors && err.errors.length > 0 && err.errors[0].longMessage.includes("You're currently in single session mode")) {
        session?.end()
        tryLogin()
      }
      console.error("error", err.errors[0].longMessage)
    }

  }

  const tryLogin = async () => {
    if (!isLoaded) return
    console.log("----------")
    try {
      const result = await signIn.create({
        identifier: '',
        password: "",
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.replace("/home")
      }
      else {
        console.log(result);
      }
    } catch (error) {

    }

  }


  return (
    <View className="flex-1 justify-center items-center  bg-black">
      <View className="flex-row gap-x-2">
        <Pressable onPress={handleLogin} className='bg-white px-5 py-2 rounded-lg'>
          <Text className='text-black font-bold'>login</Text>
        </Pressable>
        <Link href={'/register'} className='bg-sky-500 px-5 py-2 rounded-lg'><Text className='text-white'>Register</Text></Link>
      </View>
    </View >
  );
}

