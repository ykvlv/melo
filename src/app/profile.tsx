import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
} from "react-native";

import { authenticate, logout } from "@/api/auth";
import { fetchUserInfo, FetchUserInfoResponse } from "@/api/fetchUserInfo";
import { storage } from "@/storage/storage";

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
      const token = storage.getString("jwtToken");
      setJwtToken(token);
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
      storage.set("jwtToken", token);
      setJwtToken(token);
      await loadUserInfo(token);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    storage.delete("jwtToken");
    setJwtToken(undefined);
    setUserInfo({});
  };

  return (
    <View className="flex-1 items-center justify-center">
      {!jwtToken ? (
        <>
          <Text className="text-2xl font-bold">
            {isLogin ? "Login" : "Register"}
          </Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            className="border-gray-300 border-2 h-10 w-3/4 my-2 px-2"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            className="border-gray-300 border-2 h-10 w-3/4 my-2 px-2"
          />
          <Button
            title={isLogin ? "Log In" : "Register"}
            onPress={handleAuth}
          />
          {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
          <View className="flex-row items-center mt-5">
            <Text>{isLogin ? "Need an account? " : "Have an account? "}</Text>
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
              <Text className="text-3xl font-bold">Profile</Text>
              <Text>Welcome to your profile, {userInfo.username}!</Text>
              <Text>Registered on: {userInfo.registeredAt}</Text>
              <Button title="Logout" onPress={handleLogout} />
            </>
          )}
        </>
      )}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
