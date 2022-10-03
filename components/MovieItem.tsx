import { View, Text } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import { x } from "../constants/size";
import { white } from "../constants/color";

interface IMoviesItemProps {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

const MovieItem: React.FC<IMoviesItemProps> = (props) => {
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
    </View>
  );
};

export default MovieItem;
