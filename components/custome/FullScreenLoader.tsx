import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

interface Props {
  visible: boolean;
}

const FullScreenLoader: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FullScreenLoader;
