import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import { x } from "../constants/size";
import { white } from "../constants/color";
import { useNavigation } from "@react-navigation/native";

interface IMoviesItemProps {
  backdrop_path: string;
  id: number;
  original_title: string;
  release_date: string;
}

const MovieItem: React.FC<IMoviesItemProps> = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flexDirection: "row",
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
      }}
      onPress={() => {
        navigation.navigate("MovieDetail", { id: props.id });
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/original" + props.backdrop_path,
          }}
          style={{ width: 160, height: 90 }}
        />
        <View style={{ marginLeft: 10, alignSelf: "flex-start" }}>
          <Text style={{ color: white, fontSize: 16 }}>
            {props.original_title}
          </Text>
          <Text style={{ color: white, fontSize: 12 }}>
            {props.release_date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;
