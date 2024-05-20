import React from "react";
import { Text, View } from "react-native";

import { FetchUserInfoResponse } from "@/api/fetchUserInfo";

interface ProfileInfoProps {
  userInfo: FetchUserInfoResponse; // Текст, который будет отображаться в заголовке
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo }) => {
  return (
    <View className="my-2 p-2 rounded-xl bg-white dark:bg-neutral-900">
      <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
        {userInfo.username}
      </Text>
      <Text className="text-sm text-neutral-600 dark:text-neutral-400">
        Зарегистрирован с {userInfo.registeredAt}
      </Text>
    </View>
  );
};

export default ProfileInfo;
