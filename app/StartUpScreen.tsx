import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import COLORS from "@/config/colors";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";

// import Teamwork from '@assets/images/teamwork.svg';
// import Deliveri from '@/components/svg/pli-ilustration';
import { useNavigation } from "@react-navigation/native";

// import LoadingSpinner from '@components/LoadingSpinner';
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { useAppSelector } from "@/redux/hooks";
import { router } from "expo-router";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

// import TopLogo from '@assets/images/pli_logo.png';
// import AnimeIMG from '@assets/images/delivery.png';

const StartUpScreen: React.FC = () => {
  const appVersion = Constants.expoConfig?.version;
  const navigation = useNavigation<any>();
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({ username: "", password: "" });
  const theme = useColorScheme();
  const dataProfile = useAppSelector((state) => state.profile);

  // Tentukan versi spesifik berdasarkan platform
  const versionNumber =
    Platform.OS === "ios"
      ? Constants.expoConfig?.ios?.buildNumber // Jika iOS, ambil buildNumber
      : Constants.expoConfig?.android?.versionCode; // Jika Android, ambil versionCode

  const gradientColors =
    theme === "dark"
      ? [COLORS.bgDark, COLORS.bgDark]
      : [COLORS.bgLight, COLORS.bgLight];

  const actionSheetColors = theme === "dark" ? COLORS.bgDark : COLORS.bgLight;

  const gotoLandingScreen = (param: any) => {
    setTimeout(() => {
      return router.replace("/LoadingScreen");
    }, 800);
  };

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      setIsToggled(true);
    }, 100);
  }, []);

  return (
    <>
      {/* <SafeAreaView style={{flex:1}}> */}
      {/* <LoadingSpinner visible={isLoading} /> */}
      <StatusBar
        translucent
        // backgroundColor={COLORS.primary}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        // colors={["#10948eff", "#2b93b3ff", "#10948eff"]}
        // colors={["#0faba7", "#34d1bf", "#0faba7"]}
        colors={["#10948e", "#2b93b3", "#3583c4"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box className="h-['30%'] w-[100%] flex justify-center items-center">
            <Image
              source={require("@/assets/images/att_transparant.png")}
              style={{
                width: 69,
                height: 150,
                resizeMode: "contain",
              }}
            />
          </Box>
          <Box style={{ width: "100%", height: "25%", marginTop: "-30%" }}>
            <MotiView
              from={{
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: "timing",
                delay: 0,
              }}
            >
              <Center>
                <Image
                  source={require("@/assets/images/introanim.gif")}
                  style={{ width: deviceWidth * 0.95, height: 250 }}
                  contentFit="contain"
                  transition={500}
                />
              </Center>
            </MotiView>
          </Box>

          <VStack
            className="flex justify-between"
            style={{
              width: "100%",
              height: "30%",
              marginTop: -30,
              // backgroundColor: "#edebebff",
            }}
          >
            <MotiView
              from={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: "timing",
                delay: 600,
              }}
            >
              <Center>
                <Center>
                  <Text className=" text-2xl font-bold text-['#ffffffff'] leading-[30px]">
                    Selamat Datang di App Tracking
                  </Text>
                  <Text>{JSON.stringify(dataProfile?.dataLogin?.isLogin)}</Text>
                </Center>

                <Center className="px-10 mt-2">
                  <Text className=" text-lg text-['#b6e9f3ff'] text-center">
                    Periksa pekerjaan Anda dan kelola pengiriman pekerjaan Anda
                    dengan Aplikasi Mobile Tracking
                  </Text>
                </Center>
              </Center>
              <Center>
                <Text className=" text-['#c0bfbfff']">
                  Version: {appVersion}
                </Text>
                {/* <Text>
                  {Platform.OS === "ios"
                    ? "Build Number (iOS): "
                    : "Version Code (Android): "}
                  {versionNumber}
                </Text> */}
              </Center>
            </MotiView>
            <MotiView
              from={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: "timing",
                delay: 1100,
              }}
            >
              <Center className=" pb-10">
                <TouchableOpacity
                  onPress={gotoLandingScreen}
                  className=" px-2 py-3 bg-['#f2f2f2'] w-[90%] rounded-3xl mb-5"
                >
                  {/* <Box className=" "> */}
                  <Center className="">
                    <Text className=" text-['#034751'] font-bold text-xl">
                      Mulai
                    </Text>
                  </Center>
                  {/* </Box> */}
                </TouchableOpacity>
              </Center>
            </MotiView>
          </VStack>
        </View>
      </LinearGradient>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#ECF0F1",
  },

  title: {
    fontSize: 40,
    fontWeight: "600",
    color: COLORS.primary,
    paddingTop: 25,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: "400",
  },
});
export default StartUpScreen;
