import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import List from "../screens/List";
import New from "../screens/New";

const Stack = createStackNavigator();

export default function KhelStackNavigator() {
  return(
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={List}/>
      <Stack.Screen name="New" component={New} />
    </Stack.Navigator>
  )
}
