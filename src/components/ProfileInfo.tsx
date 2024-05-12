import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { Text, useColorScheme, View } from "react-native";

import { FetchUserInfoResponse } from "@/api/fetchUserInfo";

interface ProfileInfoProps {
  userInfo: FetchUserInfoResponse; // Текст, который будет отображаться в заголовке
}

// Компонент CustomButton
const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo }) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor:
          theme === "dark" ? DarkTheme.colors.card : DefaultTheme.colors.card,
      }}
      className="my-2 p-2 rounded-xl"
    >
      <Text
        style={{
          color:
            theme === "dark" ? DarkTheme.colors.text : DefaultTheme.colors.text,
        }}
        className="text-xl font-bold"
      >
        {userInfo.username}
      </Text>
      <Text className="text-sm text-gray-600 dark:text-gray-400">
        Зарегистрирован с {userInfo.registeredAt}
      </Text>
    </View>
  );
};

export default ProfileInfo;
