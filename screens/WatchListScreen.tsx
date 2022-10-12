import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { mainColor } from "../constants/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../App";
import MovieItem from "../components/MovieItem";
import axios from "axios";

interface ItemProps {
  id: number;
  backdrop_path: string;
  original_title: string;
  release_date: string;
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
    setData((prev) => {
      return [...prev, res.data];
    });
  });
};

const WatchListScreen = async () => {
  const [data, setData] = React.useState([]);

  const docRef = doc(db, getAuth().currentUser?.uid, "WatchList");
  const docSnap = getDoc(docRef);

  console.log("first");
  return (
    <SafeAreaView style={{ backgroundColor: mainColor, flex: 1 }}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <MovieItem
                key={item.id}
                backdrop_path={item.backdrop_path}
                id={item.id}
                original_title={item.original_title}
                release_date={item.release_date}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WatchListScreen;
