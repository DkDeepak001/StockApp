import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontSize: 22,
          color: "white",
        },
        headerStyle: {
          backgroundColor: "black"
        },
        contentStyle: {
          backgroundColor: 'black',
        }

      }}>
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false
        }} />

      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: 'Login',
        }} />
      <Stack.Screen
        name="register"
        options={{
          headerShown: true,
          headerTitle: 'Create Account',
        }} />
      <Stack.Screen
        name="verification"
        options={{
          headerTitle: 'Verifiy your account',
        }} />
      <Stack.Screen
        name="authHome"
        options={{
          headerShown: false
        }} />


    </Stack>
  );
};

export default PublicLayout;
