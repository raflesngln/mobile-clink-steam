import LayoutBackground from "@/components/custome/LayoutBackground";
import { useCustomToast } from "@/components/custome/ShowToast";
import { Box } from "@/components/ui/box";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { useColorsMode } from "@/hooks/useColorsMode";
import { translate } from "@/i18n/locales";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, useSegments } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { Divider } from "@/components/ui/divider";
import useThemeConfig from "@/config/darkMode";
import { Ionicons } from "@expo/vector-icons";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const isAndroid = Platform.OS === "android";

const iconImages: any = {
  motor_kecil: require(`@/assets/images/motor_kecil.png`),
  motor_sedang: require(`@/assets/images/motor_sedang.png`),
  motor_besar: require(`@/assets/images/motor_besar.png`),
};

export default function HomeScreen() {
  const segments = useSegments(); // ['(tabs)', 'home'] misalnya
  const [status, setStatus] = useState<any>(null);
  const backPressCount = useRef(0);
  const { showToast } = useCustomToast();
  const colorScheme = useColorScheme();
  const themeColors = useThemeConfig();
  const colorMode = useColorsMode();
  const [loading, setLoading] = useState<boolean>(true);
  const dataProfile = useAppSelector((state) => state.profile);
  const router = useRouter();
  // const isOnRootTab = segments.length === 2 && segments[0] === "(tabs)";

  const [isTaskRunning, setIsTaskRunning] = useState(false);

  const [isTracking, setIsTracking] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);

  const jobsHistory = [
    {
      id: 1,
      name: "Anton",
      desc: "Motor Kecil",
      price: 20000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 2,
      name: "Budi",
      desc: "Motor Besar",
      price: 25000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 3,
      name: "Anton",
      desc: "Motor Kecil",
      price: 20000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 4,
      name: "Yuda",
      desc: "Motor Sedang",
      price: 22000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 5,
      name: "Anton",
      desc: "Motor Kecil",
      price: 20000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 6,
      name: "Budi",
      desc: "Motor Sedang",
      price: 22000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 7,
      name: "Mawar",
      desc: "Motor Sedang",
      price: 22000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 8,
      name: "Bunga",
      desc: "Motor Sedang",
      price: 22000,
      time: "20-10-2025-11:12:03",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <MotiView
      from={{
        opacity: 0,
        scale: 0,
        borderRadius: 1000,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        borderRadius: 1,
      }}
      transition={{
        type: "spring",
      }}
    > */}
      {/* 
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0, 0, 0, 0)", "transparent", "rgba(0, 0, 0, 0)"]}
        // colors={["#fff",'#fff',"#fff"]}
        style={styles.background}
      > */}
      <LayoutBackground />
    

      <ScrollView
        style={{
          flex: 1,
          // marginTop: 5,
          // paddingTop: '12%',
          // paddingTop: 30,
          // paddingBottom: 50,
          // marginBottom: 20,
          // height: deviceHeight / 2,
          marginTop: 4,
          paddingTop: 0,
          paddingBottom: 50,
          marginBottom: 20,
        }}
        contentContainerStyle={{
          // Ini untuk konten di dalam ScrollView.
          // Jika Grid Anda perlu jarak dari atas ScrollView, atur di sini.
          // Jika ingin menempel ke atas, pastikan tidak ada padding/margin di sini.
          paddingTop: 2,
        }}
      >
        {/* Load Menu Items in Dashboard */}
        {/* <RenderMenuItem /> */}

        <Grid
          className="gap-5 pl-2 pr-2 pt-4 mt-4 pb-20"
          _extra={{
            className: "grid-cols-12",
          }}
        >
          <GridItem
            className="bg-red-4000 rounded-md"
            _extra={{
              className: "col-span-12",
            }}
          >
            <HStack className=" flex justify-between px-4">
              <Text className=" text-['#8d8f8fff'] font-bold text-md">
                {translate("home.history_job")}
              </Text>
              <TouchableOpacity>
                <Text className=" text-['#18a2d5ff'] font-bold text-md">
                  {translate("home.view_all")}
                </Text>
              </TouchableOpacity>
            </HStack>
            <Box className="px-2">
              {jobsHistory.map((val, idx) => {
                return (
                  <Box key={idx}>
                    <HStack
                      key={idx}
                      className="mt-2 px-2 py-2 justify-between"
                    >
                      <Box>
                        <Text className="text-gray-900 font-bold dark:text-gray-100">
                          <Ionicons
                            name="receipt-outline"
                            size={13}
                            color={"#828181"}
                          />{" "}
                          {val.name}
                        </Text>
                        <Text className="text-gray-400 pl-4 italic">
                          {val.time}
                        </Text>
                        <Text className="text-gray-500 pl-4">{val.desc}</Text>
                      </Box>
                      <Text className="text-gray-700 dark:text-gray-100">{val.price}</Text>
                    </HStack>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
          </GridItem>
        </Grid>
      </ScrollView>

      {/* <Box>{!loading && <SkeletonLoading key="skeleton" />}</Box> */}
      {/* </LinearGradient> */}

      {/* </MotiView> */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  cardHero: {
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 6,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: isAndroid ? 20 : 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 150,
    paddingBottom: 50,
    height: deviceHeight * 1.1,
  },
  header: {
    // flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 40,
    paddingHorizontal: 10,
    // height: 50,
    width: deviceWidth,
  },
  shadowProp: {
    borderRadius: 16,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  note: {
    fontSize: 12,
    color: "gray",
    marginTop: 20,
    textAlign: "center",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  containerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    // backgroundColor: "#000000",
    width: deviceWidth / 4,
  },
});
