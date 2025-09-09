import { useCustomToast } from "@/components/custome/ShowToast";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme
} from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
// import { useColorScheme } from "@/hooks/useColorScheme";
import { Box } from "@/components/ui/box";
import { Grid, GridItem } from "@/components/ui/grid";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useColorsMode } from "@/hooks/useColorsMode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
// import {useForm, Controller} from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getLogin } from "@/services/auth/userAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import * as yup from "yup";
// Update the import path below to the correct relative path where ProfileSlice is located, for example:
// import { setDataLogin, logout } from "../redux/apps/ProfileSlice";
import { setDataLogin } from "@/redux/apps/ProfileSlice";
import axios from "axios";
import Constants from "expo-constants";
// Or adjust the path as needed, such as:
// import { setDataLogin, logout } from "../../redux/apps/ProfileSlice";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Format email tidak valid.") // Memastikan format adalah email yang benar
    .required("Email tidak boleh kosong."), // Memastikan field email tidak kosong
  password: yup
    .string()
    .min(6, "Kata Sandi minimal 6 karakter.") // Memastikan password memiliki minimal 6 karakter
    .required("Kata Sandi tidak boleh kosong."), // Memastikan field password tidak kosong
});

export default function SignIn() {
    const appVersion = Constants.expoConfig?.version;
  const colorScheme = useColorScheme();
  const colorMode = useColorsMode();
  const darkMode = useColorsMode();
  const toast = useToast();
  const { showToast } = useCustomToast();
  // const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dataProfile = useAppSelector((state) => state.profile);

  const togglePasswordVisible = () => setShowPassword(!showPassword);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Gunakan skema Yup di sini
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const checkDataLogin = await getLogin({
        email: email,
        password: password,
      });

      if (checkDataLogin && checkDataLogin.token) {
        await AsyncStorage.setItem("tokenLogin", checkDataLogin.token);
        // setTimeout(() => {
        //   setLoading(false);
        //   navigation.navigate("(tabs)" as never);
        // }, 300);
        const dataPatch = {
          isLogin: true,
          firstOpenApp: false,
          idUser: checkDataLogin.user.driver_no,
          username: checkDataLogin.user.driver_name,
          email: checkDataLogin.user.email,
          profilePicture: "raflesngln.png",
          phone: checkDataLogin.user.driver_contact_number1,
          token: checkDataLogin.token,
          head_driver: checkDataLogin.user.head_driver,
        };
        dispatch(setDataLogin(dataPatch));

        router.push({
          pathname: "/LoadingScreen", // <-- Rute ke file loading.tsx
          params: { routeName: "/(tabs)" }, // <-- Parameter tujuan. Pastikan (tabs) ada di app/
        });
      } else if (checkDataLogin && checkDataLogin.message === "error login") {
        // Login Gagal karena pesan spesifik dari getLogin
        showToast("Username dan Kata Sandi tidak sesuai.", "danger");
        // TIDAK ADA console.error di sini agar tidak memicu Alert otomatis
      } else {
        // Respons API tidak terduga, bukan error 401 atau 'error login'
        showToast(
          "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.",
          "danger"
        );
        // TIDAK ADA console.error di sini
      }
    } catch (error: unknown) {
      // Menangkap error dari Axios (jaringan, atau 401 langsung)
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // **Ini adalah kasus kredensial salah (401 Unauthorized)**
          showToast("Username dan Kata Sandi salah.", "danger");
          // *** HANYA TAMPILKAN KE UI MELALUI showToast, JANGAN KE CONSOLE.ERROR ***
        } else if (error.response) {
          // Error respons dari server dengan status lain (misal 400, 500)
          showToast(
            `Terjadi masalah: ${error.response.status}. Silakan coba lagi.`,
            "danger"
          );
          // *** HANYA TAMPILKAN KE UI MELALUI showToast, JANGAN KE CONSOLE.ERROR ***
        } else if (error.request) {
          // Permintaan dibuat tapi tidak ada respons (misal jaringan down)
          showToast(
            "Gagal terhubung ke server. Periksa koneksi internet Anda.",
            "danger"
          );
          // *** HANYA TAMPILKAN KE UI MELALUI showToast, JANGAN KE CONSOLE.ERROR ***
        } else {
          // Error lain saat mengatur permintaan
          showToast(
            "Terjadi kesalahan saat login. Silakan coba lagi.",
            "danger"
          );
          // *** HANYA TAMPILKAN KE UI MELALUI showToast, JANGAN KE CONSOLE.ERROR ***
        }
      } else if (error instanceof Error) {
        // Error adalah instance dari kelas Error standar
        showToast(
          `Terjadi kesalahan: ${error.message}. Silakan coba lagi.`,
          "danger"
        );
        // *** HANYA TAMPILKAN KE UI MELALUI showToast, JANGAN KE CONSOLE.ERROR ***
      } else {
        // Error tidak diketahui tipenya
        showToast(
          "Terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
          "danger"
        );
        // *** HANYA TAMPILKAN KE UI MELALUI ShowToast, JANGAN KE CONSOLE.ERROR ***
      }
    }
    //  finally {
    //   setLoading(false); // Pastikan loading selalu berhenti
    // }
  };

  const GotoHome = () => {
    setLoading(true);
    console.log("sukses login");
    setTimeout(() => {
      setLoading(false);
      // navigation.navigate("(tabs)" as never);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#058fb2" }}>
      <LinearGradient
        // Background Linear Gradient
        // colors={["rgba(0, 0, 0, 0.4)", "transparent", "rgba(0, 0, 0, 0.7)"]}
        // colors={["rgba(0, 0, 0, 0.5)", "transparent", "rgba(0, 0, 0, 0.8)"]}
        colors={["#10948e", "#2b93b3", "#3583c4"]}
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
            <Text className="text-white text-center">Please Sign-In</Text>
            <Center className=" items-center mt-6 -mb-4">
              {loading && (
                <Text className="text-center font-bold text-white text-xl">
                  Processing...
                </Text>
              )}
            </Center>
          </GridItem>

          <GridItem
            className=" p-3 rounded-md"
            _extra={{
              className: "col-span-12",
            }}
          >
            <VStack>
              <Text className="pl-5 text-blue-100">Email</Text>
              <Input
                style={[
                  styles.input,
                  {
                    height: 40,
                    width: deviceWidth / 1.2,
                  },
                ]}
                className=" rounded-full border-['#f2f2f2'] focus:border-['#43c180ff']  "
              >
                {/* <InputField type="text" placeholder="email" /> */}
                <Controller
                  control={control}
                  name="email" // Nama field harus sesuai dengan skema Yup
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      placeholder="email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="dark:text-gray-500"
                    />
                  )}
                />
              </Input>
              {errors.email && (
                <Center className=" -mt-4">
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                </Center>
              )}
            </VStack>

            <VStack>
              <Text className="pl-5 text-blue-100">Kata Sandi</Text>
              <Input
                style={[
                  styles.input,
                  {
                    height: 40,
                    width: deviceWidth / 1.2,
                  },
                ]}
                className=" rounded-full bg-blue-200 border-blue-200 focus:border-blue-500  text-black"
              >
                <Controller
                  control={control}
                  name="password" // Nama field harus sesuai dengan skema Yup
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      className="dark:text-gray-500"
                    />
                  )}
                />
                <InputSlot className="pr-3" onPress={togglePasswordVisible}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="#455756"
                    fill="#89a3a2"
                  />
                </InputSlot>
              </Input>
              {errors.password && (
                <Center className=" -mt-4">
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                </Center>
              )}
            </VStack>
            {/* <Text>{JSON.stringify(dataProfile)}</Text> */}
            <Center>
              <Button
                size="md"
                variant="outline"
                action="primary"
                className="rounded-full px-10 mt-8 border border-['#ffffffff']"
                onPress={handleSubmit(onSubmit)} // Panggil handleSubmit dari React Hook Form
                isDisabled={false}
                style={{ height: 50, width: deviceWidth / 1.2 }}
              >
                <ButtonText className="text-gray-50 font-bold">
                  MASUK
                </ButtonText>
              </Button>
            </Center>

            <Center>
              <Text className="mt-5 text-['#c4c1c1ff']">ATT Application</Text>
              <Text className="mt-2 text-['#c4c1c1ff']">Version: {appVersion}</Text>
            </Center>
          </GridItem>

          {/* <Text className=" text-white">
            LocalstorageDATAS{JSON.stringify(darkMode)}
          </Text>
          <Text className=" text-white">
            colorMode {JSON.stringify(colorScheme)}
          </Text> */}
        </Grid>
        {/* <Center>
          <HStack space="sm" reversed={false}>
            <Box className="h-20 w-1/3 mt-2">
              <Text className=" text-gray-200"> You're New User? </Text>
            </Box>
            <Box className="h-20">
              <Button variant="link" onPress={formSignUp}>
                <ButtonText style={{ color: "white" }} className=" underline">
                  SIGN-UP
                </ButtonText>
              </Button>
            </Box>
          </HStack>
          <HStack space="sm" reversed={false}>
            <Box className="h-20 w-1/3 mt-2">
              <Text className=" text-gray-200"> Forgot Password? </Text>
            </Box>

            <Box className="h-20">
              <Button variant="link" onPress={formForgotPassword}>
                <ButtonText style={{ color: "white" }} className=" underline">
                  FORGOT PASSWORDs
                </ButtonText>
              </Button>
            </Box>
            <Link href="/forgot-password" asChild>
              <Pressable>
                <Text
                  style={{ color: colorMode.textWhite }}
                  className=" underline"
                >
                  Click Here{" "}
                </Text>
              </Pressable>
            </Link>
          </HStack>
        </Center> */}
      </LinearGradient>
    </SafeAreaView>
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
    backgroundColor: "#f2f2f2",
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: deviceHeight * 1.1,
  },
  errorText: {
    color: "#f8a7a7ff",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 20, // Sesuaikan dengan padding Input
  },
});
