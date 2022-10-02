import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor, searchItem, white } from "../constants/color";
import { Icon, Input } from "@rneui/base";
import { FlashList } from "@shopify/flash-list";
import MovieItem from "../components/MovieItem";

const data = [
  "a",
  "f",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
];

const SearchScreen = () => {
  const ref = React.useRef<Input>(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <View>
        <Input
          leftIcon={<Icon name="search" size={30} color={searchItem} />}
          placeholder="Search"
          placeholderTextColor={searchItem}
          selectionColor={searchItem}
          inputContainerStyle={{ backgroundColor: white }}
        />
      </View>

      <FlashList
        estimatedItemSize={50}
        data={data}
        renderItem={() => {
          return <MovieItem />;
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
