import { FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor } from "../constants/color";
import axios from "axios";
import TopRatedMovies from "../components/TopRatedMovies";

const getData = (page: number, setData: Function) => {
  axios({
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/top_rated",
    params: {
      api_key: "4e0054cb8c702942064fd550e09b4e38",
      language: "en-US",
      page: page,
    },
  }).then((res) => {
    setData(res.data.results);
  });
};

const TopRatedScreen = () => {
  const [topRatedData1, setTopRatedData1] = React.useState([]);
  const [topRatedData2, setTopRatedData2] = React.useState([]);
  let data = Array<any>();

  useEffect(() => {
    getData(1, setTopRatedData1);
    getData(2, setTopRatedData2);
  }, []);
  data = data.concat(topRatedData1, topRatedData2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <FlatList
        data={data}
        renderItem={(item) => {
          return (
            <TopRatedMovies
              backdrop_path={item.item.backdrop_path}
              genre_ids={item.item.genre_ids}
              original_title={item.item.original_title}
              overview={item.item.overview}
              release_date={item.item.release_date}
              id={item.item.id}
              vote_average={item.item.vote_average}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default TopRatedScreen;
