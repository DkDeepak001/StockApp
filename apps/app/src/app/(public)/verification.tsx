import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "~/components/commons/button";
import { BasicInput } from "~/components/commons/textInput";

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
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }
  return (
    <View className="flex flex-1 items-center justify-center">
      <BasicInput
        onChangeText={(text) => setCode(text)}
        placeholder="Enter the Verification code"
        value={code}
      />
      <Button variants="fill" onPress={onPressVerify}>
        <Text className="text-black font-bold text-lg ">Verify</Text>
      </Button>
    </View>
  )
}

