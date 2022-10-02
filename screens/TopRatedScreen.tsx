import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor } from "../constants/color";
import MovieItem from "../components/MovieItem";
import { FlashList } from "@shopify/flash-list";

const data = [
  "a",
  "f",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
];

const TopRatedScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Top Movies</Text>
        <FlashList
          estimatedItemSize={250}
          data={data}
          renderItem={() => {
            return <MovieItem />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopRatedScreen;
