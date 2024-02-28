import { useSignIn, useSession } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/commons/button';
import { FormInput } from '~/components/commons/textInput';
export default function LoginScreen() {
  let router = useRouter()
  const { signIn, isLoaded, setActive } = useSignIn()
  const { session } = useSession()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
    console.log(email, password)

    try {
      const result = await signIn.create({
        identifier: email,
        password,
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
      console.log(error.errors[0], "trylognin")
    }

  }


  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <FormInput placeholder='Enter your email address' onChangeText={(text) => setEmail(text)} />
      <FormInput placeholder='Enter Your Password' onChangeText={(text) => setPassword(text)} />
      <Button variants='fill' onPress={handleLogin}>
        <Text className="text-black font-bold text-lg">Login</Text>
      </Button>
    </SafeAreaView >
  );
}

