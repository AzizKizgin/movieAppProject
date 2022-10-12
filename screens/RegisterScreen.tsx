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
import { setDoc, doc } from "firebase/firestore";
import { db } from "../App";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const errorStyle = {
    borderColor: "red",
    borderWidth: 1,
  };
  const [nameError, setNameError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const Register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        await setDoc(doc(db, getAuth().currentUser?.uid, "WatchList"), {});
        await setDoc(doc(db, getAuth().currentUser?.uid, "FavList"), {});

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
      onTouchStart={() => {
        setNameError(false);
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
          value={fullName}
          errorMessage={nameError ? "Full Name cannot be empty" : null}
          errorStyle={{ marginTop: 0 }}
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
          inputContainerStyle={nameError ? errorStyle : {}}
        />
        <Input
          keyboardType="email-address"
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
          secureTextEntry={showPassword}
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
          rightIcon={
            <Icon
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              name={showPassword ? "eye" : "eye-with-line"}
              type="entypo"
              size={20}
              color={searchItem}
            />
          }
        />
        <Button
          color={barBorder}
          mode="contained"
          style={{ borderRadius: 20 }}
          compact
          onPress={() => {
            if (fullName != "") {
              Register();
              // @ts-ignore
              navigation.navigate("LoginScreen");
            } else {
              setNameError(true);
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
