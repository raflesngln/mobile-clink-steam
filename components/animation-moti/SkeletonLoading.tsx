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

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

export default function SkeletonLoading() {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme ? 'dark' : 'light';

  return (
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
        {/* <Pressable style={styles.container}> */}
        <MotiView
          transition={{
            type: "timing",
          }}
          style={[styles.container, styles.padded]}
          animate={{ backgroundColor: colorScheme ? "#000000" : "#ffffff" }}
        >
          <Box className="justify-center">
            <VStack space="md" reversed={false}>
              <Skeleton
                colorMode={colorMode}
                radius="round"
                height={75}
                width={75}
              />
              {/* <Spacer /> */}
              <Spacer height={8} />
              <Skeleton colorMode={colorMode} width={90} />
              <Skeleton colorMode={colorMode} width={"80%"} />
              <Skeleton colorMode={colorMode} width={"90%"} />
              <Skeleton colorMode={colorMode} width={"100%"} />
            </VStack>
          </Box>
        </MotiView>
      </GridItem>
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  padded: {
    padding: 0,
  },
});
