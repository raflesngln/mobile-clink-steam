import {
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Link, useFocusEffect, useNavigation, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeDarkMode } from "@/redux/apps/LoginSlice";
import { Image } from "@/components/ui/image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { useAnimationState } from "moti";
import { Grid, GridItem } from "@/components/ui/grid";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { Button, ButtonText } from "@/components/ui/button";
import { CircleIcon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { Center } from "@/components/ui/center";
import ImageView from "react-native-image-viewing";
import { Divider } from "@/components/ui/divider";
import { logout } from "@/redux/apps/ProfileSlice";
import ModalCustom from "@/components/custome/ModalCustom";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
import { navigateWithParams } from "@/libs/navigastionHelper";
import Constants from "expo-constants";
import { translate, i18n } from '@/i18n/locales';


export default function MyProfile() {
  const appVersion = Constants.expoConfig?.version;
  const navigation = useNavigation();
  // Tentukan versi spesifik berdasarkan platform
  const versionNumber =
    Platform.OS === "ios"
      ? Constants.expoConfig?.ios?.buildNumber // Jika iOS, ambil buildNumber
      : Constants.expoConfig?.android?.versionCode; // Jika Android, ambil versionCode

  const router = useRouter();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isdarkmode, setIsdarkmode] = useState<any>("");
  const [imagePopUp, setImagePopUp] = useState({ image: "", visible: false });
  const dispatch = useAppDispatch();
  const dataLogin = useAppSelector((state) => state.login);
  const dataProfile = useAppSelector((state) => state.profile);

  const gotoScreenDetailProfile = (param: any) => {
    navigateWithParams({
      pathname: "/IndicatorScreen",
      queryParams: {
        redirectTo: `/myprofiles/${param.screen}`,
        title: "Halaman " + param?.screen, // ini akan diteruskan
        id: `${param.screen}`,
      },
      navType: "push",
    });
  };



  const changeDarkModeView = () => {
    const cekUI = dataLogin.UImode;
    if (cekUI == "dark") {
      dispatch(changeDarkMode("light"));
    } else {
      dispatch(changeDarkMode("dark"));
    }
    console.log(cekUI);
  };

  const showPopUpImage = (image: any) => {
    setImagePopUp({
      image: image,
      visible: true,
    });
  };

  const confirmLogOut = () => {
    setModalShow(true);
    // console.log("sukses Logout");
    // setTimeout(() => {
    //   navigation.navigate("sign-in" as never);
    // }, 300);
  };
  const ExecuteLogOut = () => {
    setModalShow(false);
    // console.log("sukses Logout");
    dispatch(logout());
    setTimeout(() => {
      navigation.navigate("sign-in" as never);
    }, 300);
  };

  useFocusEffect(
    useCallback(() => {
      // Panggil ulang data di sini
      console.log("refresh ulang data halaman");
      return () => {
        // Optional: cleanup kalau perlu
      };
    }, [])
  );
  return (
    <>
      <View className="flex-1">
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: "#058fb2" }}></SafeAreaView> */}
        {/* Lightbox modal image */}
        <View>
          <ImageView
            images={[
              {
                uri: imagePopUp.image,
              },
            ]}
            imageIndex={0}
            visible={imagePopUp.visible}
            onRequestClose={() =>
              setImagePopUp({
                ...imagePopUp,
                visible: false,
              })
            }
          />
        </View>

        <Grid
          className="gap-15"
          _extra={{
            className: "grid-cols-12",
          }}
        >
          <LinearGradient
            // Background Linear Gradient
            // colors={["rgba(0, 0, 0, 0)", "#fff", "rgba(0, 0, 0, 0)"]}
            colors={[
              dataLogin?.UImode == "dark"
                ? "rgba(44, 36, 36, 0.84)"
                : "#60a5faf4",
              dataLogin?.UImode == "dark"
                ? "rgba(67, 57, 57, 0.73)"
                : "#60A5FA",
              dataLogin?.UImode == "dark"
                ? "rgba(29, 28, 28, 0.7)"
                : "#60a5fa90",
            ]}
            // colors={["#0076ff", "#58a1f5", "#0076ff"]} // light mode
            //  colors={["#10948e", "#2b93b3", "#0a5254ff"]}
            start={{ x: 0.4, y: 0.5 }} // Top-right corner
            end={{ x: 0, y: 1 }} // Bottom-left corner
            style={styles.background}
          >
            {/* <GridItem
            className=" p-6 rounded-md"
            _extra={{
              className: "col-span-12",
            }}
          > */}
            <Center className="justify-start gap-3 pb-4">
              <Box>
                <TouchableOpacity
                  onPress={() =>
                    showPopUpImage(
                      "https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-701751694975293fcgzulxp2k.png"
                    )
                  }
                >
                  <Avatar size="xl">
                    <AvatarFallbackText>
                      {dataProfile?.dataLogin?.username}
                    </AvatarFallbackText>
                    <AvatarImage
                      source={{
                        uri: "https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-701751694975293fcgzulxp2k.png",
                      }}
                    />
                    <AvatarBadge />
                  </Avatar>
                </TouchableOpacity>
              </Box>

              <Box>
                <Text className="text-['#ffffffff'] font-bold capitalize dark:text-gray-100">
                  {dataProfile?.dataLogin?.username}
                </Text>
                <Text className=" text-['#8ed9ffff'] lowercase dark:text-gray-400">
                  {dataProfile?.dataLogin?.email}
                </Text>
              </Box>
            </Center>
            {/* </GridItem> */}
          </LinearGradient>
          {/* <Center className=" w-full mt-5">
            <Divider className="my-0.5  w-11/12" />
          </Center> */}

          <GridItem
            className=" p-6 rounded-md mt-6"
            _extra={{
              className: "col-span-12",
            }}
          >
            <Box className="gap-6">
              <HStack className=" justify-between">
                <HStack className="gap-2">
                  <Ionicons name="moon-outline" size={20} color="#9c9a9a" />
                  <ThemedText>{translate('profile.menu.darkMode')}</ThemedText>
                </HStack>
                <Switch
                  // defaultValue={false}
                  value={dataLogin.UImode == "dark" ? true : false}
                  // defaultValue={dataLogin.UImode=='dark'?false:true}
                  size="md"
                  // isDisabled={false}
                  trackColor={{ false: "#8c8c8c", true: "green" }}
                  thumbColor={"white"}
                  // activeThumbColor={"#8c8c8c" as never}
                  ios_backgroundColor={"#8c8c8c"}
                  onToggle={() => changeDarkModeView()}
                />
              </HStack>
              <TouchableOpacity
                onPress={() =>
                  gotoScreenDetailProfile({ screen: "MyProfileInfo" })
                }
              >
                {/* <TouchableOpacity onPress={MyProfileInfo}> */}
                <HStack className=" justify-between mt-3">
                  <HStack className="gap-2">
                    <Ionicons name="person-outline" size={22} color="#9c9a9a" />
                    <ThemedText>{translate('profile.menu.profile')}</ThemedText>
                  </HStack>
                  <Ionicons
                    name="chevron-forward-sharp"
                    size={20}
                    color="#575656"
                  />
                </HStack>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={MyFilePage}> */}
              <TouchableOpacity
                onPress={() =>
                  gotoScreenDetailProfile({ screen: "changeLanguage" })
                }
              >
                <HStack className=" justify-between">
                  <HStack className="gap-2">
                    <Ionicons
                      name="language"
                      size={22}
                      color="#9c9a9a"
                    />
                    <ThemedText>{translate('profile.menu.language')}</ThemedText>
                  </HStack>
                  <Ionicons
                    name="chevron-forward-sharp"
                    size={20}
                    color="#575656"
                  />
                </HStack>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() =>
                  gotoScreenDetailProfile({ screen: "MotiAnimationExample" })
                }
              >
                <HStack className=" justify-between">
                  <HStack className="gap-2">
                    <Ionicons
                      name="color-palette-outline"
                      size={22}
                      color="#9c9a9a"
                    />
                    <ThemedText>MotiAnimationExample</ThemedText>
                  </HStack>
                  <Ionicons
                    name="chevron-forward-sharp"
                    size={20}
                    color="#575656"
                  />
                </HStack>
              </TouchableOpacity> */}
            </Box>

            {/* <Text className="text-red-500">{JSON.stringify(dataLogin)}</Text> */}
          </GridItem>

          <GridItem
            className="p-6 rounded-md gap-6"
            _extra={{
              className: "col-span-12",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                gotoScreenDetailProfile({ screen: "changePassword" })
              }
            >
              <HStack className=" justify-between">
                <HStack className="gap-2">
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color="#9c9a9a"
                  />
                  <ThemedText>{translate('profile.menu.password')}</ThemedText>
                </HStack>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={20}
                  color="#575656"
                />
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmLogOut}>
              <HStack className=" justify-between">
                <HStack className="gap-2">
                  <Ionicons name="log-out-outline" size={22} color="#9c9a9a" />
                  <ThemedText>{translate('profile.menu.logout')}</ThemedText>
                </HStack>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={20}
                  color="#575656"
                />
              </HStack>
            </TouchableOpacity>
            {/* <Text>{translate('settings.title')}</Text> */}
          </GridItem>
          <GridItem
            className="p-6 rounded-md gap-6 justify-end"
            _extra={{
              className: "col-span-12",
            }}
          >


          
            <Center>
              <Text className="text-gray-500">ATT Application</Text>
              <Text className="text-gray-400">Version :  {appVersion}</Text>
              {/* <Center>
                <Text>
                  {Platform.OS === "ios"
                    ? "Build Number (iOS): "
                    : "Version Code (Android): "}
                  {versionNumber}
                </Text>
              </Center> */}
              {/* <Text className="text-gray-500">Mode : {dataLogin?.UImode}</Text> */}

              <ModalCustom
                title="Are you sure to Log-out ?"
                visible={modalShow}
                onClose={() => setModalShow(false)}
                btnCancel={<Text>Cancel</Text>}
                // btnOK={<Text>Yes</Text>}
                btnOK={
                  <Button
                    onPress={ExecuteLogOut}
                    className=" bg-red-700 rounded-full pr-8 pl-8"
                  >
                    <ButtonText className="text-red-200">Yes</ButtonText>
                  </Button>
                }
              >
                <Text className="dark:text-gray-400">
                  You would redirect to login page
                </Text>
              </ModalCustom>
            </Center>
          </GridItem>

          {/* <Text className=" text-gray-600">
          LOGIN:: {JSON.stringify(dataLogin)}
        </Text>
        <Text className=" text-gray-600">
          PROFILE::{JSON.stringify(dataProfile)}
        </Text> */}
          {/* FOR MODAL */}
        </Grid>
      </View>
    </>
  );
}

const useFadeInDown = () => {
  return useAnimationState({
    from: {
      opacity: 0,
      translateY: -15,
    },
    to: {
      opacity: 1,
      translateY: 0,
    },
  });
};

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "black",
  },
  shape2: {
    backgroundColor: "hotpink",
    marginTop: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "cyan",
  },
  background: {
    // flex: 1,
    // position: "absolute",
    width: deviceWidth,
    left: 0,
    right: 0,
    top: 0,
    height: 230,
    paddingTop: 80,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
