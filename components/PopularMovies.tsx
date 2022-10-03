import { View, Text } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import { x } from "../constants/size";

interface IPopularMoviesProps {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

const PopularMovies: React.FC<IPopularMoviesProps> = (props) => {
  return (
    <View>
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/original" + props.backdrop_path,
        }}
        style={{ width: x, height: x * (9 / 16) }}
      />
    </View>
  );
};

export default PopularMovies;
