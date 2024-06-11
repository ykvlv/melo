import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { FetchUserInfoResponse } from "@/api/fetchUserInfo";

interface ProfileInfoProps {
  userInfo: FetchUserInfoResponse;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo }) => {
  return (
    <View className="my-2 p-2 rounded-xl bg-white dark:bg-neutral-900">
      <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
        {userInfo.username}
      </Text>
      <Link href="/choose-city" asChild>
        <Pressable>
          {({ pressed }) => (
            <Text
              className={`${pressed ? "opacity-50" : "opacity-100"} text-base text-blue-500`}
            >
              {userInfo.cityName} {">"}
            </Text>
          )}
        </Pressable>
      </Link>
      <Text className="text-sm text-neutral-600 dark:text-neutral-400">
        Зарегистрирован с {userInfo.registeredAt}
      </Text>
    </View>
  );
};

export default ProfileInfo;

