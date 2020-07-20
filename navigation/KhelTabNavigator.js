import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListNavigator from "./KhelStackNavigator";
import Home from "../screens/Home";
import About from "../screens/About";

const Tab = createBottomTabNavigator();

export default function KhelTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="List" component={ListNavigator}/>
      <Tab.Screen name="About" component={About}/>
    </Tab.Navigator>
  );
}
