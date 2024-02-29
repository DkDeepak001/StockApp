import { useSignIn, useSession } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/commons/button';
import { FormInput } from '~/components/commons/textInput';
import { LoginFormSchema, LoginScehma } from '@stockHub/validators'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { showMessage } from 'react-native-flash-message';


export default function LoginScreen() {
  let router = useRouter()
  const { signIn, isLoaded, setActive } = useSignIn()
  const { session } = useSession()
  const {
    control,
    handleSubmit,

    formState: { errors }
  } = useForm<LoginScehma>({
    resolver: zodResolver(LoginFormSchema)
  })


  const handleLogin = async (data: LoginScehma) => {
    const { password, email } = data
    try {

      tryLogin({ password, email })
    } catch (err: any) {
      if (err.errors && err.errors.length > 0 && err.errors[0].longMessage.includes("You're currently in single session mode")) {
        showMessage({
          message: `Loggin out from other device`,
          type: "info",
        });

        session?.end()
        tryLogin({ password, email })
      }
      console.error("error inside login", err)
    }

  }

  const tryLogin = async ({ email, password }: LoginScehma) => {
    if (!isLoaded) return

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
      showMessage({
        message: `${error?.errors?.[0]?.longMessage
          }`,
        type: "danger",
      });
      console.log(error.errors, "trylognin")
    }

  }


  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <FormInput
        placeholder='Enter your email address'
        control={control}
        error={errors.email?.message!}
        name='email'
        textContentType='emailAddress' />
      <FormInput
        placeholder='Enter Your Password'
        control={control}
        error={errors.password?.message!}
        name='password'
        textContentType='password'
      />
      <Button variants='fill' onPress={handleSubmit(handleLogin)}>
        <Text className="text-black font-bold text-lg">Login</Text>
      </Button>
    </SafeAreaView >
  );
}

