import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { x, y } from "../constants/size";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor, white } from "../constants/color";
import { CardImage } from "@rneui/base/dist/Card/Card.Image";
import axios from "axios";
import MovieItem from "../components/MovieItem";

const getData = (companyName: string, page: number, setData: Function) => {
  axios({
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      api_key: "4e0054cb8c702942064fd550e09b4e38",
      language: "en-US",
      sort_by: "popularity.desc",
      page: page,
      with_companies: companyName,
    },
  }).then((res) => {
    setData(res.data.results);
  });
};

const CompanyDetailScreen = () => {
  const route = useRoute();

  const [movieData1, setMovieData1] = React.useState([]);
  const [movieData2, setMovieData2] = React.useState([]);
  let movies = Array<any>();

  useEffect(() => {
    getData(route.params?.name, 1, setMovieData1);
    getData(route.params?.name, 2, setMovieData2);
  }, []);

  movies = movies.concat(movieData1, movieData2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <CardImage
        style={{ width: x, height: y, resizeMode: "contain" }}
        source={{
          uri:
            route.params?.logo !== null
              ? "https://image.tmdb.org/t/p/w500" + route.params?.logo
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png?20200606142532",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 5,
              color: white,
            }}
          >
            {route.params?.name}
          </Text>
        </View>
        <FlatList
          data={movies}
          renderItem={(item) => {
            return (
              <MovieItem
                key={item.item.id}
                backdrop_path={item.item.backdrop_path}
                id={item.item.id}
                original_title={item.item.original_title}
                release_date={item.item.release_date}
              />
            );
          }}
        />
      </CardImage>
    </SafeAreaView>
  );
};

export default CompanyDetailScreen;
