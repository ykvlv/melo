import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";

export default function TabOneScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Tab One</Text>
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </View>
        <View style={styles.separator} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
});
