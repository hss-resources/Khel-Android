import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import KhelInfo from "../screens/classes/KhelInfo";
import ListInfo from "../screens/classes/ListInfo";
import New from "../screens/classes/New";
import Home from "../screens/classes/Home";

const Stack = createStackNavigator();

export default function ListStackNavigator() {
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="New" component={New} />
      <Stack.Screen name="ListInfo" component={ListInfo} />
      <Stack.Screen name="KhelInfo" component={KhelInfo} />
    </Stack.Navigator>
  )
}
