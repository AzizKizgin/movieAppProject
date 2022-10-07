import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  barActive,
  barBorder,
  mainColor,
  searchItem,
  white,
} from "../constants/color";
import { Icon, Input } from "@rneui/base";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: mainColor,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Input
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="E-Mail"
          placeholderTextColor={searchItem}
          selectionColor={searchItem}
          leftIcon={
            <Icon name="email" type="material" size={25} color={searchItem} />
          }
          leftIconContainerStyle={{ marginRight: 10 }}
          inputStyle={{ color: white }}
        />
        <Input
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Password"
          placeholderTextColor={searchItem}
          selectionColor={searchItem}
          leftIcon={
            <Icon name="lock" type="material" size={25} color={searchItem} />
          }
          leftIconContainerStyle={{ marginRight: 10 }}
          inputStyle={{ color: white }}
        />
        <Button
          color={barBorder}
          mode="contained"
          style={{ borderRadius: 20 }}
          compact
          onPress={() => console.log("Pressed")}
        >
          <Text style={{ color: white }}>Login</Text>
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: white }}>Forgot Password?</Text>
          <TouchableOpacity
            //@ts-ignore
            onPress={() => navigation.navigate("Register")}
            activeOpacity={0.8}
          >
            <Text style={{ color: "orange" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
