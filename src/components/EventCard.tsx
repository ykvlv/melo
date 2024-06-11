import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { EventData } from "@/data/event";

interface EventProps {
  event: EventData;
  href: Href<string>;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });
};

// Компонент CustomButton
const EventCard: React.FC<EventProps> = ({ event, href }) => {
  return (
    <Link
      href={{ pathname: href, params: { id: event.id.toString() } }}
      asChild
      className="mr-2"
    >
      <Pressable>
        {({ pressed }) => (
          <View className={`${pressed ? "opacity-50" : "opacity-100"}`}>
            {event.photoUrl && (
              <View className="relative overflow-hidden rounded-lg">
                <Image
                  source={{ uri: event.photoUrl }}
                  style={{ width: 200, height: 100 }}
                />
              </View>
            )}
            <View className="mt-1">
              <Text className="text-base font-bold text-neutral-900 dark:text-neutral-200">
                {event.artistName}
              </Text>
              <Text className="text-sm text-gray-600">
                {formatDate(event.date)}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

export default EventCard;
