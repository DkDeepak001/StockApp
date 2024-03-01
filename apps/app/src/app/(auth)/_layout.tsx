import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

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
          tabBarIcon: ({ color }) => <TabBarIcon name="tag" color={color} />,
        }}
      />
      <Tabs.Screen
        name="createPost"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs >
  );
}
