import { useSignUp } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormScehma, RegisterSchema } from '@stockHub/validators';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native'
import { Button } from '~/components/commons/button';
import { FormInput } from '~/components/commons/textInput';


export default function RegisterScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();


  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterFormScehma)
  })

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
      <Button variants='fill'>
        <Text className='text-black font-bold text-lg tracking-wider uppercase'>Register</Text>
      </Button>

    </View >
  );
}



