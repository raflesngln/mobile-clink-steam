import { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
// import ComponenCameraView from "./ComponenCameraView"; // Pastikan path ini benar

import { BackButtonScreen } from "@/components/custome/BackButtonScreen";
import { VStack } from "@/components/ui/vstack";
import { changeLanguage } from "@/redux/apps/ProfileSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // Dapatkan dimensi layar

import { useCustomToast } from "@/components/custome/ShowToast";
import { HStack } from "@/components/ui/hstack";
import { changeLanguage as changeI18nLanguage } from "@/i18n/locales";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");

const dummyData = [
  { id: "1", name: "Produk A", price: 100000 },
  { id: "2", name: "Produk B", price: 150000 },
  { id: "3", name: "Produk C", price: 200000 },
  { id: "4", name: "Produk D", price: 120000 },
  { id: "5", name: "Produk E", price: 180000 },
];

export default function ChangeLanguage() {
  const colorScheme = useColorScheme();
  const { showToast } = useCustomToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const dataProfile = useAppSelector((state) => state.profile);
  const [produk, setProduk] = useState<any[]>([]);
  // const [values, setValues] = useState("id");

  const handleChangeLanguage = (newValue: string) => {
    // setValues(newValue);
    // Dispatch ke Redux
    dispatch(changeLanguage(newValue));
    // Update i18n language secara langsung
    changeI18nLanguage(newValue);
    showToast(
      dataProfile?.language === "id"
        ? "Language Change to English"
        : "Bahasa diubah ke Indonesia",
      "info"
    );
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2 detik

        setProduk(dummyData); // Set data produk setelah berhasil diambil
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        // Tangani error, mungkin tampilkan pesan ke user
      } finally {
        setLoading(false); // Setelah data diambil (berhasil/gagal), set loading menjadi false
      }
    };

    fetchData();
  }, []); // [] agar useEffect hanya berjalan sekali saat komponen di-mount

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <BackButtonScreen />
      {/* <Text className="text-lg font-bold mb-[30px] px-4"> Ganti Bahasa</Text> */}
      {/* <Text className="text-lg font-bold mb-[30px] px-4">OKO: {JSON.stringify(getCalendars)}</Text> */}
      {/* <Text className="text-lg font-bold mb-[30px] px-4"> {JSON.stringify(dataProfile)}</Text> */}
      {/* <SkeletonDetailJobs itemCount={5} title="jobList" /> */}
      {/* <RadioGroup value={dataProfile?.language} onChange={handleChangeLanguage}> */}
      <VStack space="xl" className="w-[98%] px-2 gap-2">
        {/* <Radio value="en" className="justify-between rounded-lg px-2 py-3" style={{backgroundColor:dataProfile?.language=='en'?'#a8a0a4d6':'transparent'}}> */}
        <Text className=" items-center  self-center">Change Language</Text>
        <VStack className="gap-3 mt-6">
          <TouchableOpacity onPress={() => handleChangeLanguage("en")}>
            <HStack className="justi justify-between">
              <HStack>
                <Text className="text-2xl">🇬🇧 </Text>
                <Text className="dark:text-gray-100 mt-1">ENGLISH</Text>
              </HStack>
              <Text>
                <Ionicons
                  name={
                    dataProfile?.language === "en"
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={26}
                  // color={isFocused ? "#ffffff" : "#4a4a4aff"}
                  color={colorScheme === "dark" ? "#bfd0f5" : "#0e4bcf"}
                />
              </Text>
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChangeLanguage("id")}>
            <HStack className="justi justify-between">
              <HStack>
                <Text className="text-2xl">🇮🇩 </Text>
                <Text className="dark:text-gray-100 mt-1">INDONESIA</Text>
              </HStack>
              <Text>
                <Ionicons
                  name={
                    dataProfile?.language === "id"
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={26}
                  // color={isFocused ? "#ffffff" : "#4a4a4aff"}
                  color={colorScheme === "dark" ? "#bfd0f5" : "#0e4bcf"}
                />
              </Text>
            </HStack>
          </TouchableOpacity>
        </VStack>
      </VStack>
      {/* </RadioGroup> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageDisplayContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Penting untuk memastikan konten tidak meluber
  },
  // Style baru untuk wrapper TouchableOpacity
  capturedImageWrapper: {
    width: "100%", // Ambil lebar penuh dari container
    height: 200, // Berikan tinggi yang jelas
    justifyContent: "center",
    alignItems: "center",
  },
  capturedImage: {
    width: "100%", // Ambil lebar penuh dari wrapper
    height: "100%", // Ambil tinggi penuh dari wrapper
    resizeMode: "contain", // Pastikan gambar terlihat utuh
  },
  zoomModalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: width * 0.95,
    height: height * 0.8,
    resizeMode: "contain",
  },
  closeZoomButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
});
