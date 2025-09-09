import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, Dimensions, Text, Alert } from "react-native";
import { MotiView, View, useAnimationState } from "moti";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Easing } from "react-native-reanimated";
import { BackButtonScreen } from "@/components/custome/BackButtonScreen";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default function MyAnimationComponent() {
  return (
    <View style={styles.container}>
      {/* <LoaderAnimation /> */}
      <VStack className="flex justify-start bg-['#e2ddddff'] h-full">
        <Box>
          <AnimationA />
        </Box>
        <Box>
          <AnimationB />
        </Box>
      </VStack>
    </View>
  );
}

function AnimationA() {
  const [loading, setLoading] = useState(false);
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.1,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
    active: {
      opacity: 1,
      scale: 2,
    },
  });

  // OR USE THIS
  const animationState2 = useAnimationState(
    {
      initial: {
        opacity: 0,
        scale: 0.1,
      },
      next: {
        opacity: 1,
        scale: 1,
      },
    },
    {
      from: "initial",
      to: "next",
    }
  );

  return (
    <>
      <BackButtonScreen />
      <Text className="text-red-400 font-bold text-xl">Animation 1</Text>
      <Box>
        <MotiView
          className="bg-['#1475c5ff'] "
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            marginLeft: "35%",
          }}
          state={animationState}
          // animate={{ opacity: loading ? 1 : 0 }}
        />
      </Box>
    </>
  );
}

function AnimationB() {
  const [isToggled, setIsToggled] = React.useState(false);
  const animationState = useAnimationState({
    // Status awal: Bulat di tengah
    initial: {
      height: 100,
      width: 100,
      borderRadius: 100,
      marginLeft: deviceWidth * 0.35, // Gunakan nilai absolut agar lebih konsisten
    },
    // Status 'left': Bulat di kiri (untuk tahap 1)
    left: {
      height: 100,
      width: 100,
      borderRadius: 100,
      marginLeft: 2, // Bergerak ke kiri
    },
    // Status 'expanded': Persegi panjang memanjang di kiri (untuk tahap 2)
    expanded: {
      height: 50,
      width: deviceWidth * 0.96,
      borderRadius: 10,
      marginLeft: 2,
    },
  });

  const toggleAnimation = () => {
    setIsToggled(!isToggled);

    if (!isToggled) {
      // Jika saat ini di 'initial' (bulat tengah) dan akan di-toggle
      // Langkah 1: Pindah ke 'left' (masih bulat, ke kiri)
      animationState.transitionTo("left");
      // Langkah 2: Setelah sedikit penundaan, transisi ke 'expanded'
      // Ini membuat animasi dua tahap terlihat berurutan
      setTimeout(() => {
        animationState.transitionTo("expanded");
      }, 500); // Penundaan 500ms setelah bergerak ke kiri, sebelum memanjang
    } else {
      // Jika saat ini di 'expanded' (persegi panjang) dan akan di-toggle kembali ke awal
      // Langkah 1: Pindah ke 'left' (masih bulat, ke kiri)
      animationState.transitionTo("left");
      // Langkah 2: Setelah sedikit penundaan, transisi ke 'initial' (bulat di tengah)
      setTimeout(() => {
        animationState.transitionTo("initial");
      }, 500); // Penundaan 500ms setelah menjadi bulat di kiri, sebelum ke tengah
    }
  };

  return (
    <>
      <VStack className="flex justify-start bg-['#e2ddddff'] h-full">
        <Text className="text-red-400 font-bold text-xl">Animation 2</Text>
        <Box>
          <MotiView
            className="bg-['#1475c5ff']"
            state={animationState}
            transition={{
              type: "timing", // or 'spring'
              duration: 1000, // Adjust duration as needed
              easing: Easing.inOut(Easing.ease),
            }}
          />
        </Box>
        <Box className="mt-6">
          <Button onPress={toggleAnimation}>
            <ButtonText>Toggle Animation</ButtonText>
          </Button>
        </Box>
      </VStack>
    </>
  );
}

const LoaderAnimation = () => {
  return (
    <View style={styles.containerLoader}>
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
            duration: 150, // Durasi satu siklus lompatan
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
            duration: 150,
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
            duration: 150,
            // easing: Easing.inOut(Easing.ease),
            easing: Easing.out(Easing.ease),
            loop: true,
            delay: 100, // Delay 300ms agar melompat setelah titik 2
          }}
          style={[styles.dot, { backgroundColor: "#1125d8ff" }]}
        />
      </View>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
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
    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: "row",
    backgroundColor: "#dfdbdbff",
  },
  containerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
});
