import { Ionicons } from "@expo/vector-icons";
import { MotiView, useDynamicAnimation } from "moti";
import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: DEVICE_WIDTH } = Dimensions.get("window");

const TAB_BAR_WIDTH = DEVICE_WIDTH * 0.80;
const TAB_ICONS = ["keypad-outline", "camera","person-circle-outline"];
const TAB_LABELS = ["Home","Explore", "Profile"];
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_ICONS.length;

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const colorScheme = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  const bubbleAnim = useDynamicAnimation(() => ({
    translateX: state.index * TAB_WIDTH,
  }));

  React.useEffect(() => {
    bubbleAnim.animateTo({ translateX: state.index * TAB_WIDTH });
  }, [state.index]);

  return (
    <View
      style={[
        styles.tabBar,
        {
          paddingBottom: bottom + 1,
          // backgroundColor: colorScheme == "dark" ? "#3e3f3fce" : "#96cdface",
          backgroundColor: colorScheme == "dark" ? "#3e3f3fce" : "#3579bdde",
        },
      ]}
    >
      {/* Bubble anim */}
      <MotiView
        state={bubbleAnim}
        transition={{
          type: "spring",
          damping: 13,
          stiffness: 200,
        }}
        style={styles.bubbleContainer}
      >
        <View
          style={[
            styles.bubble,
            {
              backgroundColor:
                colorScheme == "dark" ? "#5b5959ff" : "#0d5296ff",
            },
          ]}
        />
      </MotiView>

      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const iconName = TAB_ICONS[index];
        const label = TAB_LABELS[index];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.9}
          >
            <View style={styles.tabContent}>
              {/* ICON */}
              <Ionicons
                name={iconName as any}
                size={22}
                // color={isFocused ? "#ffffff" : "#4a4a4aff"}
                color={
                  isFocused
                    ? colorScheme === "dark"
                      ? "#ffffff"
                      : "#ffffffff"
                    : colorScheme === "dark"
                    ? "#9d9999ff"
                    : "#CBD5E0"
                }
              />

              {/* LABEL */}
              <Text
                style={[
                  styles.label,
                  { color: colorScheme === "dark" ? "#9d9999ff" : "#CBD5E0" },
                  isFocused && styles.labelFocused,
                ]}
              >
                {!isFocused && label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    // backgroundColor: "#96cdface",
    borderRadius: 50,
    position: "absolute",
    bottom: Platform.select({
      ios: 20,
      android: 12,
    }),
    alignSelf: "center",
    width: TAB_BAR_WIDTH,
    height: 65,
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#222323ff",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 20, // Android hanya menggunakan elevation untuk bayangan.
        shadowColor: "#222323ff",
      },
      default: {
        elevation: 12,
        shadowColor: "#222323ff",
        // Untuk platform lain jika ada
      },
    }),
  },
  bubbleContainer: {
    position: "absolute",
    width: TAB_WIDTH,
    height: 35, // cukup untuk icon aja
    left: 0,
    // top: 12, // supaya posisinya sejajar icon
    top:Platform.select({
      ios: 18,
      android: 12, // biasanya Android render-nya sedikit lebih turun
    }),
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    width: 45,
    height: 45,
    // backgroundColor: "#1485d6ff",
    borderRadius: 999,
  },
  tabButton: {
    width: TAB_WIDTH,
    // height: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginTop: 30,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    marginTop: Platform.select({
      ios: 18,
      android: -3, // biasanya Android render-nya sedikit lebih turun
    }),
    paddingBottom: Platform.select({
      ios: 1,
      android: 2, // biasanya Android render-nya sedikit lebih turun
    }),
  },
  label: {
    marginTop: 3,
    fontSize: 12,
    // color: "#4a4a4aff",
  },
  labelFocused: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default CustomTabBar;
