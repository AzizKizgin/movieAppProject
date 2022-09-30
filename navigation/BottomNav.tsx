import { View, Text } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  HomeScreen,
  AccountScreen,
  LoginScreen,
  RegisterScreen,
  SearchScreen,
  TopRatedScreen,
} from "../screens";

import {
  barBorder,
  mainColor,
  iconColor,
  barActive,
  iconActive,
} from "../constants/color";
import { Icon } from "@rneui/themed";
const BottomNav = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={barActive}
      barStyle={{
        height: 60,
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        backgroundColor: mainColor,
        borderTopColor: barBorder,
        borderTopWidth: 1,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              iconStyle={{
                alignSelf: "center",
                display: "flex",
                width: 30,
                height: 30,
              }}
              name="home"
              type="material"
              color={focused ? iconActive : iconColor}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              iconStyle={{
                alignSelf: "center",
                display: "flex",
                width: 30,
                height: 30,
              }}
              name="search"
              type="material"
              color={focused ? iconActive : iconColor}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Top Rated"
        component={TopRatedScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              iconStyle={{
                alignSelf: "center",
                display: "flex",
                width: 30,
                height: 30,
              }}
              name="movie-filter"
              type="material"
              color={focused ? iconActive : iconColor}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              iconStyle={{
                alignSelf: "center",
                display: "flex",
                width: 30,
                height: 30,
              }}
              name="account-circle"
              type="material"
              color={focused ? iconActive : iconColor}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
