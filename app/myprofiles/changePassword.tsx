import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet, Text, View
} from "react-native";
// import ComponenCameraView from "./ComponenCameraView"; // Pastikan path ini benar

import { BackButtonScreen } from "@/components/custome/BackButtonScreen";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { translate } from "@/i18n/locales";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearSavedLocations,
  getDataLoginFromLocalStorage,
  getSavedLocations,
} from "@/services/LocationServicesCoordinat";

const { width, height } = Dimensions.get("window");

const dummyData = [
  { id: "1", name: "Produk A", price: 100000 },
  { id: "2", name: "Produk B", price: 150000 },
  { id: "3", name: "Produk C", price: 200000 },
  { id: "4", name: "Produk D", price: 120000 },
  { id: "5", name: "Produk E", price: 180000 },
];

export default function ChangePassword() {
  const [savedLocations, setSavedLocations] = useState([]);
  const [savedLocalStorage, setSavedLocalStorage] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [produk, setProduk] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [retypePass, setRetypePass] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRetype, setShowRetype] = useState(false);
  const dataProfile = useAppSelector((state) => state.profile);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const changePassword = async () => {
    Alert.alert("fitur belum tersedia");
    return;
  };
  const loadSavedLocations = async () => {
    const locations = await getSavedLocations();
    setSavedLocations(locations);
  };

  const loadLocalStorage = async () => {
    const storeLocal: any = await getDataLoginFromLocalStorage();
    setSavedLocalStorage(storeLocal);
  };

  const handleClearLocations = async () => {
    const cleared = await clearSavedLocations();
    if (cleared) {
      setSavedLocations([]);
      console.log("Locations cleared successfully");
    }
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
    loadSavedLocations();
    loadLocalStorage();
  }, []); // [] agar useEffect hanya berjalan sekali saat komponen di-mount

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <BackButtonScreen />
      {/* <SkeletonDetailJobs itemCount={5} title="jobList" /> */}
      <FormControl className="p-4 border rounded-lg border-outline-300">
        <VStack space="xl" className="h-[98.5%] justify-between">
          <Box>
            <Heading className="text-typography-900 mb-4">
              {translate("changePass.title")}
            </Heading>
            {/* OLD PASSWORD */}
            <VStack space="xs" className=" mt-4">
              <Text className="text-typography-500">
                {translate("changePass.old")}
              </Text>
              <Input className="text-center">
                <InputField
                  value={oldPass}
                  onChangeText={setOldPass}
                  type={showOld ? "text" : "password"}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowOld(!showOld)}
                >
                  <InputIcon as={showOld ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>
            {/* NEW PASSWORD */}
            <VStack space="xs" className=" mt-4">
              <Text className="text-typography-500">
                {translate("changePass.new")}
              </Text>
              <Input className="text-center">
                <InputField
                  value={newPass}
                  onChangeText={setNewPass}
                  type={showNew ? "text" : "password"}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowNew(!showNew)}
                >
                  <InputIcon as={showNew ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>
            {/* RETYPE PASSWORD */}
            <VStack space="xs" className=" mt-4">
              <Text className="text-typography-500">
                {translate("changePass.retype")}
              </Text>
              <Input className="text-center">
                <InputField
                  value={retypePass}
                  onChangeText={setRetypePass}
                  type={showRetype ? "text" : "password"}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowRetype(!showRetype)}
                >
                  <InputIcon as={showRetype ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>
            <VStack>
              <Center>
                <Text>{JSON.stringify(dataProfile.dispatch_id)}</Text>
                {/* <Text>{JSON.stringify(savedLocalStorage)}</Text> */}
                {/* <Button
                  onPress={handleClearLocations}
                  className="rounded-full mt-6 bg-['#d6d6d6ff']"
                >
                  <Text className="text-['#9a9999ff'] ">Clear Loc</Text>
                </Button> */}
                <Text className="text-['#0000001a']">locations</Text>
                <View>
                  {savedLocations.map((location: any, index: number) => (
                    <View key={index}>
                      <Text className="text-['#0000001a']">
                        Lat: {location.latitude.toFixed(6)}
                      </Text>
                      <Text className="text-['#00000026']">
                        Lng: {location.longitude.toFixed(6)}
                      </Text>
                      <Text className="text-['#00000025']">
                        Time:{" "}
                        {new Date(location.timestamp).toLocaleTimeString()}
                      </Text>
                    </View>
                  ))}
                </View>
              </Center>

              {/* <VStack className=" flex justify-between px-4">
                <Text>COORDINAT SAVE EVERY 5 MINUTES</Text>
                <View >
                  <Button
                    title={isTracking ? "Stop Tracking" : "Start Tracking"}
                    onPress={
                      isTracking ? handleStopTracking : handleStartTracking
                    }
                    color={isTracking ? "red" : "green"}
                  />

                  <Button
                    title="Refresh Locations"
                    onPress={loadSavedLocations}
                    color="blue"
                  />

                  <Button
                    title="Clear All Locations"
                    onPress={handleClearLocations}
                    color="orange"
                  />
                </View>

                <Text >
                  Saved Locations: {savedLocations.length}
                </Text>

                <ScrollView >
                  {savedLocations.map((location: any, index: number) => (
                    <View key={index} style={styles.locationItem}>
                      <Text>Lat: {location.latitude.toFixed(6)}</Text>
                      <Text>Lng: {location.longitude.toFixed(6)}</Text>
                      <Text>
                        Time:{" "}
                        {new Date(location.timestamp).toLocaleTimeString()}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </VStack> */}
            </VStack>
          </Box>
          <Center>
            <Button
              onPress={changePassword}
              className="w-[90%] rounded-full bg-['#355ac6ff'] py-2  active:!bg-['#0e2981ff']"
            >
              <ButtonText className="text-typography-0">
                {translate("changePass.button")}
              </ButtonText>
            </Button>
          </Center>
        </VStack>
      </FormControl>
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
