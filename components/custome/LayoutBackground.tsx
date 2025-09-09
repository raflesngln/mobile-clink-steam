/* eslint-disable prettier/prettier */
import React from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from "react-native";
import { Box } from "../ui/box";
import { View } from "moti";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "../ui/avatar";
import { useAppSelector } from "@/redux/hooks";
import { useColorsMode } from "@/hooks/useColorsMode";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
import { useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { navigateWithParams } from "@/libs/navigastionHelper";

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
        source={require("@/assets/images/logistics_hdr.png")}
        resizeMode="cover"
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
            height: "34%", // Atau height: 230
            ...Platform.select({
              ios: {
                shadowColor: "#050e2eff",
                elevation: 20,
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.51,
                shadowRadius: 15.16,
              },
              android: {
                shadowColor: "#122039ff",
                elevation: 20, // Android hanya menggunakan elevation untuk bayangan.
              },
              default: {
                elevation: 10,
                // Untuk platform lain jika ada
                // Fallback styling
              },
            }),
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
                  color={colorScheme=='dark'?'#f9f9f9ff':'#0f46ecff'}
                />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box className=" rounded-full bg-['#dcdcdcff'] p-2 dark:bg-gray-500">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colorScheme=='dark'?'#f9f9f9ff':'#0f46ecff'}
                />
              </Box>
            </TouchableOpacity>
          </HStack>
        </HStack>
      </ImageBackground>
      <Box className="">
        <Image
          source={require("@/assets/images/Ornament.png")}
          style={{
            width: deviceWidth,
            resizeMode: "contain",
            marginLeft: 0,
            // marginTop: -79,
            bottom: 0,
            // tintColor: colorScheme === "dark" ? "#01070bff" : "#a6e1f6ff",
            tintColor: colorScheme === "dark" ? "#6EA1D9" : "#6EA1D9",
            transform: [{ rotate: "180deg" }],
            marginTop: "-9.6%",
            // tintColor:'#efefefff',
          }}
        />
      </Box>
    </VStack>
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
});

export default LayoutBackground;
