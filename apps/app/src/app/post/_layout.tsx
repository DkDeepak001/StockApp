import React from 'react';
import { Stack } from 'expo-router';

const ViewPostlayout = () => {
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
          title: "Post"
        }}
      />
    </Stack>
  );
};

export default ViewPostlayout;


