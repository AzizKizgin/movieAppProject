import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BottomNav from "./navigation/BottomNav";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import CompanyDetailScreen from "./screens/CompanyDetailScreen";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTb_g74Atyhh3s2jyrR5gYujY1JVqabIY",
  authDomain: "movieapp-71fb0.firebaseapp.com",
  projectId: "movieapp-71fb0",
  storageBucket: "movieapp-71fb0.appspot.com",
  messagingSenderId: "60679663668",
  appId: "1:60679663668:web:8083e031ceeb430a985a61",
  measurementId: "G-NJYS8B0LS7",
};

const Stack = createNativeStackNavigator();
export const app = initializeApp(firebaseConfig);

import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";

export default function App() {
  const auth = getAuth();

  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <Stack.Navigator
        initialRouteName={auth.currentUser === null ? "LoginScreen" : "Main"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen name="Main" component={BottomNav} />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="CompanyDetail"
          component={CompanyDetailScreen}
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
