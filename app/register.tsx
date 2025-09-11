import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  Platform,
  SafeAreaView,
  TextInput,
  View,
  Dimensions,
  Pressable,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
// import { useColorScheme } from "@/hooks/useColorScheme";
import { useColorScheme } from "react-native";
import { Grid, GridItem } from "@/components/ui/grid";
import { Image } from "@/components/ui/image";
import { AnimatePresence, MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "@/components/ui/box";
import { useColorsMode } from "@/hooks/useColorsMode";
import { Skeleton } from "moti/skeleton";
import { VStack } from "@/components/ui/vstack";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default function RegisterPage() {
  const colorScheme = useColorScheme();
  const darkMode = useColorsMode();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handlerInput = (name: any, e: any) => {
    // const { name, value } = e.target;
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e,
    }));
    // console.log(JSON.stringify(name));
    // console.log(JSON.stringify(e));
  };

  const processRegister = () => {
    setLoading(true);
    console.log("sukses login");
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("sign-in" as never);
    }, 1000);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    // <View className=" bg-red-300">
    // <ParallaxScrollView
    //   // headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    //   headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    //   headerImage={
    //     <Ionicons size={310} name="code-slash" style={styles.headerImage} />
    //   }
    //   >
    // <SafeAreaView style={styles.container}>
    <AnimatePresence exitBeforeEnter>
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
          delay: 200,
        }}
        exit={{
          opacity: 0,
        }}
        style={{ flex: 1, backgroundColor: "#058fb2" }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#058fb2" }}>
          <LinearGradient
            // Background Linear Gradient
            // colors={["rgba(0, 0, 0, 0.4)", "transparent", "rgba(0, 0, 0, 0.7)"]}
            colors={["rgba(0, 0, 0, 0.5)", "transparent", "rgba(0, 0, 0, 0.8)"]}
            style={styles.background}
          >
            <Grid
              className="gap-1 "
              _extra={{
                className: "grid-cols-12",
              }}
            >
              <GridItem
                className=" p-6 rounded-md"
                _extra={{
                  className: "col-span-12",
                }}
              >
                <Center>
                  <AnimetdImage />
                </Center>
              </GridItem>

              <GridItem
                className=" p-6 rounded-md"
                _extra={{
                  className: "col-span-12",
                }}
              >
                <ThemedText
                  className=" font-bold text-center text-4xl"
                  style={{ color: "white" }}
                >
                  Register New User
                </ThemedText>
                <Center className=" items-center mt-6 -mb-4">
                  {loading && (
                    <Text className="text-center font-bold text-white text-xl">
                      Processing...
                    </Text>
                  )}
                </Center>
              </GridItem>


                <GridItem
                  className=" p-2 gap-0 rounded-md"
                  _extra={{
                    className: "col-span-12",
                  }}
                >
                  <TextInput
                    data-name="username"
                    style={[
                      styles.input,
                      {
                        height: 43,
                        color: darkMode.textBlack,
                        // backgroundColor: darkMode.background,
                        // borderColor: darkMode.background,
                        width: deviceWidth / 1.2,
                      },
                    ]}
                    className=" rounded-full bg-white border-white focus:border-blue-600 light:bg-gray-900 "
                    onChangeText={(e) => handlerInput("username", e)}
                    placeholder="Email/Username "
                    value={formData.username}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        height: 43,
                        color: darkMode.textBlack,
                        // backgroundColor: darkMode.background,
                        // borderColor: darkMode.background,
                        width: deviceWidth / 1.2,
                      },
                    ]}
                    className=" rounded-full bg-white border-white focus:border-blue-600  text-black "
                    data-name="password"
                    onChangeText={(e) => handlerInput("password", e)}
                    value={formData.password}
                    placeholder="New Password "
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        height: 43,
                        color: darkMode.textBlack,
                        // backgroundColor: darkMode.background,
                        // borderColor: darkMode.background,
                        width: deviceWidth / 1.2,
                      },
                    ]}
                    className="rounded-full bg-white border-white focus:border-blue-600  text-black "
                    data-name="password"
                    onChangeText={(e) => handlerInput("password", e)}
                    value={formData.password}
                    placeholder="Retype New Password "
                    keyboardType="numeric"
                  />
                  <Center>
                    <Button
                      size="md"
                      variant="outline"
                      action="primary"
                      className="rounded-full px-10 mt-8 border-white"
                      onPress={processRegister}
                      isDisabled={false}
                      style={{ height: 50, width: deviceWidth / 1.2 }}
                    >
                      <ButtonText style={{ color: "white" }}>
                        REGISTER
                      </ButtonText>
                    </Button>
                  </Center>
                </GridItem>

              {/* <Text className=" text-white">Localstoreasd{JSON.stringify(darkMode)}</Text>
          <Text className=" text-white">
            colorMode {JSON.stringify(colorScheme)}
          </Text> */}
            </Grid>
          </LinearGradient>
        </SafeAreaView>
      </MotiView>
    </AnimatePresence>
  );
}

function AnimetdImage() {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0,
        borderRadius: 1000,
      }}
      animate={{
        opacity: 1,
        scale: 1.2,
        borderRadius: 1,
      }}
      transition={{
        type: "timing",
      }}
    >
      <Box className=" pt-20">
        <Image
          size="2xl"
          source={require("../assets/images/login-ilusts.png")}
          alt="image"
        />
      </Box>
    </MotiView>
  );
}
const Skeletons = () => (
  <MotiView
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
    }}
  >
    <Text>LOADINGG..........</Text>
  </MotiView>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    // flexDirection: "row",
    // gap: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: deviceHeight * 1.1,
  },

});
