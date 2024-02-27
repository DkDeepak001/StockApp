import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="onboarding"
        options={{
          headerTitle: 'onboarding',
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
