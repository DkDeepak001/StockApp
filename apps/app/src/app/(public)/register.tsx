import { useSignUp } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormScehma, RegisterSchema } from '@stockHub/validators';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message';
import { Button } from '~/components/commons/button';
import { FormInput } from '~/components/commons/textInput';
import RegisterImage from "../../../assets/images/auth/register.png"


export default function RegisterScreen() {
  const { signUp } = useSignUp();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterFormScehma)
  })
  const handleReg = async ({ password, username, lastName, firstName, email }: RegisterSchema) => {
    try {
      await signUp?.create({
        password,
        emailAddress: email,
        username,
        firstName,
        lastName
      })
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" })
      showMessage({
        message: "verification Email Sent",
        icon: "success",
        type: 'success'
      })
      router.push("/verification")
    } catch (error) {
      showMessage({
        // @ts-ignore
        message: `${error?.errors[0].message}`,
        icon: "danger",
        type: 'danger'
      })

      // @ts-ignore
      console.log(error?.errors[0].message)
    }
  }

  return (
    <View className="flex-1 justify-center items-center  bg-black">
      <View className="w-full h-2/5 ">
        <Image source={RegisterImage} className="w-full h-full " />
      </View>

      <FormInput
        control={control}
        placeholder='First Name'
        name='firstName'
        textContentType='name'
        error={errors.firstName?.message!}
      />
      <FormInput
        control={control}
        placeholder='Last Name'
        name='lastName'
        textContentType='name'
        error={errors.lastName?.message!}
      />
      <FormInput
        control={control}
        placeholder='Username'
        name='username'
        textContentType='username'
        error={errors.username?.message!}
      />
      <FormInput
        control={control}
        placeholder='Email Id'
        name='email'
        textContentType='emailAddress'
        error={errors.email?.message!}
      />
      <FormInput
        control={control}
        placeholder='Password'
        name='password'
        textContentType='password'
        error={errors.password?.message!}
      />
      <Button variants='fill' onPress={handleSubmit(handleReg)}>
        <Text className='text-black font-bold text-lg tracking-wider uppercase'>Register</Text>
      </Button>

    </View >
  );
}



