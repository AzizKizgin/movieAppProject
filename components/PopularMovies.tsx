import { View, Text } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import { x } from "../constants/size";

const PopularMovies = () => {
  return (
    <View>
      <Image
        source={require("../assets/example/backdrop.jpg")}
        style={{ width: x, height: x * (9 / 16) }}
      />
    </View>
  );
};

export default PopularMovies;
