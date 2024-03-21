import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';

import { useClientOnlyValue } from '../../components/useClientOnlyValue';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useAuth, useUser } from '@clerk/clerk-expo';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const router = useRouter()
  const insets = useSafeAreaInsets();
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <Tabs
      initialRouteName='Feed'
      safeAreaInsets={insets}
      detachInactiveScreens={false}
      sceneContainerStyle={{
        backgroundColor: "black",
      }}
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: { backgroundColor: "black", paddingTop: 7, paddingBottom: 12, height: 60 },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="tag" color={color} />,
          title: "News",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontSize: 22,
            color: "white",
            paddingHorizontal: 6,
          }

        }}
      />
      <Tabs.Screen
        name="createPost"

        options={{
          tabBarStyle: {
            display: "none"
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
          headerShown: true,
          title: "Start Post",
          headerTitleAlign: "center",
          headerLeft: () =>
            <Pressable className='px-5' onPress={() => router.back()}>
              <AntDesign name="close" size={24} color="white" />
            </Pressable>,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontSize: 22,
            color: "white",
            paddingHorizontal: 6,
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: `Profile`,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontSize: 22,
            color: "white",
            paddingHorizontal: 6,
          },
          tabBarIcon: () => <Image source={{ uri: user?.imageUrl }} className='w-6 h-6 rounded-full' />,
          headerRight: () =>
            <Pressable className='px-5' onPress={() => signOut()}>
              <AntDesign name="logout" size={24} color="white" />
            </Pressable>,
        }}
      />
    </Tabs >
  );
}
