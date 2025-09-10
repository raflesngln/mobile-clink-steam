import { Tabs, useSegments } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  BackHandler,
  Dimensions,
  Platform,
  useColorScheme
} from "react-native";

import CustomTabBar from "@/components/custome/CustomTabBar";
import { useCustomToast } from "@/components/custome/ShowToast";
import { useAppSelector } from "@/redux/hooks";
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
  const { showToast } = useCustomToast();
  const segments = useSegments(); // ['(tabs)', 'home'] misalnya
  const backPressCount = useRef(0);
  const dataProfile = useAppSelector((state) => state.profile);

  // Function: Apakah user berada di root tab?
  // const isOnRootTab = segments.length === 2 && segments[0] === "(tabs)";
  // const isOnRootTab =
  //   segments[0] === "(tabs)" &&
  //   (segments.length === 1 || segments.length === 2);
  const isOnRootTab =
    segments.length <= 2 &&
    segments[0] === "(tabs)" &&
    (segments[1] === undefined ||
      ["index", "Profile", "Jobs"].includes(segments[1]));




useEffect(() => {
  if (Platform.OS !== "android") return;

  const onBackPress = () => {
    if (isOnRootTab) {
      if (backPressCount.current === 0) {
        backPressCount.current = 1;
      
         showToast("Tekan sekali lagi untuk keluar", "danger");
        
        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000);
        
        return true; // Mencegah default behavior
      } else {
        BackHandler.exitApp(); // Keluar aplikasi
        return true;
      }
    }
    return false; // Biarkan default behavior
  };

  // API yang benar untuk Expo/React Native modern
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    onBackPress
  );

  // Cleanup function
  return () => backHandler.remove();
}, [isOnRootTab]);


  return (
     <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" ,tabBarLabel: "Home"}} />
      <Tabs.Screen name="explore" options={{ title: "Explore" ,tabBarLabel: "expore"}} />
      <Tabs.Screen name="profile" options={{ title: "Profile",tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
