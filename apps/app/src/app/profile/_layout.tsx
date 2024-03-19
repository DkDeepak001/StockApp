import React from 'react';
import { Stack } from 'expo-router';

const Profilelayout = () => {
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
        options={{
          title: 'Profile',
        }}
      />
    </Stack>
  );
};

export default Profilelayout;



