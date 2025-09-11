import { MotiView, useAnimationState } from "moti";
import React, { useReducer, useState } from "react";
import { StyleSheet } from "react-native";
// import {Box, Button, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const AnimateBox = ({
  height = 100,
  width = 100,
  borderRadius = 0,
}: {
  height: number;
  width: number;
  borderRadius?: number;
}) => {
  const withAnimationState = useAnimationState({
    from: {
      opacity: 0,
      height: 10,
    },
    to: {
      opacity: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      height: height,
      // height: [{value: height, type: 'spring', delay: 500}],
    },
  });
  return (
    <>
      <MotiView state={withAnimationState} style={{ backgroundColor: "green" }}>
        <Text>asdsadsad</Text>
        <Text>LOREM IPSUMdd</Text>
        <Text>Width : {width}</Text>
        <Text>Height : {height}</Text>
      </MotiView>
    </>
  );
};
export default function MotiAnimation() {
  const [visible, toggle] = useReducer((s) => !s, true);
  const [sizes, setSize] = useState({
    height: 100,
    width: 100,
    borderRadius: 90,
  });

  const resizeShape = () => {
    setSize((prev) => ({
      ...prev,
      height: prev.height + 10,
      width: prev.width + 10,
      borderRadius: 0,
    }));
  };
  return (
    <VStack>
      <Box>
        {visible && <AnimateBox height={sizes.height} width={sizes.width} />}
      </Box>
      <HStack >
        <Button onPress={() => toggle()}>
          <Text>Toggle View</Text>
        </Button>
        <Button onPress={() => resizeShape()}>
          <Text>Resize </Text>
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
