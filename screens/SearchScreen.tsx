import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor, white } from "../constants/color";
import { Icon, Input } from "@rneui/base";

const SearchScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: mainColor }}
    ></SafeAreaView>
  );
};

export default SearchScreen;
