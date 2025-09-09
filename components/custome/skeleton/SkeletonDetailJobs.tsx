import { useReducer } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  useColorScheme,
  Dimensions,
  Text,
} from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

interface PropsParams {
  itemCount: number;
  title?: string;
}

const SkeletonDetailJobs: React.FC<PropsParams> = ({ itemCount, title }) => {
  const numberOfItems = Math.max(0, itemCount); // Pastikan angka positif

  const [dark, toggle] = useReducer((s) => !s, true);
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme == "dark" ? true : false;
  const colorMode = isDarkMode ? "dark" : "light";

  const itemsToRender = Array.from({ length: 8 }).map((_, index) => (
    <View key={index}>
      <Box className="gap-2 bg-['#eae8e8ff'] py-4 px-3 rounded-xl dark:bg-['#303031ff']">
        <HStack className="flex justify-between">
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.3}
            height={10}
          />
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.2}
            height={10}
          />
        </HStack>
        <HStack className="flex justify-between">
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.2}
            height={10}
          />
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.1}
            height={10}
          />
        </HStack>
        <HStack className="flex justify-between">
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.3}
            height={10}
          />
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.15}
            height={10}
          />
        </HStack>
      </Box>
      <Spacer height={5} />
    </View>
  ));

  return (
    <>
      <MotiView
        transition={{
          type: "timing",
        }}
        style={[styles.container, styles.padded]}
        animate={{ backgroundColor: isDarkMode ? "#000000" : "#ffffff" }}
      >
        <Box className="mb-2 px-4 py-3 gap-1 rounded-xl bg-['#eaeaeaff'] dark:bg-['#2c2929ff']">
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.9}
            height={30}
          />
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.9}
            height={30}
          />
        </Box>
        <Box className="mb-2 px-4 py-3 gap-3 rounded-xl bg-['#eaeaeaff'] dark:bg-['#2c2929ff']">
          <HStack className=" flex justify-between">
            <Skeleton
              colorMode={colorMode}
              width={deviceWidth * 0.6}
              height={15}
            />
            <Skeleton
              colorMode={colorMode}
              width={deviceWidth * 0.2}
              height={15}
            />
          </HStack>
          <HStack className=" flex justify-between">
            <Skeleton
              colorMode={colorMode}
              width={deviceWidth * 0.5}
              height={15}
            />
            <Skeleton
              colorMode={colorMode}
              width={deviceWidth * 0.2}
              height={15}
            />
          </HStack>
        </Box>
        {[1, 2, 3].map((val, idx) => {
          return (
            <View key={idx}>
              <Box className="mb-4 px-4 py-3 gap-1 rounded-xl bg-['#eaeaeaff'] dark:bg-['#2c2929ff']">
                <HStack className="flex justify-between">
                  <Skeleton
                    colorMode={colorMode}
                    width={deviceWidth * 0.5}
                    height={15}
                  />
                  <Skeleton
                    colorMode={colorMode}
                    width={deviceWidth * 0.2}
                    height={15}
                  />
                </HStack>
                <HStack className="flex-wrap gap-3 mt-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((val, idx) => {
                    return (
                      <View key={idx}>
                        <Skeleton
                          colorMode={colorMode}
                          width={deviceWidth / 5}
                          height={50}
                        />
                      </View>
                    );
                  })}
                </HStack>
              </Box>
            </View>
          );
        })}
      </MotiView>
    </>
  );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  padded: {
    // padding: 6,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});

export default SkeletonDetailJobs;
