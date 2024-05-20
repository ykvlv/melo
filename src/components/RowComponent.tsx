import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Href, Link } from "expo-router";
import React from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

import { MusicService } from "@/data/serviceInfo";

interface RowComponentProps {
  text: string; // Текст, который будет отображаться в заголовке
  href: Href<string>;
  service: MusicService;
  last: boolean;
}

// Компонент CustomButton
const RowComponent: React.FC<RowComponentProps> = ({
  text,
  href,
  service,
  last,
}) => {
  const theme = useColorScheme();

  return (
    <Link href={{ pathname: href, params: { service } }} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            className={`${pressed ? "opacity-50" : "opacity-100"}
              ${last ? "border-b-0" : "border-b"}
              flex-row justify-between items-center px-4 py-3
              bg-white dark:bg-neutral-900
              border-neutral-300 dark:border-neutral-800`}
          >
            <Text className="text-neutral-900 dark:text-neutral-200">
              {text}
            </Text>
            <FontAwesome
              name="chevron-right"
              size={12}
              color={
                theme === "dark"
                  ? DarkTheme.colors.text
                  : DefaultTheme.colors.text
              }
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
};

export default RowComponent;
