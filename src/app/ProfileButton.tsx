import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import { Pressable, useColorScheme } from "react-native";

export default function ProfileButton() {
  const theme = useColorScheme();

  return (
    <Link href="/modal" asChild>
      <Pressable className="mr-3">
        {({ pressed }) => (
          <FontAwesome
            name="user"
            size={25}
            color={`${theme === "dark" ? DarkTheme.colors.text : DefaultTheme.colors.text}`}
            className={`${pressed ? "opacity-50" : "opacity-100"}`}
          />
        )}
      </Pressable>
    </Link>
  );
}
