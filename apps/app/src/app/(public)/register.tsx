import { useSignUp } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native'

export default function RegisterScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [code, setCode] = useState<string>("")

  const handleReg = async () => {
    try {
      await signUp?.create({
        password: "",
        emailAddress: "",
        username: '',
        firstName: "",
        lastName: ""
      })

      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" })
    } catch (error) {
      // @ts-ignore
      console.log(error?.errors[0].message)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code })
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };


  return (
    <View className="flex-1 justify-center items-center  bg-black">
      <View className="flex-row gap-x-2">
        <Link href={'/login'} className='bg-sky-500 px-5 py-2 rounded-lg'><Text className='text-white'>Login</Text></Link>
        <Pressable onPress={handleReg} className='bg-white px-5 py-2 rounded-lg'>
          <Text className='text-black font-bold'>Register</Text>
        </Pressable>
      </View>
      <View className='flex gap-y-4 my-5'>
        <TextInput placeholder='Enter a code ' placeholderTextColor={"white"} className='text-white border border-white px-5 py-2 w-2/4' textContentType='oneTimeCode' onChangeText={text => setCode(text)} />
        <Pressable onPress={onPressVerify} className='bg-green-200 px-5 py-2 rounded-lg'>
          <Text className='text-black font-bold'>verify</Text>
        </Pressable>

      </View>
    </View >
  );
}



