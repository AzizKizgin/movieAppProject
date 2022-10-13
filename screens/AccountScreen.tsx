import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor, white } from "../constants/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const AccountScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = React.useState(user?.displayName);

  navigation.addListener("focus", () => {
    setDisplayName(user?.displayName);
  });
  return (
    <SafeAreaView style={{ backgroundColor: mainColor, flex: 1 }}>
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: "#9380ed",
        }}
      >
        <Text style={{ fontSize: 36, fontWeight: "bold", color: mainColor }}>
          {displayName?.charAt(0).toUpperCase()}
          {displayName?.split(" ")[1] !== undefined
            ? displayName?.split(" ")[1].charAt(0).toUpperCase()
            : displayName?.charAt(1).toUpperCase()}
        </Text>
      </View>
      <View
        style={{
          marginTop: 75,
          paddingHorizontal: 15,
          paddingBottom: 50,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignSelf: "flex-start" }}>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("WatchListScreen")}
          >
            <Text style={{ color: white, fontSize: 16 }}>Watch List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("FavListScreen")}
          >
            <Text style={{ color: white, fontSize: 16 }}>Favories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <Text style={{ color: white, fontSize: 16 }}>Account Settings</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            const auth = getAuth();
            signOut(auth)
              .then((res) => {
                navigation.navigate("LoginScreen");
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          <Text style={{ color: white, fontSize: 16 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
