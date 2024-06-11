import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { fetchNearestEvents } from "@/api/fetchNearestEvents";
import { fetchNewestEvents } from "@/api/fetchNewestEvents";
import { fetchPersonalEvents } from "@/api/fetchPersonalEvents";
import EventStack from "@/components/EventStack";
import { EventData } from "@/data/event";
import { storage } from "@/data/storage";

export default function Index() {
  const [jwtToken, setJwtToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [personalEvents, setPersonalEvents] = useState<EventData[] | undefined>(
    undefined,
  );
  const [nearestEvents, setNearestEvents] = useState<EventData[] | undefined>();
  const [newestEvents, setNewestEvents] = useState<EventData[] | undefined>();
  const [refreshing, setRefreshing] = useState(false);

  const init = async () => {
    const token = await storage.get("jwtToken");
    setError("");
    setJwtToken(token ? token : undefined);
    if (token) {
      try {
        await loadPersonalEvents(token);
        await loadNewestEvents(token);
        await loadNearestEvents(token);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    init();

    setRefreshing(false);
  }, []);

  useEffect(() => {
    init();
  }, []);

  const loadNewestEvents = async (token: string) => {
    try {
      const newestEvents = await fetchNewestEvents(token);
      setNewestEvents(newestEvents.events);
    } catch (error) {
      console.error("Failed to load events info:", error);
      setError("Failed to load events information");
    }
  };

  const loadNearestEvents = async (token: string) => {
    try {
      const nearestEvents = await fetchNearestEvents(token);
      setNearestEvents(nearestEvents.events);
    } catch (error) {
      console.error("Failed to load events info:", error);
      setError("Failed to load events information");
    }
  };

  const loadPersonalEvents = async (token: string) => {
    try {
      const personalEvents = await fetchPersonalEvents(token);
      setPersonalEvents(personalEvents.events);
    } catch (error) {
      console.error("Failed to load events info:", error);
      setError("Failed to load events information");
    }
  };

  return (
    <ScrollView
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="my-2">
        {error && <Text className="text-red-500 mt-2">{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : jwtToken ? (
          <>
            {personalEvents && personalEvents.length > 0 && (
              <EventStack events={personalEvents} headerText="Ваши концерты" />
            )}
            {nearestEvents && nearestEvents.length > 0 && (
              <EventStack
                events={nearestEvents}
                headerText="Ближайшие концерты"
              />
            )}
            {newestEvents && newestEvents.length > 0 && (
              <EventStack events={newestEvents} headerText="Новые концерты" />
            )}
          </>
        ) : (
          <Text className="text-lg text-center px-4">
            Авторизуйтесь в приложении.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
