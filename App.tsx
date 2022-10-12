import { StatusBar } from "expo-status-bar";
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
import { getFirestore } from "firebase/firestore";
import React, { useEffect } from "react";
import SettingsScreen from "./screens/SettingsScreen";
import WatchListScreen from "./screens/WatchListScreen";
const auth = getAuth();
export const db = getFirestore(app);
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "LoginScreen" : "Main"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
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
            <Stack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="WatchListScreen"
              component={WatchListScreen}
              options={{
                animation: "slide_from_right",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
