import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";

import { Dimensions, Platform } from "react-native";

import CustomTabBar from "@/components/custome/CustomTabBar";
import { useColorScheme } from "@/hooks/useColorScheme";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const styleTab = {
  light: {
    tint: "#18a2d5ff", // Contoh warna untuk mode terang
    tabBackground: "#ece7e7ff", //11d1c1ff, f2f2f2
    tabShadow: "#000000ff",
  },
  dark: {
    tint: "#1380e5ff", // Contoh warna untuk mode gelap
    tabBackground: "#333333",
    tabShadow: "rgba(255, 255, 255, 0.47)",
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
       tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
