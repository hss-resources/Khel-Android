import React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigation/KhelTabNavigator";
import Home from "./screens/classes/About"

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}
