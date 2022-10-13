import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { mainColor, white } from "../constants/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../App";
import ListedMovies from "../components/ListedMovies";
import { useNavigation } from "@react-navigation/native";

// const getData = (id: number, data: Function) => {
//   axios({
//     method: "GET",
//     url: "https://api.themoviedb.org/3/movie/" + id,
//     params: {
//       api_key: "4e0054cb8c702942064fd550e09b4e38",
//       language: "en-US",
//     },
//   }).then((res) => {
//     data((prev) => [...prev, res.data.ids]);
//   });
// };

const SetData = async (array: Function) => {
  const docRef = doc(db, getAuth().currentUser?.uid, "FavList");
  const docSnap = await getDoc(docRef);

  if (await docSnap.exists()) {
    array(await docSnap.data().ids);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const FavListScreen = () => {
  const [watchList, setWatchList] = React.useState([]);

  const navigation = useNavigation();

  navigation.addListener("focus", () => {
    SetData(setWatchList);
  });

  useEffect(() => {
    SetData(setWatchList);
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: mainColor, flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "orange" }}>Favorite Movies</Text>
      </View>
      {watchList.length !== 0 ? (
        <View style={{ flex: 1, marginBottom: 5 }}>
          <FlatList
            data={watchList}
            renderItem={({ item }) => {
              return <ListedMovies id={item} />;
            }}
          />
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ color: white }}>There is nothing to see</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavListScreen;
