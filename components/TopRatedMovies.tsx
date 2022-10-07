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
  vote_average: number;
}

const TopRatedMovies: React.FC<IMoviesItemProps> = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      //@ts-ignore
      onPress={() => navigation.navigate("MovieDetail", { id: props.id })}
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
        <View
          style={{
            marginLeft: 10,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                color: white,
                fontSize: 16,
                width: 200,
              }}
            >
              {props.original_title}
            </Text>

            <Text style={{ color: white, fontSize: 12 }}>
              {props.release_date}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              alignSelf: "flex-start",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ color: white, fontSize: 14 }}>
              {props.vote_average}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopRatedMovies;
