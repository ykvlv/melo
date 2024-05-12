import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text, useColorScheme } from "react-native";

// Определение пропсов для компонента CustomButton
interface ButtonProps {
  onPress: () => void; // Функция, которая будет вызвана при нажатии на кнопку
  text: string; // Текст, который будет отображаться на кнопке
}

// Компонент CustomButton
const CustomButton: React.FC<ButtonProps> = ({ onPress, text }) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          theme === "dark"
            ? DarkTheme.colors.primary
            : DefaultTheme.colors.primary,
      }}
      className="p-3 my-2 rounded-md items-center"
      onPress={onPress}
    >
      <Text className="text-white font-bold">{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
