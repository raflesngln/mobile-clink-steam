import { MotiView } from "moti";
import React, { useReducer, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
// import {Box, Button, Center, HStack, Text, VStack} from '@gluestack-ui/themed';

function CircleShape({
  height = 90,
  width = 90,
  borderRadius = 0,
}: {
  height: number;
  width: number;
  borderRadius?: number;
}) {
  return (
    <MotiView
      from={{
        translateY: -5,
        opacity: 0,
        scale: 0.1,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
        // scale: 1,
        scale: [
          // you can mix primitive values with objects, too
          { value: 0.5, delay: 100 },
          { value: 1, delay: 100 },
          { value: 1.2, type: "timing", delay: 200 },
          { value: 1.2, type: "spring", delay: 200 },
          { value: 0.8, type: "spring", delay: 200 },
        ],
      }}
      transition={{
        type: "spring",
        duration: 500,
        repeat: 5,
        repeatReverse: false,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      style={[
        styles.circlestyle,
        {
          height: height,
          width: width,
          borderRadius: borderRadius,
        },
      ]}
    >
      <Center>
        <Text>LOREM IPSUM</Text>
      </Center>
    </MotiView>
  );
}
export default function MotiAnimation() {
  const [visible, toggle] = useReducer((s) => !s, true);
  const [sizes, setSize] = useState({
    height: 90,
    width: 90,
    borderRadius: 90,
  });

  const setStyles = (params: any) => {
    setSize((prev) => ({
      ...prev,
      [params]: 200, // Set the new height value
    }));
  };
  const resizeShape = () => {
    setSize({
      height: 100,
      width: 100,
      borderRadius: 100,
    });
  };
  return (
    <VStack>
      <Box>
        <Pressable onPress={toggle} style={styles.container}>
          {visible && (
            <CircleShape
              height={sizes.height}
              width={sizes.width}
              borderRadius={sizes.borderRadius}
            />
          )}
        </Pressable>
      </Box>
      <Center>
        <Button onPress={() => resizeShape()}>
          <Text>Resize </Text>
        </Button>
      </Center>
      <Center>
        <Button onPress={() => toggle()}>
          <Text>Toggle View</Text>
        </Button>
      </Center>
      <HStack>
        <Button onPress={() => setStyles("height")}>
          <Text>Set height</Text>
        </Button>
        <Button onPress={() => setStyles("width")}>
          <Text>Set width</Text>
        </Button>
        <Button onPress={() => setStyles("borderRadius")}>
          <Text>Set borferRadiius</Text>
        </Button>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  circlestyle: {
    justifyContent: "center",
    // height: 90,
    // width: 90,
    // borderRadius: 90,
    // marginRight: 10,
    backgroundColor: "tomato",
  },
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // backgroundColor: 'red',
  },
});
