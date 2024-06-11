import React from "react";
import { TouchableOpacity, Text } from "react-native";

// Определение пропсов для компонента CustomButton
interface ButtonProps {
  onPress: () => void; // Функция, которая будет вызвана при нажатии на кнопку
  text: string; // Текст, который будет отображаться на кнопке
  className?: string;
}

// Компонент CustomButton
const CustomButton: React.FC<ButtonProps> = ({ onPress, text, className }) => {
  return (
    <TouchableOpacity
      className={`p-3 my-2 rounded-md items-center bg-blue-500 ${className}`}
      onPress={onPress}
    >
      <Text className="text-white font-bold">{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
