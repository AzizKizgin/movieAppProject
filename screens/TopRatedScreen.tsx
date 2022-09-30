import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor } from "../constants/color";

const TopRatedScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <Text>TopRated</Text>
    </SafeAreaView>
  );
};

export default TopRatedScreen;
