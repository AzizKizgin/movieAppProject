import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor } from "../constants/color";

const AccountScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: mainColor, flex: 1 }}>
      <Text>AccountScreen</Text>
    </SafeAreaView>
  );
};

export default AccountScreen;
