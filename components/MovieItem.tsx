import { View, Text } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import { x } from "../constants/size";
import { white } from "../constants/color";

const MovieItem = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/example/backdrop.jpg")}
          style={{ width: 160, height: 90 }}
        />
        <View style={{ marginLeft: 10, alignSelf: "flex-start" }}>
          <Text style={{ color: white, fontSize: 16 }}>Name</Text>
          <Text style={{ color: white, fontSize: 12 }}>Year</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieItem;
