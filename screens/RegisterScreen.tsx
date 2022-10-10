import { View, Text, TouchableOpacity, Alert } from "react-native";
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const Register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fullName,
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        Alert.alert("Error", errorMessage);
      });
  };

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
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
          }}
          placeholder="Full Name"
          placeholderTextColor={searchItem}
          selectionColor={searchItem}
          leftIcon={
            <Icon
              name="user-alt"
              type="font-awesome-5"
              size={25}
              color={searchItem}
            />
          }
          leftIconContainerStyle={{ marginRight: 10 }}
          inputStyle={{ color: white }}
        />
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
          onPress={() => {
            if (fullName != "") {
              Register();
            }
          }}
        >
          <Text style={{ color: white }}>Register</Text>
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: white, marginRight: 10 }}>
            Already have an account?
          </Text>
          <TouchableOpacity
            //@ts-ignore
            onPress={() => navigation.navigate("LoginScreen")}
            activeOpacity={0.8}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ color: "orange" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
