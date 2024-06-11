import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

import { fetchEvent, FetchEventResponse } from "@/api/fetchEvent";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import { storage } from "@/data/storage";

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });
};

export default function Event() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [event, setEvent] = useState<FetchEventResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const theme = useColorScheme();

  useEffect(() => {
    const init = async () => {
      const token = await storage.get("jwtToken");
      if (token) {
        setLoading(true);
        try {
          await loadEvent(token, id);
        } finally {
          setLoading(false);
        }
      }
    };

    init();
  }, []);

  const loadEvent = async (token: string, eventId: string) => {
    try {
      const event = await fetchEvent(token, eventId);
      setEvent(event);
    } catch (error) {
      console.error("Failed to load event info:", error);
      setError("Failed to load event info");
    }
  };

  return (
    <>
      <ScrollView className="flex-1 px-4 py-4">
        {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : !event ? (
          <Text className="text-red-500 mt-2">Мероприятие не найдено</Text>
        ) : (
          <>
            <View className="my-2 bg-white rounded-xl overflow-hidden">
              <View
                className={`border-b
                      bg-white dark:bg-neutral-900
                      border-neutral-300 dark:border-neutral-800`}
              >
                <View className="overflow-hidden">
                  <Image
                    source={{ uri: event.photoUrl }}
                    style={{ width: "auto", height: 200 }}
                  />
                </View>
              </View>
              <View
                className={`border-b px-4 py-3
                      bg-white dark:bg-neutral-900
                      border-neutral-300 dark:border-neutral-800`}
              >
                <Text className="text-4xl font-bold text-neutral-900 dark:text-neutral-200">
                  {event.artistName}
                </Text>
                <View className="flex-row items-center">
                  <Header text={`${formatDate(event.date)}`} />
                  <Text className="text-2xl pl-2">{event.cityName}</Text>
                </View>
              </View>
              <View
                className={`border-b flex-row items-center px-4 py-3
                      bg-white dark:bg-neutral-900
                      border-neutral-300 dark:border-neutral-800`}
              >
                {event.latitude && event.longitude && (
                  <View className="relative overflow-hidden rounded-lg mr-4">
                    <Image
                      source={{
                        uri: `https://static.maps.2gis.com/1.0?s=600x400@2x&pt=${event.latitude},${event.longitude}~k:p~c:rd~s:l&z=15`,
                      }}
                      style={{ width: 80, height: 80 }}
                    />
                  </View>
                )}
                <View>
                  <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-200">
                    {event.stageName}
                  </Text>
                  <Link
                    href={`https://static.maps.2gis.com/1.0?s=600x400@2x&pt=${event.latitude},${event.longitude}~k:p~c:rd~s:l&z=15`}
                    asChild
                  >
                    <Pressable>
                      {({ pressed }) => (
                        <Text
                          className={`${pressed ? "opacity-50" : "opacity-100"} text-base text-blue-500`}
                        >
                          {event.latitude} {event.longitude}
                        </Text>
                      )}
                    </Pressable>
                  </Link>
                </View>
              </View>
              <View
                className={`flex-row items-center px-4 py-3
                      bg-white dark:bg-neutral-900
                      border-neutral-300 dark:border-neutral-800`}
              >
                <View className="flex-1">
                  <TouchableOpacity
                    className="p-3 my-2 rounded-md bg-red-500 flex-row items-center"
                    onPress={() => {}}
                  >
                    <View className="flex-shrink-0 mr-2">
                      <FontAwesome5
                        name="yandex"
                        size={24}
                        color={
                          theme === "dark"
                            ? DarkTheme.colors.card
                            : DefaultTheme.colors.card
                        }
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-white font-bold text-center">
                        Яндекс Афиша
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-3 my-2 rounded-md bg-yellow-500 flex-row items-center"
                    onPress={() => {}}
                  >
                    <View className="flex-shrink-0 mr-2">
                      <FontAwesome5
                        name="smile"
                        size={24}
                        color={
                          theme === "dark"
                            ? DarkTheme.colors.card
                            : DefaultTheme.colors.card
                        }
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-white font-bold text-center">
                        KASSIR RU
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Pressable>
              {({ pressed }) => (
                <View className="flex-row items-center mt-2">
                  <Header
                    text="Концерты в других городах"
                    className={`${pressed ? "opacity-50" : "opacity-100"}`}
                  />
                  <FontAwesome5
                    name="chevron-right"
                    size={17}
                    color={
                      theme === "dark"
                        ? DarkTheme.colors.text
                        : DefaultTheme.colors.text
                    }
                    className={`${pressed ? "opacity-50" : "opacity-100"} ml-1.5`}
                  />
                </View>
              )}
            </Pressable>
            <View className="my-2 bg-white rounded-xl overflow-hidden">
              {/* TODO REMOVE ALL UNDER*/}

              <View
                className={`border-b
                      flex-row justify-between items-center px-4 py-3
                      bg-white dark:bg-neutral-900
                      border-neutral-300 dark:border-neutral-800`}
              >
                <Text className="text-neutral-900 text-base dark:text-neutral-200">
                  8 июня 24 г.
                </Text>
                <Text className="text-neutral-900 text-base dark:text-neutral-200">
                  Москва
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={12}
                  color={
                    theme === "dark"
                      ? DarkTheme.colors.text
                      : DefaultTheme.colors.text
                  }
                />
              </View>

              <View
                className={`border-b
                      flex-row justify-between items-center px-4 py-3
                      bg-white dark:bg-neutral-900
                      border-neutral-300 dark:border-neutral-800`}
              >
                <Text className="text-neutral-900 text-base dark:text-neutral-200">
                  28 июля 24 г.
                </Text>
                <Text className="text-neutral-900 text-base dark:text-neutral-200">
                  Екатеринбург
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={12}
                  color={
                    theme === "dark"
                      ? DarkTheme.colors.text
                      : DefaultTheme.colors.text
                  }
                />
              </View>

              <View
                className={`
                      flex-row justify-between items-center px-4 py-3
                      bg-white dark:bg-neutral-900
                      border-neutral-300 dark:border-neutral-800`}
              >
                <Text className="text-neutral-900 text-base dark:text-neutral-200">
                  28 июля 24 г.
                </Text>
                <Text className="text-neutral-900 text-base dark:text-neutral-200">
                  Екатеринбург
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={12}
                  color={
                    theme === "dark"
                      ? DarkTheme.colors.text
                      : DefaultTheme.colors.text
                  }
                />
              </View>
            </View>

            {/* TODO REMOVE ALL ABOVE*/}
          </>
        )}
      </ScrollView>
    </>
  );
}
