import { Box } from "@/components/ui/box";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default function JobsScreen() {
  const jobsTodayEMployee = [
    {
      id: 1,
      name: "Anton",
      desc: "Motor Kecil",
      price: 20000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 2,
      name: "Budi",
      desc: "Motor Besar",
      price: 25000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 3,
      name: "Ibeng",
      desc: "Motor Kecil",
      price: 20000,
      time: "20-10-2025-11:12:03",
    },
    {
      id: 4,
      name: "Yuda",
      desc: "Motor Sedang",
      price: 22000,
      time: "20-10-2025-11:12:03",
    },
  ];

  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    //   headerImage={
    //     <IconSymbol
    //       size={310}
    //       color="#808080"
    //       name="chevron.left.forwardslash.chevron.right"
    //       style={styles.headerImage}
    //     />
    //   }
    // >
    //   {[1, 2, 3, 4, 5, 6, 7,2,4,5,5,6,66,6, 8, 9, 10].map((val, idx) => {
    //     return (
    //       <Box key={idx}>
    //         <Text>asdasdsa</Text>
    //       </Box>
    //     );
    //   })}
    // </ParallaxScrollView>
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className=" justify-between " style={{ height: deviceHeight }}>
          <Box className=" bg-white px-2 py-2" style={{ height: "75%" }}>
            <ScrollView
              style={{
                flex: 1,
              }}
            >
              <Grid
                className="gap-4 "
                _extra={{
                  className: "grid-cols-12",
                }}
              >
                {jobsTodayEMployee.map((val, idx) => {
                  return (
                    <GridItem
                      key={idx}
                      className=" p-2 rounded-md bg-blue-500"
                      _extra={{
                        className: "col-span-6",
                      }}
                    >
                      <HStack>
                        <Box className=" self-center">
                          <Ionicons name="person-circle-outline" size={28} color="black" />
                        </Box>
                        <Box className="pl-2">
                          <Text>{val.name}</Text>
                          <Text>Komisi : Rp 50.000</Text>
                          <Text>Jobs: 5</Text>
                        </Box>
                      </HStack>
                    </GridItem>
                  );
                })}
              </Grid>
            </ScrollView>
          </Box>

          <Box className="bg-red-700" style={{ height: "25%" }}>
            <Text>MENUUUU</Text>
          </Box>
        </VStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
