import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon } from "@/components/ui/icon";
import React from "react";
import { Easing } from "react-native-reanimated";
import { MotiView, Image as MotiImage } from "moti";
import { Dimensions } from "react-native";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

interface ModalCustomProps {
  children?: React.ReactNode;
  btnCancel?: React.ReactNode;
  btnOK?: React.ReactNode;
  title?: string;
  visible: boolean;
  onClose: () => void;
}

export default function ModalCustom({
  children,
  btnCancel,
  btnOK,
  title,
  visible,
  onClose,
}: ModalCustomProps) {
  return (
    <>
      <Center className="w-full">
        <Modal isOpen={visible} onClose={onClose} size="md">
          <ModalBackdrop className="bg-['#17181a'] dark:bg-['#242424']" />
          <MotiView
            from={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 400 }}
            transition={{
              type: "timing",
              duration: 250,
              delay: 200,
              easing: Easing.out(Easing.ease),
            }}
          >
            <ModalContent
              className="dark:bg-['#2d2d2e'] rounded-xl max-w-[500px"
              style={{
                width: deviceWidth * 0.85,// 85% of width content modal
              }}
            >
              <ModalHeader>
                <Heading size="md" className="text-typography-950">
                  {title || ""}
                </Heading>
                <ModalCloseButton onPress={onClose}>
                  <Icon
                    as={CloseIcon}
                    size="md"
                    className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                  />
                </ModalCloseButton>
              </ModalHeader>

              <ModalBody>
                {children || (
                  <Text size="sm" className="text-typography-500">
                    Element Body
                  </Text>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  className=" bg-gray-400 text-red-400 rounded-full"
                  onPress={onClose}
                >
                  <ButtonText className="text-gray-800">
                    {btnCancel || "Cancel"}
                  </ButtonText>
                </Button>
                {btnOK || (
                  <Button
                    className=" bg-red-700 rounded-full"
                    onPress={onClose}
                  >
                    <ButtonText>OKE</ButtonText>
                  </Button>
                )}
                {/* <Button className=" bg-red-700 rounded-full" onPress={onClose}>
              <ButtonText className=" text-white">{btnOK || "OKE"}</ButtonText>
              </Button> */}
              </ModalFooter>
            </ModalContent>
          </MotiView>
        </Modal>
      </Center>
    </>
  );
}
