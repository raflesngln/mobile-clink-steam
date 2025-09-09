// app/LoadingScreen.tsx

import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MotiView, View, useAnimationState } from "moti";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Easing } from "react-native-reanimated";
import { useAppSelector } from "@/redux/hooks";
import { navigateWithParams } from "@/libs/navigastionHelper";

const IndicatorScreen = () => {
  const { redirectTo, ...otherParams } = useLocalSearchParams();
  // Ambil semua parameter yang dikirim, termasuk routeName
  const dataProfile = useAppSelector((state) => state.profile);
  const params = useLocalSearchParams();

  // ✅ Konversi query param supaya aman
  const cleanedParams = Object.fromEntries(
    Object.entries(otherParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  );

  useEffect(() => {
    const checkLoginAndRedirect = () => {
      if (dataProfile?.dataLogin?.isLogin) {
        // ✅ Sudah login → arahkan ke halaman tujuan
        navigateWithParams({
          pathname: redirectTo?.toString() || "/",
          queryParams: cleanedParams,
          navType: "replace", // supaya tidak bisa back ke loading
        });
      } else {
        // Belum login → arahkan ke halaman login
        navigateWithParams({
          pathname: "/sign-in",
          navType: "replace",
        });
      }
    };
    // Simulasikan animasi loading 300 ms
    const timeout = setTimeout(checkLoginAndRedirect, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.containerLoader]} className="bg-['#ecededff'] dark:bg-['#111112ff']">
      {/* Container untuk titik-titik */}
      <View style={styles.dotsContainer}>
        {/* Titik 1 */}
        <MotiView
          from={{ translateY: 0, scale: 1 }}
          animate={{
            translateY: [0, -20, 0], // Melompat ke atas lalu kembali
            scale: [1, 1.2, 1], // Sedikit membesar saat melompat
          }}
          transition={{
            type: "timing",
            duration: 159, // Durasi satu siklus lompatan
            // easing: Easing.inOut(Easing.ease), // Kurva easing
            easing: Easing.out(Easing.ease),
            loop: true, // Animasi berulang terus-menerus
            delay: 0, // Tanpa delay awal untuk titik pertama
          }}
          style={[styles.dot, { backgroundColor: "#05ac4dff" }]}
        />

        {/* Titik 2 */}
        <MotiView
          from={{ translateY: 0, scale: 1 }}
          animate={{
            translateY: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            type: "timing",
            duration: 159,
            // easing: Easing.inOut(Easing.ease),
            easing: Easing.out(Easing.ease),
            loop: true,
            delay: 50, // Delay 150ms agar melompat setelah titik 1
          }}
          style={[styles.dot, { backgroundColor: "#de1357ff" }]}
        />

        {/* Titik 3 */}
        <MotiView
          from={{ translateY: 0, scale: 1 }}
          animate={{
            translateY: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            type: "timing",
            duration: 159,
            // easing: Easing.inOut(Easing.ease),
            easing: Easing.out(Easing.ease),
            loop: true,
            delay: 100, // Delay 300ms agar melompat setelah titik 2
          }}
          style={[styles.dot, { backgroundColor: "#1125d8ff" }]}
        />
      </View>
      <Text className="text-gray-900 text-xl dark:text-['#bbbbbbff']">Loading...</Text>
    </View>
  );
};

export default IndicatorScreen;

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
    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: "row",
    backgroundColor: "#dfdbdbff",
  },
  containerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f5f5f5",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    // backgroundColor: "#1a73e8", // Warna biru yang bagus
    marginHorizontal: 5, // Jarak antar titik
  },
});
