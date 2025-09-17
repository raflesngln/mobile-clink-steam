import { useCustomToast } from "@/components/custome/ShowToast";
import { useColorsMode } from "@/hooks/useColorsMode";
import { navigateWithParams } from "@/libs/navigastionHelper";
import { useAppSelector } from "@/redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter, useSegments } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "../ui/avatar";
import { Box } from "../ui/box";
import { Grid, GridItem } from "../ui/grid";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

import useThemeConfig from "@/config/darkMode";
import { Center } from "../ui/center";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const isAndroid = Platform.OS === "android";

function LayoutBackground(props: any) {
  const router = useRouter();
  const { _height, _padding } = props;
  const dataProfile = useAppSelector((state) => state.profile);
  const colorMode = useColorsMode();
  const colorScheme = useColorScheme();

  const gotoScreenProfile = (param: any) => {
    // navigation.navigate("DetailOceanExport" as never);
    setTimeout(() => {
      navigateWithParams({
        pathname: "/IndicatorScreen",
        queryParams: {
          redirectTo: `(tabs)/Profile`,
          title: "Halaman Profile", // ini akan diteruskan
          id: `Profile`,
        },
        navType: "push",
      });
    }, 800);
  };
  if (Platform.OS === "android") {
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
    // Sesuaikan warna teks status bar agar terlihat di atas gambar latar belakang
    StatusBar.setBarStyle("dark-content"); // Atau 'light-content' tergantung background Anda
  }

  return (
    // <SafeAreaView style={{flex:1}}>
    <VStack className="mt-30 bg-red-4000">
      <ImageBackground
        source={require("@/assets/images/ilustration_home.png")}
        resizeMode="contain"
        // repeat="no-repeat"
        // style={[ {justifyContent:'flex-start', height: 230, padding: 0,paddingHorizontal:6,paddingVertical:4 }]}
        style={[
          {
            justifyContent: "flex-start",
            height: 220,
            padding: 0,
            paddingHorizontal: 5,
            paddingVertical: 3,
            // Tambahkan padding top berdasarkan tinggi Status Bar di Android
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 6,
          },
        ]}
      >
        <HStack
          className="flex justify-between rounded-full pl-4 py-2 pr-6 bg-['#f3f2f2ff'] dark:bg-['#272020ff'] mt-2"
          // Tambahkan height di sini
          style={{
            height: "30%", // Atau height: 230
          }}
        >
          <HStack>
            {/* <TouchableOpacity onPress={gotoScreenProfile}> */}
            <Avatar size="md">
              <AvatarFallbackText className="">
                {dataProfile?.dataLogin?.username}
              </AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: "https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-701751694975293fcgzulxp2k.png",
                }}
              />
              <AvatarBadge />
            </Avatar>
            {/* </TouchableOpacity> */}
            <Box className="pl-2 -pt-2">
              {/* <Text className="text-gray-400 text-sm">Welcome,</Text> */}
              <Text
                className="text-md capitalize"
                style={{ color: colorMode.text }}
              >
                {dataProfile?.dataLogin?.username}
              </Text>
              <Text className="text-sm lowercase text-gray-500">
                {dataProfile?.dataLogin?.email}
              </Text>
            </Box>
          </HStack>
          <HStack className="h-20 w-20 gap-2 pt-2">
            <TouchableOpacity>
              <Box className=" rounded-full bg-['#dcdcdcff'] p-2 dark:bg-gray-500">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  // color={colorMode.iconColor}
                  color={colorScheme == "dark" ? "#f9f9f9ff" : "#0f46ecff"}
                />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box className=" rounded-full bg-['#dcdcdcff'] p-2 dark:bg-gray-500">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colorScheme == "dark" ? "#f9f9f9ff" : "#0f46ecff"}
                />
              </Box>
            </TouchableOpacity>
          </HStack>
        </HStack>
        <Box
          className="px-4 py-4"
          style={{
            height: 190,
            backgroundColor: "rgba(12, 121, 241, 0.78)",
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          <HStack className="justify-between">
            <Box>
              <Text className=" self-center text-['#f2f2f2'] font-bold text-lg mb-1">
                Pemasukan Hari ini
              </Text>
              <HStack>
                <Text className="text-gray-200">Rp </Text>
                <Text className=" self-center text-4xl text-['#63ed07']">
                  650.000
                </Text>
              </HStack>
            </Box>
            <Box>
              <Text className=" self-center text-['#f2f2f2'] font-bold text-lg mb-1">
                Job Hari ini
              </Text>
              <HStack>
                <Text className=" self-center text-4xl text-['#63ed07']">
                  45
                </Text>
                <Text className="mt-4 text-gray-200"> unit</Text>
              </HStack>
            </Box>
          </HStack>
        </Box>
      </ImageBackground>
      <Box className=" bg-transparent mt-10">
        {/* <HStack className=" justify-between gap-2 mt-2 px-4 ">

          {
            [1,2,3].map((val,idx)=>{
              return(
                <Box className="bg-red-500 w-['30%']" key={idx}>

          <Text>Motor Kecil</Text>
          <Text>Status</Text>
          <Text>22</Text>
          </Box>
              )
            })
          }

          
          </HStack> */}

        <RenderMenuItem />
      </Box>
      {/* <Box className="">
        <Image
          source={require("@/assets/images/Ornament.png")}
          style={{
            width: deviceWidth,
            resizeMode: "contain",
            marginLeft: 0,
            // marginTop: -79,
            bottom: 0,
            // tintColor: colorScheme === "dark" ? "#01070bff" : "#a6e1f6ff",
            // tintColor: colorScheme === "dark" ? "#6EA1D9" : "#6EA1D9",
            tintColor: colorScheme === "dark" ? "#6EA1D9" : "#6EA1D9",
            transform: [{ rotate: "180deg" }],
            marginTop: "-9.6%",
            // tintColor:'#efefefff',
          }}
        />
      </Box> */}
    </VStack>
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

const iconImages: any = {
  motor_kecil: require(`@/assets/images/motor_kecil.png`),
  motor_sedang: require(`@/assets/images/motor_sedang.png`),
  motor_besar: require(`@/assets/images/motor_besar.png`),
};

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
        className="gap-4 pl-2 pr-2 -mt-1"
        _extra={{
          className: "grid-cols-12",
        }}
      >
        {itemsMenu.map((val: any, idx: number) => {
          return (
            <GridItem
              key={idx}
              className="rounded-md "
              _extra={{
                className: "col-span-4",
              }}
            >
              <Center
                className=" bg-red-5000"
                style={{
                  height: deviceHeight * 0.12,
                  marginTop: -deviceHeight * 0.07,
                }}
              >
                <TouchableOpacity
                  // className="h-[50%]"
                  onPress={() =>
                    gotoScreenModules({ id: val.id, screen: val.screen })
                  }
                  disabled={val.id !== 1 ? true : false}
                  // style={{height:100}}
                >
                  <Box
                    style={[
                      styles.containerIcon,
                      {
                        // backgroundColor:'rgba(173, 207, 255, 0.84)',
                        // backgroundColor: "rgba(255, 255, 255, 0.84)",
                        // backgroundColor: "#8ec1fa",
                        // backgroundColor: "#e8ebed",
                        backgroundColor: colorScheme === "dark"?'#33343d':'#e8ebed',
                        borderWidth: 1,
                        // paddingTop:-20,
                        // borderColor: "#e8ebed",
                        borderColor:  colorScheme === "dark"?'#33343d':'#e8ebed',
                        // borderColor: "#3E93F1",
                        ...Platform.select({
                          ios: {
                            shadowColor: colorScheme === "dark"?'#4a4a4a':'#8f8e91',
                            elevation: 20,
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.58,
                            shadowRadius: 12,
                          },
                          android: {
                            shadowColor: colorScheme === "dark"?'#4a4a4a':'#8f8e91',
                            elevation: 20, // Android hanya menggunakan elevation untuk bayangan.
                          },
                          default: {
                            elevation: 20,
                            // Untuk platform lain jika ada
                            // Fallback styling
                          },
                        }),
                      },
                    ]}
                  >
                    <Center className="pt-2">
                      <Text className="">
                        <Image
                          // source={require(`@/assets/images/att_transparant.png`)}
                          source={iconImages[val.img]}
                          style={{
                            width: 300,
                            height: 40,
                            resizeMode: "contain",
                            // tintColor: colorScheme === "dark" ? "#fae8cf" : "#fae8cf",
                          }}
                        />
                      </Text>
                      <Text
                        className=" text-md"
                        style={{
                          color:
                            colorScheme === "dark"
                              ? val.disable
                                ? "#919497ff"
                                : "#dce0e6ff"
                              : val.disable
                              ? "#6b6a69"
                              : "#5d5959ff",
                        }}
                      >
                        {val.title}
                      </Text>
                      <Text className="text-3xl font-bold text-gray-700 dark:text-gray-100">
                        {val.qty}
                      </Text>
                      {/* <Box className="">
                      <Text className="text-3xl font-bold">{val.qty}</Text>
                    </Box> */}
                    </Center>
                  </Box>
                </TouchableOpacity>
              </Center>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    // flex: 1,
    justifyContent: "flex-start",
  },
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

export default LayoutBackground;
