import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeNavigator from "./KhelStackNavigator";
import ListNavigator from "./ListStackNavigator";
import About from "../screens/classes/About";

const Tab = createBottomTabNavigator();

export default function KhelTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'List') {
            iconName = focused ? 'cards' : 'cards-outline'
          } else if (route.name === 'About'){
            iconName = focused ? 'cogs' : 'cogs'
          }
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />
        }
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator}/>
      <Tab.Screen name="List" component={ListNavigator}/>
      <Tab.Screen name="About" component={About}/>
    </Tab.Navigator>
  );
}
