// Определение пропсов для компонента CustomButton
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { Text, useColorScheme } from "react-native";

interface HeaderProps {
  text: string; // Текст, который будет отображаться в заголовке
}

// Компонент CustomButton
const Header: React.FC<HeaderProps> = ({ text }) => {
  const theme = useColorScheme();

  return (
    <Text
      style={{
        color:
          theme === "dark" ? DarkTheme.colors.text : DefaultTheme.colors.text,
      }}
      className="text-2xl font-bold"
    >
      {text}
    </Text>
  );
};

export default Header;
