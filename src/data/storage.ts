import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async set(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving data", error);
    }
  },

  async get(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("Error fetching data", error);
      return null;
    }
  },

  async delete(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data", error);
    }
  },
};
