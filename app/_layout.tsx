import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
// import "@/tasks/backgroundLocationTask"; // supaya task terdaftar
// import ProductNavigator from "./produk/_layout";
// import ProfileStack from '@/app/profile/_layout';

import {
  startLocationTracking,
} from "@/services/LocationServicesCoordinat";


// import { startBackgroundLocation } from "@/services/locationService";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootApp() {

 useEffect(() => {
    // Auto start tracking ketika app launch
    const initLocationTracking = async () => {
      try {
        console.log('🚀 Auto-starting location tracking...');
        await startLocationTracking();
      } catch (error) {
        console.log('Auto-start failed, waiting for manual start', error);
      }
    };

    initLocationTracking();
  }, []);

  return (
    <Provider store={store}>
      {/* <View className=" -mt-30 bg-red-500">
        <Text>adsad</Text>
      </View> */}
      <App />
    </Provider>
  );
}

function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const reduxDarkMode: any = useAppSelector((state) => state.login.UImode); // get data UI from redex slices
  const colorScheme = useColorScheme();

  useEffect(() => {
    setTimeout(() => {
      // getDataLogin();
    }, 300);
  }, []);
  return (
    // <GluestackUIProvider mode={datalogin?.UImode}>
    <GluestackUIProvider mode={reduxDarkMode}>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <ThemeProvider
        value={reduxDarkMode === "dark" ? DarkTheme : DefaultTheme}
      >
        <ToastProvider>
          {/* <Text style={{ marginTop: 30, marginLeft: 20, marginBottom: 20 }}>
          GetUIMode: {JSON.stringify(reduxDarkMode)}
        </Text> */}
          <StatusBar style={reduxDarkMode === "dark" ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            {/* <Stack.Screen name="profile" options={{ headerShown: false }} /> */}
            <Stack.Screen
              name="LoadingScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IndicatorScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
            {/* <ProductNavigator /> */}
          </Stack>
        </ToastProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
