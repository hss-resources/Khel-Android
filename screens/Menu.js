import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Button, Card, Layout, Text, ButtonGroup, Toggle } from "@ui-kitten/components";

export default function Display({ route, navigation }) {
  const object = route.params;
  return (
    <Layout>
      <Text>{JSON.stringify(object)}</Text>
    </Layout>
  );
}
