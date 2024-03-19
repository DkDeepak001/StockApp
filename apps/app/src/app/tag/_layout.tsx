import React from 'react';
import { Stack } from 'expo-router';

const Tagslayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "black"
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "white"
        },
        contentStyle: { backgroundColor: 'black' }
      }}>
      <Stack.Screen
        name="[id]"
      />
    </Stack>
  );
};

export default Tagslayout;




