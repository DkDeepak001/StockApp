import React from 'react';
import { Stack } from 'expo-router';

const AddPostLayout = () => {
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
        name="form"
        options={{
          title: "Add New Post"
        }}
      />
    </Stack>
  );
};

export default AddPostLayout;

