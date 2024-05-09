import React from "react";
import { ScrollView, View, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center py-7">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold mx-4">Tab One</Text>
        </View>
      </View>
    </ScrollView>
  );
}
