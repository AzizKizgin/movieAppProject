import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from "react-native";
import React, { SetStateAction, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { barBorder, mainColor, white } from "../constants/color";
import PopularMovies from "../components/PopularMovies";
import { FlashList } from "@shopify/flash-list";
import MovieItem from "../components/MovieItem";
import axios from "axios";
import { x, y } from "../constants/size";
import Animated from "react-native-reanimated";

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
  const [nowPlayingData2, setNowPlayingData2] = React.useState([]);
  const [upComingData, setUpComingData] = React.useState([]);
  const [upComingData2, setUpComingData2] = React.useState([]);
  const [isNowPlaying, setIsNowPlaying] = React.useState(true);

  const dataIndex = 19;
  let index = 0;

  const [nowPlaying, setNowPlaying] = React.useState([]);
  const [upComing, setUpComing] = React.useState([]);

  const flatListRef = React.useRef<FlatList>(null);

  useEffect(() => {
    getData("popular", 1, setPopularData);
    getData("now_playing", 1, setNowPlayingData);
    getData("now_playing", 2, setNowPlayingData2);

    getData("upcoming", 1, setUpComingData);
    getData("upcoming", 2, setUpComingData2);
  }, []);

  const interval = setInterval(() => {
    index++;
    if (index > dataIndex) {
      index = 0;
    }
    flatListRef.current?.scrollToOffset({
      offset: index * Dimensions.get("window").width,
      animated: true,
    });
  }, 3000);
  return (
    <SafeAreaView
      style={{ backgroundColor: mainColor, flex: 1, width: x, height: y }}
    >
      <Animated.View style={{ flex: 1 }}>
        <FlatList
          data={isNowPlaying ? nowPlayingData : upComingData}
          ListHeaderComponent={
            <>
              <FlatList
                scrollEnabled={false}
                onScrollBeginDrag={() => {
                  clearInterval(interval);
                }}
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginVertical: 30,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsNowPlaying(true);
                  }}
                  style={{
                    width: 100,
                    height: 30,
                    backgroundColor: isNowPlaying ? white : barBorder,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: isNowPlaying ? barBorder : white }}>
                    Now Playing
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsNowPlaying(false);
                  }}
                  style={{
                    width: 100,
                    height: 30,
                    backgroundColor: isNowPlaying ? barBorder : white,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: isNowPlaying ? white : barBorder }}>
                    Upcoming
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
          renderItem={(item) => {
            return (
              <MovieItem
                key={item.item.id}
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
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;
