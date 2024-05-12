import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  Text,
  Linking,
  Button,
  ScrollView,
  Switch,
} from "react-native";

import { fetchMusicService, MusicServiceResponse } from "@/api/musicService";
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
      <View className="flex-1 mx-4 my-2">
        {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
        {!musicService.connected ? (
          <Button title="Authenticate" onPress={handleLogin} />
        ) : (
          <>
            <Text style={{ fontSize: 18 }}>{getServiceName(service)}</Text>

            <Text style={{ fontSize: 18 }}>
              Logged in as: {musicService.login}
            </Text>
            <Button
              title="Logout"
              onPress={() => {
                // TODO TBD Logout
              }}
            />
            <ScrollView>
              {musicService.artists.map((artist) => (
                <View
                  key={artist.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <Text>{artist.name}</Text>
                  <Switch />
                </View>
              ))}
            </ScrollView>
          </>
        )}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </>
  );
}
