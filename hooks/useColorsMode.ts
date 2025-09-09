import { Colors as ColorsMode } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// export function modeDark(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? 'light';
// //   const colorScheme = useColorScheme();
// //   const colorFromProps = props[theme];
//     return 'theme';
// }

// export function useDarkMode(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? "light";
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }

export function useColorsMode() {
  const colorScheme = useColorScheme();
  const text = colorScheme === "dark" ? "Dark Mode" : "Light Mode";
  if (colorScheme == "dark") {
    return {
      text: ColorsMode.dark.text,
      textWhite: ColorsMode.dark.textWhite,
      textBlack: ColorsMode.dark.textBlack,
      background: ColorsMode.dark.background,
      tint: ColorsMode.dark.tint,
      icon: ColorsMode.dark.icon,
      tabIconDefault: ColorsMode.dark.tabIconDefault,
      tabIconSelected: ColorsMode.dark.tabIconSelected,
      iconColor: "#b8b8b8",
      btnBgPrimary: "#01497dff",
    };
  } else {
    return {
      text: ColorsMode.light.text,
      textWhite: ColorsMode.dark.textWhite,
      textBlack: ColorsMode.dark.textBlack,
      background: ColorsMode.light.background,
      tint: ColorsMode.light.tint,
      icon: ColorsMode.light.icon,
      tabIconDefault: ColorsMode.light.tabIconDefault,
      tabIconSelected: ColorsMode.light.tabIconSelected,
      iconColor: "#373838",
      btnBgPrimary: "#0769afff",
    };
  }
}
