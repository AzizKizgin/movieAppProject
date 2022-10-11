import { View, Text, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { barActive, barBorder, mainColor, white } from "../constants/color";
import { Input } from "@rneui/base";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [email, setEmail] = React.useState(user?.email);
  const [displayName, setDisplayName] = React.useState(user?.displayName);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ backgroundColor: mainColor, flex: 1, paddingHorizontal: 10 }}
    >
      <View
        style={{
          marginTop: 20,
          paddingTop: 5,
        }}
      >
        <Input
          label="Username"
          labelStyle={{ color: barActive }}
          inputStyle={{ color: white }}
          value={displayName}
          onChangeText={(text) => {
            setDisplayName(text);
          }}
        />
      </View>
      <View
        style={{
          marginTop: 40,
          paddingTop: 5,
        }}
      >
        <Input
          label="Password"
          labelStyle={{ color: barActive }}
          inputStyle={{ color: white }}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Input
          label="Confirm Password"
          labelStyle={{ color: barActive }}
          inputStyle={{ color: white }}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />
      </View>
      <Button
        color={barBorder}
        mode="contained"
        style={{ borderRadius: 20 }}
        compact
        onPress={() => {
          if (displayName !== "") {
            if (password === "") {
              updateProfile(user, {
                displayName: displayName,
              })
                .then(() => {
                  navigation.navigate("Main", {
                    screen: "AccountScreen",
                  });
                  return;
                })
                .catch((error) => {
                  // An error occurred
                  Alert.alert(error.message);
                  // ...
                });
            } else if (password === confirmPassword && password.length >= 6) {
              updateProfile(user, {
                displayName: displayName,
              });
              signInWithEmailAndPassword(auth, email, password);
              updatePassword(auth.currentUser, password)
                .then(() => {
                  navigation.navigate("Main", {
                    screen: "SettingsScreen",
                  });
                  return;
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              Alert.alert("Password", "Verify your passwords");
            }
          }
        }}
      >
        <Text style={{ color: white }}>Save</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SettingsScreen;
