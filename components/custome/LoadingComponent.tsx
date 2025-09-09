// app/LoadingScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";
import { useRouter, Stack } from "expo-router"; // Import useRouter
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MotiView, Image as MotiImage } from "moti";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "@/config/colors";

// Assuming you have a Redux/Zustand store where dataProfile.islogin is managed
// For this example, I'll simulate the dataProfile.islogin check from AsyncStorage directly.
// If you truly use Redux/Zustand, you would dispatch an action to load the profile
// and then use the selector.
// const gradientColors =
//   theme === 'dark'
//     ? [COLORS.primary, COLORS.bgDark, COLORS.primary]
//     : [COLORS.primary, COLORS.bgLight, COLORS.primary];

const LoadingScreen = () => {
  const dataProfile = useAppSelector((state) => state.profile);
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const navigateAfterLoading = async () => {
  //     try {
  //       // Simulate a small delay for the loading screen to be visible
  //       await new Promise(resolve => setTimeout(resolve, 1500));

  //       // Check login status from AsyncStorage
  //       // In a real app, you might store a token or a specific login flag
  //       const userToken = await AsyncStorage.getItem("userToken"); // Example: check for a user token

  //       // Replace 'HomeScreen' with the actual name of your home screen route (e.g., 'home', '(app)/dashboard')
  //       // Replace 'login' with the actual name of your login screen route (e.g., 'login', '(auth)/sign-in')

  //       if (userToken) {
  //         // If a token exists, assume the user is logged in
  //         // You might also want to validate the token with your backend here
  //         console.log("User is logged in, navigating to home.");
  //         router.replace("/(tabs)"); // or router.replace('/(app)/dashboard'); Adjust to your route
  //       } else {
  //         // If no token, navigate to the login screen
  //         console.log("User not logged in, navigating to login.");
  //         router.replace("/sign-in"); // or router.replace('/(auth)/sign-in'); Adjust to your route
  //       }
  //     } catch (error) {
  //       console.error("Failed to check login status:", error);
  //       // Optionally, navigate to login or an error screen if AsyncStorage fails
  //       router.replace("/sign-in");
  //     }
  //   };

  //   navigateAfterLoading();
  // }, []);

  // return (
  //   <>
  //     <Stack.Screen
  //       options={{
  //         headerShown: false,
  //         statusBarStyle: "dark",
  //         statusBarHidden: true,
  //       }}
  //     />
  //     <Center style={styles.container}>
  //       <Spinner size="large" color="white" />
  //       {/* <Text style={styles.text}>Loading...</Text> */}
  //       <Text style={styles.text}>{JSON.stringify(dataProfile)}...</Text>
  //     </Center>
  //   </>
  // );

  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}
        {/* <LoadingSpinner visible={isLoading} /> */}
        <LinearGradient
          // colors={[COLORS.primary, COLORS.colorlowContrast, COLORS.primary]}
          // colors={["rgba(0, 0, 0, 0.4)", "#ffff", "#0076ff"]}
          // colors={[COLORS.primary, COLORS.bgLight, COLORS.primary]}
          colors={["#10948e", "#2b93b3", "#3583c4"]}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
        >
          <MotiView
            animate={{
              opacity: isToggled ? 1 : 0,
              transform: isToggled ? [{ translateY: 0 }] : [{ translateY: 10 }],
            }}
            transition={{
              type: "spring",
              delay: 250,
            }}
          >
            <Center>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  color: COLORS.gray200,
                }}
              >
                Mobile
              </Text>
            </Center>
          </MotiView>

          <MotiImage
            style={{
              width: 300,
              height: 200,
            }}
            from={{
              marginLeft: -500,
              opacity: [0, 0.8, 0.9],
              // transform: [{scale: 0.2}],
              scale: 0,
            }}
            animate={{
              opacity: [0.9, 1, 1],
              marginLeft: 1250,
              // transform: [{scale: 1.2}],
              scale: [
                // you can mix primitive values with objects, too
                { value: 0.7, delay: 300 },
                { value: 0.3, delay: 100 },
                { value: 0.2, type: "timing", delay: 2000 },
                { value: 0.1, type: "spring", delay: 2000 },
              ],
            }}
            transition={{
              loop: true,
              repeatReverse: false,
              type: "timing",
              duration: 5000,
            }}
            source={require("@/assets/images/delivery2.png")}
          />
          <Center>
            <Spinner size="large" color="white" />
            {/* <Text style={styles.text}>{JSON.stringify(dataProfile.dataLogin.firstOpenApp)}...</Text> */}
          </Center>
        </LinearGradient>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    width: deviceWidth,
  },
  text: {
    marginTop: 20,
    color: "white",
    fontSize: 18,
  },
});

export default LoadingScreen;
