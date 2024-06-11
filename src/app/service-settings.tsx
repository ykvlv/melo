import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Linking,
  Button,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";

import { fetchMusicService, MusicServiceResponse } from "@/api/musicService";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import { getAuthUrl, getServiceName, MusicService } from "@/data/serviceInfo";
import { storage } from "@/data/storage";

export default function ServiceSettings() {
  const { service } = useLocalSearchParams<{ service: MusicService }>();
  const [user, setUser] = useState<string>("");

  const [musicService, setMusicService] = useState<MusicServiceResponse>({
    artists: [],
    connected: false,
    login: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const token = await storage.get("jwtToken");
      const user = await storage.get("user");
      setUser(user ? user : "");
      if (token) {
        setLoading(true);
        try {
          await loadMusicService(token);
        } finally {
          setLoading(false);
        }
      }
    };

    init();
  }, []);

  const loadMusicService = async (token: string) => {
    try {
      const musicService = await fetchMusicService(token, service);
      setMusicService(musicService);
    } catch (error) {
      console.error("Failed to load music service info:", error);
      setError("Failed to load music service info");
    }
  };

  const handleLogin = () => {
    // Замените URL на адрес страницы аутентификации
    Linking.openURL(getAuthUrl(service, user));
  };

  return (
    <>
      <ScrollView className="flex-1 px-4 py-2">
        {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : !musicService.connected ? (
          <Button title="Authenticate" onPress={handleLogin} />
        ) : (
          <>
            <View className="h-1"/>
            <Header text={getServiceName(service)} />

            <Text className="text-xl text-neutral-900 dark:text-neutral-200">
              Выполнен вход: {musicService.login}
            </Text>
            <CustomButton
              onPress={() => {}} // TODO ВЫХОДИТЬ ИЗ МУЗЫКИ
              text="Выйти"
              className="bg-red-700"
            />
            <View className="my-2 bg-white rounded-xl overflow-hidden">
              {musicService.artists.map((artist, id) => (
                <View
                  className={`${id === musicService.artists.length - 1 ? "border-b-0" : "border-b"} flex-row justify-between items-center px-4 py-3 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800`}
                  key={artist.id}
                >
                  <View className="flex-row items-center">
                    {artist.photoUrl && (
                      <View className="relative overflow-hidden rounded-lg mr-4">
                        <Image
                          source={{ uri: artist.photoUrl }}
                          style={{ width: 50, height: 50 }}
                        />
                      </View>
                    )}
                    <Text className="text-lg text-neutral-900 dark:text-neutral-200">
                      {artist.name}
                    </Text>
                  </View>
                  <Switch value />
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}
