import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

export const BackButtonScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const backPrev = () => {
    console.log("KEMBALI");
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              className="bg-red rounded pr-5"
              // onPress={() => router.back()}
              onPress={backPrev}
              style={{ paddingLeft: 0 }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                color={colorScheme == "dark" ? "#d7d7d7ff" : "#292727ff"}
                size={24}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </>
  );
};
