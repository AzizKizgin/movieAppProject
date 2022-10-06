import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor, searchItem, white } from "../constants/color";
import { Icon, Input } from "@rneui/base";
import { FlashList } from "@shopify/flash-list";
import MovieItem from "../components/MovieItem";
import { x, y } from "../constants/size";
import axios from "axios";

const getData = (query: string, page: number, setData: Function) => {
  axios({
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      api_key: "4e0054cb8c702942064fd550e09b4e38",
      language: "en-US",
      query: query == "" ? "a" : query,
      page: page,
      include_adult: false,
    },
  }).then((res) => {
    setData(res.data.results);
  });
};

const SearchScreen = () => {
  const [searchData, setSearchData] = React.useState([]);
  const [query, setQuery] = React.useState("");
  useEffect(() => {
    getData(query, 1, setSearchData);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <View>
        <Input
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            getData(text, 1, setSearchData);
          }}
          leftIcon={<Icon name="search" size={30} color={searchItem} />}
          placeholder="Search"
          placeholderTextColor={searchItem}
          selectionColor={searchItem}
          inputContainerStyle={{ backgroundColor: white }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={searchData}
          renderItem={(item) => {
            return (
              <MovieItem
                backdrop_path={item.item.backdrop_path}
                id={item.item.id}
                original_title={item.item.original_title}
                release_date={item.item.release_date}
                key={item.item.id}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
