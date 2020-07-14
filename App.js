import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApplicationProvider } from "@ui-kitten/components";

import Home from "./screens/Home";
import Menu from "./screens/Menu";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApplicationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Menu" component={Menu}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
