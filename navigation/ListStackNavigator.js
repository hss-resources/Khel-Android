import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import List from "../screens/classes/List";
import ListInfo from "../screens/classes/ListInfo";
import New from "../screens/classes/New";

const Stack = createStackNavigator();

export default function ListStackNavigator() {
  return(
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={Home}/>
      <Stack.Screen name="ListInfo" component={KhelInfo} />
      <Stack.Screen name="New" component={New} />
    </Stack.Navigator>
  )
}
