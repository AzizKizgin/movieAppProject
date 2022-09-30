import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor } from "../constants/color";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: mainColor, flex: 1 }}>
      <Text>homeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
