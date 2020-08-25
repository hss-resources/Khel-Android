import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import KhelTabNavigator from "./KhelTabNavigator";
import List from "../screens/classes/List";



export default function AppTabNavigator() {
  return (
    <AppTab.Navigator>
      <KhelTabNavigator />
    </AppTab.Navigator>
  )

}
