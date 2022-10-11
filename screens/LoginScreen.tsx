import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { barBorder, mainColor, searchItem, white } from "../constants/color";
import { Icon, Input } from "@rneui/base";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState(false);
  const errorStyle = {
    borderColor: "red",
    borderWidth: 1,
  };

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const SendPasswordMail = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setPasswordMessage(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (email === "") {
          setEmailError(true);
        }
      });
  };

  return (
    <SafeAreaView
      onTouchStart={() => {
        setEmailError(false);
        setPasswordError(false);
        setPasswordMessage(false);
      }}
      style={{
        flex: 1,
        backgroundColor: mainColor,
      }}
    >
      <View
        style={{
          display: passwordMessage ? "flex" : "none",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#5fb2b6" }}>
          Password Reset Email Has Been Sent!!
        </Text>
        <Text style={{ color: "#5fb2b6" }}>Please Check Your Email</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
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
          secureTextEntry={showPassword}
          inputContainerStyle={passwordError ? errorStyle : {}}
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
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                // @ts-ignore

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
                if (!email.split("").includes("@")) {
                  setEmailError(true);
                }
                if (errorMessage === "Firebase: Error (auth/invalid-email).") {
                  setEmailError(true);
                  setPasswordError(true);
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
          <TouchableOpacity
            onPress={() => SendPasswordMail(email)}
            activeOpacity={0.8}
          >
            <Text style={{ color: white }}>Forgot Password?</Text>
          </TouchableOpacity>
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
