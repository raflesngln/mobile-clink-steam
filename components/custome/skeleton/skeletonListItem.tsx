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
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

interface PropsParams {
  itemCount: number;
  title?: string;
}

const SkeletonListItem: React.FC<PropsParams> = ({ itemCount, title }) => {
  const numberOfItems = Math.max(0, itemCount); // Pastikan angka positif

  const [dark, toggle] = useReducer((s) => !s, true);
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme == "dark" ? true : false;
  const colorMode = isDarkMode ? "dark" : "light";

  const itemsToRender = Array.from({ length: numberOfItems }).map(
    (_, index) => (
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
        <Spacer height={15} />
      </View>
    )
  );

  return (
    <>
      <MotiView
        transition={{
          type: "timing",
        }}
        style={[styles.container, styles.padded]}
        animate={{ backgroundColor: isDarkMode ? "#000000" : "#ffffff" }}
      >
        <HStack className="flex justify-between mb-6 px-2">
          <Skeleton
            colorMode={colorMode}
            width={deviceWidth * 0.65}
             height={25}
            radius="round"
          />
          <Skeleton colorMode={colorMode} width={deviceWidth * 0.17}  height={25} />
        </HStack>
        {itemsToRender.length > 0 ? (
          itemsToRender
        ) : (
          <Text>Minimal properti itemCount adalah 1</Text>
        )}
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

export default SkeletonListItem;
