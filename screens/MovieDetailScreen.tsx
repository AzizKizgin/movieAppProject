import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { barActive, barBorder, mainColor, white } from "../constants/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Image } from "@rneui/base";
import { x } from "../constants/size";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

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

const getSimilarMovies = (id: number, setData: Function) => {
  axios({
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/" + id + "/similar",
    params: {
      api_key: "4e0054cb8c702942064fd550e09b4e38",
      language: "en-US",
      page: 1,
    },
  }).then((res) => {
    setData(res.data.results);
  });
};

const MovieDetailScreen = () => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isListed, setIsListed] = React.useState(false);
  const route = useRoute();
  const [currentID, setCurrentID] = React.useState(route.params?.id);

  const [movieData, setMovieData] = React.useState([]);
  const [similarMovies, setSimilarMovies] = React.useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getData(currentID, setMovieData);
    getSimilarMovies(currentID, setSimilarMovies);
  }, [currentID]);

  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
        <Image
          source={{
            uri:
              "https://image.tmdb.org/t/p/original" + movieData.backdrop_path,
          }}
          style={{ width: x, height: x * (9 / 16) }}
        />
        <View
          style={{
            alignSelf: "center",
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: white }}>
            {movieData.original_title}
          </Text>
          <Text style={{ fontSize: 13, color: white, marginTop: 5 }}>
            {movieData.release_date}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: white,
              marginTop: 5,
              paddingHorizontal: 20,
              textAlign: "justify",
            }}
          >
            {movieData.overview}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 25,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 100,
              height: 30,
              backgroundColor: "orange",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Rating: {movieData.vote_average?.toFixed(1)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              color={isFavorite ? "red" : white}
              name="favorite"
              type="material"
              size={30}
              onPress={() => setIsFavorite(!isFavorite)}
            />
            <Icon
              style={{ marginLeft: 10 }}
              color={isListed ? "#ff5500" : white}
              name="favorite"
              type="fontisto"
              size={25}
              onPress={() => setIsListed(!isListed)}
            />
          </View>
        </View>
        <View>
          <View>
            <Text
              style={{
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 16,
                fontWeight: "bold",
                fontVariant: ["small-caps"],
                color: "#72c0c9",
              }}
            >
              Companies
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={movieData.production_companies}
              horizontal
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() => {
                    //   navigation.navigate("CompanyDetail", {
                    //     id: item.item.id,
                    //     name: item.item.name,
                    //     logo: item.item.logo_path,
                    //   });
                    // }}
                    style={{
                      justifyContent: "center",
                      width: 150,
                      alignItems: "center",
                      height: 40,
                      backgroundColor: "#166b83",
                      marginHorizontal: 10,
                      borderRadius: 20,
                    }}
                  >
                    <Text style={{ color: white }}>{item.item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View>
            <Text
              style={{
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 16,
                fontWeight: "bold",
                fontVariant: ["small-caps"],
                color: "#72c0c9",
              }}
            >
              Genres
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={movieData.genres}
              horizontal
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      justifyContent: "center",
                      width: 80,
                      alignItems: "center",
                      height: 40,
                      backgroundColor: "#166b83",
                      marginHorizontal: 10,
                      borderRadius: 20,
                    }}
                  >
                    <Text style={{ color: white }}>{item.item.name}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 40,
              marginBottom: 10,
              fontSize: 16,
              fontWeight: "bold",
              fontVariant: ["small-caps"],
              color: "#72c0c9",
            }}
          >
            Similar Movies
          </Text>
          <FlatList
            horizontal
            data={similarMovies}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={{ marginHorizontal: 2 }}
                  activeOpacity={0.8}
                  onPress={() => {
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                    setCurrentID(item.item.id);
                  }}
                >
                  <Image
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/original" +
                        item.item.poster_path,
                    }}
                    style={{ height: 150, width: 100 }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;
