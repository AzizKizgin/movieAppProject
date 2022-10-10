import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated from "react-native-reanimated";

const LoginScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const errorStyle = {
    borderColor: "red",
    borderWidth: 1,
  };

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  return (
    <SafeAreaView
      onTouchStart={() => {
        setEmailError(false);
        setPasswordError(false);
      }}
      style={{
        flex: 1,
        backgroundColor: mainColor,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Input
          keyboardType="email-address"
          errorMessage={emailError ? "Invalid or wrong email adress" : null}
          errorStyle={{ marginTop: 0 }}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          onTouchStart={() => {
            setEmailError(false);
          }}
          placeholder="E-Mail"
          placeholderTextColor={searchItem}
          selectionColor={searchItem}
          leftIcon={
            <Icon name="email" type="material" size={25} color={searchItem} />
          }
          leftIconContainerStyle={{ marginRight: 10 }}
          inputStyle={{ color: white }}
          inputContainerStyle={emailError ? errorStyle : {}}
        />
        <Input
          value={password}
          errorMessage={passwordError ? "Invalid or wrong password" : null}
          errorStyle={{ marginTop: 0 }}
          onTouchStart={() => {
            setPasswordError(false);
          }}
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
          secureTextEntry={true}
          inputContainerStyle={passwordError ? errorStyle : {}}
        />
        <Button
          color={barBorder}
          mode="contained"
          style={{ borderRadius: 20 }}
          compact
          onPress={() => {
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                // @ts-ignore
                AsyncStorage.setItem("isLogin", true);
                navigation.navigate("Main");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (password.length < 6) {
                  setPasswordError(true);
                }
                if (email.length < 6) {
                  setEmailError(true);
                }
              });
          }}
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
            onPress={() => navigation.navigate("RegisterScreen")}
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
