import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { authenticate } from "@/api/auth";
import { fetchUserInfo, FetchUserInfoResponse } from "@/api/fetchUserInfo";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import ProfileInfo from "@/components/ProfileInfo";
import RowComponent from "@/components/RowComponent";
import { getServiceName, MusicService } from "@/data/serviceInfo";
import { storage } from "@/data/storage";

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<FetchUserInfoResponse>({});
  const [jwtToken, setJwtToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const token = await storage.get("jwtToken");
      setJwtToken(token ? token : undefined);
      if (token) {
        setLoading(true);
        try {
          await loadUserInfo(token);
        } finally {
          setLoading(false);
        }
      }
    };

    init();
  }, []);

  const loadUserInfo = async (token: string) => {
    try {
      const userInfo = await fetchUserInfo(token);
      await storage.set("user", userInfo.username ? userInfo.username : "");
      setUserInfo(userInfo);
    } catch (error) {
      console.error("Failed to load user info:", error);
      setError("Failed to load user information");
    }
  };

  const handleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      const token = await authenticate(username, password, isLogin);
      await storage.set("jwtToken", token);
      setJwtToken(token);
      await loadUserInfo(token);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    storage.delete("jwtToken").then(() => {
      setJwtToken(undefined);
      setUserInfo({});
    });
    storage.delete("user");
  };

  return (
    <View className="flex-1 mx-4 my-2">
      {!jwtToken ? (
        <>
          <Header text={isLogin ? "Вход" : "Регистрация"} />
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Логин"
            className="border-gray-300 border-2 h-10 my-2 px-2 rounded-md"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Пароль"
            className="border-gray-300 border-2 h-10 my-2 px-2 rounded-md"
          />
          <CustomButton
            onPress={handleAuth}
            text={isLogin ? "Войти" : "Зарегистрироваться"}
          />
          {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
          <View className="flex-row items-center justify-center mt-4">
            <Text>
              {isLogin ? "Нужен аккаунт? " : "Уже зарегистрированы? "}
            </Text>
            <Switch
              value={!isLogin}
              onValueChange={() => setIsLogin(!isLogin)}
            />
          </View>
        </>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <ProfileInfo userInfo={userInfo} />
              <View className="my-4">
                <Header text="Музыкальные сервисы" />
                <View className="my-2 bg-white rounded-xl overflow-hidden">
                  <RowComponent
                    text={getServiceName(MusicService.YandexMusic)}
                    href="/service-settings"
                    service={MusicService.YandexMusic}
                    last={false}
                  />
                  <RowComponent
                    text={getServiceName(MusicService.VKMusic)}
                    href="/service-settings"
                    service={MusicService.VKMusic}
                    last
                  />
                </View>
              </View>
              <CustomButton onPress={handleLogout} text="Выйти" />
            </>
          )}
        </>
      )}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
