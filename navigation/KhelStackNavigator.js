import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/classes/Home";
import KhelInfo from "../screens/classes/KhelInfo";

const Stack = createStackNavigator();

export default function KhelStackNavigator() {
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="KhelInfo" component={KhelInfo} />
    </Stack.Navigator>
  )
}
