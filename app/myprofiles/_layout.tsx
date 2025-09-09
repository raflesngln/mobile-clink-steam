import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { translate, i18n } from "@/i18n/locales";

export default function ProductNavigator() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="changeLanguage"
        options={{
          title: translate("common.screen.change_language"),
        }}
      />
      <Stack.Screen
        name="MyProfileInfo"
        options={{
          title: translate("common.screen.profile"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          title: translate("common.screen.change_password"),
        }}
      />
      <Stack.Screen name="history" />
      {/* <Stack.Screen name="../../profile" /> */}
    </Stack>
  );
}
