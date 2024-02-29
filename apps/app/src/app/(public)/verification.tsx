import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button } from "~/components/commons/button";
import { BasicInput } from "~/components/commons/textInput";
import VerifyImage from '../../../assets/images/auth/verification.png'
import { Image } from "expo-image";
export default function AuthHome() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState<string>("")

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code })
      await setActive({ session: completeSignUp.createdSessionId });
      showMessage({
        message: "Verification Success",
        type: 'success'
      })
    } catch (err: any) {
      showMessage({
        message: `${err.errors[0].longMessage}`,
        type: "danger"
      })
      console.error(JSON.stringify(err, null, 2));
    }
  }
  return (
    <View className="flex flex-1 items-center justify-center">
      <View className="w-full h-96 ">
        <Image source={VerifyImage} className="w-full h-full ml-5" contentFit="contain" />
      </View>

      <BasicInput
        onChangeText={(text) => setCode(text)}
        placeholder="Enter the Verification code"
        value={code}
        className="w-3/4 mb-4 py-4"
      />
      <Button variants="fill" onPress={onPressVerify}>
        <Text className="text-black font-bold text-lg ">Verify</Text>
      </Button>
    </View>
  )
}

