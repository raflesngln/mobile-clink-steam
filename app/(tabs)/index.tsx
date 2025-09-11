import LayoutBackground from "@/components/custome/LayoutBackground";
import { useCustomToast } from "@/components/custome/ShowToast";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { useColorsMode } from "@/hooks/useColorsMode";
import { translate } from "@/i18n/locales";
import { useAppSelector } from "@/redux/hooks";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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

import useThemeConfig from "@/config/darkMode";
import { navigateWithParams } from "@/libs/navigastionHelper";
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
          marginTop: -20,
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
        <RenderMenuItem />

        <Grid
          className="gap-5 pl-2 pr-2 pt-4 mt-4"
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
                {translate("home.riwayat_ocean")}
              </Text>
              <TouchableOpacity>
                <Text className=" text-['#18a2d5ff'] font-bold text-md">
                  {translate("home.view_all")}
                </Text>
              </TouchableOpacity>
            </HStack>
            <Box className="mt-2">
              <Text>jhjhjhjh</Text>
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

const itemsMenu = [
  {
    id: 1,
    kategori: "oe",
    screen: "ocean_export",
    title: "Kecil",
    icon: "directions-boat",
    img: "motor_kecil",
    disable: false,
    qty: 12,
  },
  {
    id: 2,
    kategori: "oi",
    screen: "ocean_export",
    title: "Sedang",
    icon: "directions-boat-filled",
    img: "motor_sedang",
    disable: false,
    qty: 5,
  },
  {
    id: 3,
    kategori: "ae",
    screen: "ocean_export",
    title: "Besar",
    icon: "flight-takeoff",
    img: "motor_besar",
    disable: false,
    qty: 8,
  },
];

function RenderMenuItem() {
  const segments = useSegments(); // ['(tabs)', 'home'] misalnya
  const { showToast } = useCustomToast();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = useThemeConfig();
  const colorMode = useColorsMode();
  // const isOnRootTab = segments.length === 2 && segments[0] === "(tabs)";

  const gotoScreenModules = ({ id, screen }: { id: any; screen: string }) => {
    // showToast("OKE  " + screen, "danger");

    if (id !== 1) {
      console.log("Nonaktif");
      showToast("Menu belum tersedia x ", "default");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigateWithParams({
        pathname: "/IndicatorScreen",
        queryParams: {
          redirectTo: `/${screen}`,
          title: "Halaman " + screen, // ini akan diteruskan
          id: `${screen}`,
        },
        navType: "push",
      });
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Grid
        className="gap-5 pl-2 pr-2 bg-"
        _extra={{
          className: "grid-cols-12",
        }}
      >
        {itemsMenu.map((val: any, idx: number) => {
          return (
            <GridItem
              key={idx}
              className="bg-red-4000 rounded-md"
              _extra={{
                className: "col-span-4",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  gotoScreenModules({ id: val.id, screen: val.screen })
                }
                disabled={val.id !== 1 ? true : false}
              >
                <Box>
                  <Center className="mt-2">
                    <LinearGradient
                      // colors={[COLORS.primary, COLORS.bgLight, COLORS.primary]}
                      colors={["#D8F2F1", "#D8F2F1", "#BFF4FF"]}
                      style={styles.containerIcon}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text className="">
                        <Image
                          // source={require(`@/assets/images/att_transparant.png`)}
                          source={iconImages[val.img]}
                          style={{
                            width: 300,
                            height: 40,
                            resizeMode: "contain",
                          }}
                        />
                      </Text>
                    </LinearGradient>
                  
                    <Text
                      className="text-['#374151'] dark:text-gray-300 text-md"
                      style={{
                        color:
                          colorScheme == "dark"
                            ? val.disable
                              ? "#919497ff"
                              : "#dce0e6ff"
                            : val.disable
                            ? "#a4a6a8ff"
                            : "#5d5959ff",
                      }}
                    >
                      {val.title}
                    </Text>
                    <Box className="">
                      <Text className="text-3xl font-bold">{val.qty}</Text>
                    </Box>
                  </Center>
                </Box>
              </TouchableOpacity>
            </GridItem>
          );
        })}
      </Grid>
    </>
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
    width: deviceWidth / 5,
  },
});
