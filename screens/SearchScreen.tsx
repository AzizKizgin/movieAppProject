import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor } from "../constants/color";

const SearchScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <Text>searchScreen</Text>
    </SafeAreaView>
  );
};

export default SearchScreen;
