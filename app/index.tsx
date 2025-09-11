// app/LoadingScreen.tsx
import { changeVersionApp, logout } from "@/redux/apps/ProfileSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Constants from "expo-constants";
import { Stack, useRouter } from "expo-router"; // Import useRouter
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import LoadingComponent from "@/components/custome/LoadingComponent";
// Assuming you have a Redux/Zustand store where dataProfile.islogin is managed
// For this example, I'll simulate the dataProfile.islogin check from AsyncStorage directly.
// If you truly use Redux/Zustand, you would dispatch an action to load the profile
// and then use the selector.

const LoadingScreen = () => {
  const dispatch = useAppDispatch();
  const dataProfile = useAppSelector((state) => state.profile);
  const appVersion: any = Constants.expoConfig?.version;

  const router = useRouter();

  useEffect(() => {
    const navigateAfterLoading = async () => {
      try {
        // Simulate a small delay for the loading screen to be visible
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // get version apps, if change version then remove all login state and view start-up screen
        const versionAppRedux = dataProfile.versionApp;
        if (versionAppRedux !== appVersion) {
          // console.log("App version has changed.Resetting state");
          // Dispatch action to update Redux with the new version
          dispatch(changeVersionApp(appVersion));
          dispatch(logout());
          router.replace("/StartUpScreen");
          return; // Stop further checks if version changed
        }

        // Check login status from AsyncStorage
        // In a real app, you might store a token or a specific login flag
        const userToken = dataProfile.dataLogin.isLogin; // Example: check for a user token
        // Replace 'HomeScreen' with the actual name of your home screen route (e.g., 'home', '(app)/dashboard')
        // Replace 'login' with the actual name of your login screen route (e.g., 'login', '(auth)/sign-in')

        if (dataProfile.dataLogin.firstOpenApp == true) {
          //Jika pertamakali buka APps dan belum login tmapilkan startup screen
          router.replace("/StartUpScreen");
        } else {
          // selain itu cek login status
          if (userToken) {
            // If a token exists, assume the user is logged in
            // You might also want to validate the token with your backend here
            console.log("User is logged in, navigating to home.");
            // setNama(dataProfile.dataLogin.email)
            router.replace("/(tabs)"); // or router.replace('/(app)/dashboard'); Adjust to your route
          } else {
            // If no token, navigate to the login screen
            console.log("User not logged in, navigating to login.");
            router.replace("/sign-in"); // or router.replace('/(auth)/sign-in'); Adjust to your route
          }
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
        // Optionally, navigate to login or an error screen if AsyncStorage fails
        router.replace("/sign-in");
      }
    };

    navigateAfterLoading();
  }, []);

  return (
    <>
      {/* <Stack.Screen
        options={{
          headerShown: false,
          statusBarStyle: "dark",
          statusBarHidden: true,
        }}
      /> */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* <Center style={styles.container}>
        <Spinner size="large" color="white" /> */}
      <LoadingComponent />
      {/* <Text style={styles.text}>Loading...</Text>
        <Text style={styles.text}>{nama}...</Text>
        <Text style={styles.text}>{JSON.stringify(dataProfile)}...</Text> */}
      {/* </Center> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  text: {
    marginTop: 20,
    color: "white",
    fontSize: 18,
  },
});

export default LoadingScreen;
