// app/LoadingScreen.tsx
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import COLORS from "@/config/colors";
import { useAppSelector } from "@/redux/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"; // Import useRouter
import { Image as MotiImage, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const LoadingScreen = () => {
  const router = useRouter();
  const dataProfile = useAppSelector((state) => state.profile);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataProfile?.dataLogin?.isLogin) {
        console.log("sudah login");
        router.replace("/(tabs)"); // if localstorage islogin true then redirect to home name of ('tabs')
      } else {
        console.log("belum login");
        router.replace("/sign-in");
      }
    }, 2000); // delay to show loading

    return () => clearTimeout(timeout);
  }, [dataProfile?.dataLogin?.isLogin, router]);

  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}
      {/* <LoadingSpinner visible={isLoading} /> */}
      <LinearGradient
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
          {/* <Text style={styles.text}>{JSON.stringify(dataProfile)}...</Text> */}
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
