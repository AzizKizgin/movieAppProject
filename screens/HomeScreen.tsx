import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { barBorder, mainColor, white } from "../constants/color";
import PopularMovies from "../components/PopularMovies";
import { FlashList } from "@shopify/flash-list";
import MovieItem from "../components/MovieItem";
import axios from "axios";
import { x, y } from "../constants/size";

const getData = (movieType: string, page: number, setData: Function) => {
  axios({
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/" + movieType,
    params: {
      api_key: "4e0054cb8c702942064fd550e09b4e38",
      language: "en-US",
      page: page,
    },
  }).then((res) => {
    setData(res.data.results);
  });
};

const HomeScreen = () => {
  const [popularData, setPopularData] = React.useState([]);
  const [nowPlayingData, setNowPlayingData] = React.useState([]);
  const [upcomingData, setUpcomingData] = React.useState([]);
  const [isNowPlaying, setIsNowPlaying] = React.useState(true);

  useEffect(() => {
    getData("popular", 1, setPopularData);
    getData("now_playing", 1, setNowPlayingData);
    getData("upcoming", 1, setUpcomingData);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: mainColor, flex: 1 }}>
      <View
        style={{
          overflow: "hidden",
          flex: 1,
          flexGrow: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
            <FlashList
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              decelerationRate={"fast"}
              snapToInterval={Dimensions.get("window").width}
              estimatedItemSize={120}
              horizontal={true}
              data={popularData}
              renderItem={(item) => {
                return (
                  <PopularMovies
                    backdrop_path={item.item.backdrop_path}
                    genre_ids={item.item.genre_ids}
                    id={item.item.id}
                    original_title={item.item.original_title}
                    overview={item.item.overview}
                    release_date={item.item.release_date}
                  />
                );
              }}
            />
          </View>
          <View>
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
                <Text style={{ color: white }}>Upcoming</Text>
              </TouchableOpacity>
            </View>
            <FlashList
              overScrollMode="never"
              estimatedItemSize={50}
              data={nowPlayingData}
              renderItem={(item) => {
                return (
                  <MovieItem
                    backdrop_path={item.item.backdrop_path}
                    genre_ids={item.item.genre_ids}
                    id={item.item.id}
                    original_title={item.item.original_title}
                    overview={item.item.overview}
                    release_date={item.item.release_date}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
