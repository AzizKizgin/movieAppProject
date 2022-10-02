import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor, white } from "../constants/color";
import { color } from "@rneui/base";

const AccountScreen = () => {
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
          UN
        </Text>
      </View>
      <View
        style={{
          marginTop: 75,
          paddingHorizontal: 10,
          paddingBottom: 50,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignSelf: "flex-start" }}>
          <TouchableOpacity style={{ marginBottom: 20 }}>
            <Text style={{ color: white, fontSize: 16 }}>İzleme Listem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginBottom: 20 }}>
            <Text style={{ color: white, fontSize: 16 }}>Favorilerim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginBottom: 20 }}>
            <Text style={{ color: white, fontSize: 16 }}>Hesap Ayarları</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={{ color: white, fontSize: 16 }}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
