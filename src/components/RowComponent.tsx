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
            style={{
              backgroundColor:
                theme === "dark"
                  ? DarkTheme.colors.card
                  : DefaultTheme.colors.card,
              borderColor:
                theme === "dark"
                  ? DarkTheme.colors.border
                  : DefaultTheme.colors.border,
              borderBottomWidth: last ? 0 : 1,
            }}
            className={`flex-row justify-between items-center px-4 py-3 ${pressed ? "opacity-50" : "opacity-100"}`}
          >
            <Text
              style={{
                color:
                  theme === "dark"
                    ? DarkTheme.colors.text
                    : DefaultTheme.colors.text,
              }}
            >
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
