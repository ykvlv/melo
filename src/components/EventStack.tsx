import { FontAwesome5 } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";

import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import { EventData } from "@/data/event";

interface EventStackProps {
  events: EventData[];
  headerText: string;
}

const EventStack: React.FC<EventStackProps> = ({ events, headerText }) => {
  const theme = useColorScheme();

  return (
    <View className="pt-2">
      <Pressable>
        {({ pressed }) => (
          <View className="flex-row items-center">
            <Header
              text={headerText}
              className={`${pressed ? "opacity-50" : "opacity-100"} pl-4`}
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-auto pl-4 pt-2"
      >
        {events.map((event) => (
          <EventCard event={event} key={event.id} href="/event" />
        ))}
      </ScrollView>
    </View>
  );
};

export default EventStack;
