import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import { x } from "../constants/size";
import { useNavigation } from "@react-navigation/native";

interface IPopularMoviesProps {
  backdrop_path: string;
  id: number;
}

const PopularMovies: React.FC<IPopularMoviesProps> = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetail", { id: props.id })}
    >
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/original" + props.backdrop_path,
        }}
        style={{ width: x, height: x * (9 / 16) }}
      />
    </TouchableOpacity>
  );
};

export default PopularMovies;
