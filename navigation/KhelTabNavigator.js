import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "./KhelStackNavigator";
import ListNavigator from "./ListStackNavigator";
import About from "../screens/classes/About";

const Tab = createBottomTabNavigator();

export default function KhelTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator}/>
      <Tab.Screen name="List" component={ListNavigator}/>
      <Tab.Screen name="About" component={About}/>
    </Tab.Navigator>
  );
}
