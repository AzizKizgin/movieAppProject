import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { barBorder, mainColor, white } from "../constants/color";
import PopularMovies from "../components/PopularMovies";
import { FlashList } from "@shopify/flash-list";
import MovieItem from "../components/MovieItem";

const HomeScreen = () => {
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
  return (
    <SafeAreaView style={{ backgroundColor: mainColor, flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <FlashList
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
          estimatedItemSize={50}
          horizontal={true}
          data={data}
          renderItem={() => {
            return <PopularMovies />;
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 30,
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              height: 30,
              backgroundColor: barBorder,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: white }}>Now Playing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 30,
              backgroundColor: barBorder,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: white }}>Now Playing</Text>
          </TouchableOpacity>
        </View>
        <FlashList
          data={data}
          renderItem={() => {
            return <MovieItem />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
