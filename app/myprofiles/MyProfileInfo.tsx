import {
  StyleSheet,
  Button,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Link,
  useLocalSearchParams,
  useGlobalSearchParams,
  useNavigation,
  router,
} from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeDarkMode } from "@/redux/apps/LoginSlice";
import { Image } from "@/components/ui/image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JSX, useCallback, useEffect, useState } from "react";
import { MotiView, View, useAnimationState } from "moti";
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
import Ionicons from "@expo/vector-icons/Ionicons";

import { LinearGradient } from "expo-linear-gradient";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Center } from "@/components/ui/center";
import ImageView from "react-native-image-viewing";
import { Divider } from "@/components/ui/divider";
import AnimatedScreenWrapper from "@/components/custome/AnimatedScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";
import { BackButtonScreen } from "@/components/custome/BackButtonScreen";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
import { translate, i18n } from '@/i18n/locales';
type AnimationType =
  | "fromLeft"
  | "fromRight"
  | "fromTop"
  | "fromBottom"
  | "zoom"
  | "fade";

export default function MyProfile({ navigation, route }: any) {
  const params = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [imagePopUp, setImagePopUp] = useState({ image: "", visible: false });
  const dataProfile = useAppSelector((state) => state.profile);
  const { id, title } = useLocalSearchParams();

  const showPopUpImage = (image: any) => {
    setImagePopUp({
      image: image,
      visible: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);
      return () => {
        setIsVisible(false);
      };
    }, [])
  );

  // Ambil nilai 'animation' dari params
  const animationParam = params.animation;
  // Lakukan validasi tipe
  let animationToUse: AnimationType = "fromBottom"; // Default fallback

  if (typeof animationParam === "string") {
    // List semua AnimationType yang valid
    const validAnimationTypes: AnimationType[] = [
      "fromLeft",
      "fromRight",
      "fromTop",
      "fromBottom",
      "zoom",
      "fade",
    ];

    // Periksa apakah string yang diterima adalah salah satu dari tipe yang valid
    if (validAnimationTypes.includes(animationParam as AnimationType)) {
      animationToUse = animationParam as AnimationType;
    }
    // Jika tidak valid, akan tetap menggunakan 'fromRight' sebagai default
  }
  const backtoProfile = () => {
    router.setParams({ shouldRefresh: "true" });
    router.back();
  };

  // Jika animationParam adalah array atau undefined, akan tetap menggunakan 'fromRight'

  return (
    <>
     <BackButtonScreen />
      {/* <AnimatedScreenWrapper isVisible={isVisible} animationType="fromRight"> */}
      <AnimatedScreenWrapper
        isVisible={isVisible}
        animationType={animationToUse}
      >
        <View style={styles.screenContent}>
          {/* <SafeAreaView style={{ flex: 1, backgroundColor: "#058fb2" }}></SafeAreaView> */}

          <Grid
            className="gap-15"
            _extra={{
              className: "grid grid-cols-12",
            }}
          >
            <Center className=" w-full mt-4 ">
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
                <Center>
                  <ThemedText className=" font-bold">
                    {dataProfile?.dataLogin?.username}
                  </ThemedText>
                </Center>
                <Center>
                  <Text className=" text-gray-500 lowercase">
                    {dataProfile?.dataLogin?.email}
                  </Text>
                </Center>
              </Box>
            </Center>

            <Center className=" w-full mt-4 mb-3">
              <Divider className="my-0.5  w-11/12" />
            </Center>

            <GridItem
              className=" p-6 rounded-md"
              _extra={{
                className: "col-span-12",
              }}
            >
              {/* <AnimationShape> */}
              {/* <Text>PARAMS: {JSON.stringify(params)}</Text> */}
              <Box className="gap-5">
                <Box className=" justify-between">
                  <Text className=" text-gray-800 dark:text-gray-200">
                    {translate('profile_info.name')}
                  </Text>
                  <Text className=" text-gray-400">
                    {" "}
                    {dataProfile?.dataLogin?.username}
                  </Text>
                </Box>

                <Box className=" justify-between">
                  <Text className=" text-gray-800 dark:text-gray-200">
                    {translate('profile_info.user_id')}
                  </Text>
                  <Text className=" text-gray-400">
                    {" "}
                    {dataProfile?.dataLogin?.idUser}
                  </Text>
                </Box>
                <Box className=" justify-between">
                  <Text className=" text-gray-800 dark:text-gray-200">
                     {translate('profile_info.email')}
                  </Text>
                  <Text className=" text-gray-400">
                    {" "}
                    {dataProfile?.dataLogin?.phone}
                  </Text>
                </Box>
                <Box className=" justify-between">
                  <Text className=" text-gray-800 dark:text-gray-200">
                     {translate('profile_info.phone')}
                  </Text>
                  <Text className=" text-gray-400">
                    {" "}
                    {dataProfile?.dataLogin?.phone}
                  </Text>
                </Box>
                <Box className=" justify-between">
                  <Text className=" text-gray-800 dark:text-gray-200">
                     {translate('profile_info.driver_level')}
                  </Text>
                  <Text className=" text-gray-400">
                    {" "}
                    {dataProfile?.dataLogin?.head_driver == 1
                      ? "Kepala Driver"
                      : "Driver"}
                  </Text>
                </Box>
              </Box>
              {/* </AnimationShape> */}
            </GridItem>

            {/* <Text className=" text-gray-600">
            LOGIN:: {JSON.stringify(dataLogin)}
          </Text>
          <Text className=" text-gray-600">
            PROFILE::{JSON.stringify(dataProfile)}
          </Text> */}
          </Grid>
{/* 
          <TouchableOpacity onPress={backtoProfile} className="bg-red-400  mb-6 px-4 py-4 rounded-xl">
            <Text>BACK TO PROFILE</Text>
          </TouchableOpacity> */}

          {/* <AnimationShape>
            <Box>
              <Text>HELLO WORLD</Text>
              <Text>HELLO WORLD</Text>
              <Text>HELLO WORLD</Text>
              <Text>HELLO WORLD</Text>
              <Text>HELLO WORLD</Text>
              <Text>HELLO WORLD</Text>
            </Box>
          </AnimationShape> */}
        </View>
      </AnimatedScreenWrapper>

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

function AnimationShape({ children }: any) {
  const fadeInDown = useFadeInDown();
  // const scaleIn = useAnimationState({
  //   from: {
  //     scale: 0.5,
  //   },
  //   open: {
  //     scale: 1,
  //   },
  //   small: {
  //     scale: 1.5,
  //   },
  // });

  // const onPress = () => {
  //   fadeInDown.transitionTo((state) => {
  //     if (state === "from") {
  //       return "to";
  //     } else {
  //       return "from";
  //     }
  //   });

  //   if (scaleIn.current === "from") {
  //     scaleIn.transitionTo("open");
  //   } else if (scaleIn.current === "open") {
  //     scaleIn.transitionTo("small");
  //   } else {
  //     scaleIn.transitionTo("from");
  //   }
  // };
  return (
    <View className="w-full">
      <MotiView // <--- Gunakan MotiView di sini
        delay={300}
        state={fadeInDown}
        style={styles.shape}
        className="bg-red-500"
        // Anda bisa menambahkan properti transition default di sini jika ingin
        transition={{ type: "timing", duration: 500 }}
      >
        <Text>{children}</Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red", // Berikan background berbeda untuk melihat transisi
  },
  shape: {
    width: "100%", // Contoh lebar
    height: "auto", // Contoh tinggi
    justifyContent: "center", // Agar teks di tengah
    alignItems: "center", // Agar teks di tengah
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
    height: 200,
    paddingTop: 80,
  },
});
