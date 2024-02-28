import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'black' }
      }}>
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false
        }} />

      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Clerk Auth App',
        }} />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Account',
        }} />
    </Stack>
  );
};

export default PublicLayout;
