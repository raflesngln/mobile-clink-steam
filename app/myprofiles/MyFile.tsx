import { SafeAreaView, Text, View } from "react-native";

export default function Modal() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text className="text-3xl font-bold mb-[30px]">My Files Data</Text>
      <View>
        <Text className="text-red-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
          tenetur ea commodi laborum perferendis placeat cumque voluptatibus,
          autem laudantium accusamus recusandae eveniet accusantium quaerat
          labore, id soluta nemo rem neque.
        </Text>
      </View>
    </SafeAreaView>
  );
}