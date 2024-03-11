import React from 'react';
import { Stack } from 'expo-router';

const AddPostLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'black' }
      }}>
      <Stack.Screen
        name="form"
        options={{
          headerShown: false
        }} />

    </Stack>
  );
};

export default AddPostLayout;

