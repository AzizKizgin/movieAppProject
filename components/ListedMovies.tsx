import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import { x } from "../constants/size";
import { white } from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

interface IMoviesItemProps {
  id: number;
}

const getData = (id: number, setData: Function) => {
  axios({
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/" + id,
    params: {
      api_key: "4e0054cb8c702942064fd550e09b4e38",
      language: "en-US",
    },
  }).then((res) => {
    setData(res.data);
  });
};

const MovieItem: React.FC<IMoviesItemProps> = (props) => {
  const navigation = useNavigation();
  const [data, setData] = React.useState({});
  getData(props.id, setData);
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
        //@ts-ignore
        navigation.navigate("MovieDetail", { id: props.id });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/original" + data.backdrop_path,
          }}
          style={{ width: 160, height: 90 }}
        />
        <View
          style={{
            marginLeft: 10,
            alignSelf: "flex-start",
            flex: 1,
            paddingRight: 10,
          }}
        >
          <Text style={{ color: white, fontSize: 16 }}>
            {data.original_title}
          </Text>
          <Text style={{ color: white, fontSize: 12, marginTop: 5 }}>
            {data.release_date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;
