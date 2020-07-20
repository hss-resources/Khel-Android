import React from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { Button, Card, Layout, Text, ButtonGroup, Toggle, Input } from "@ui-kitten/components";

import khel from "../assets/khel.json";

export default function Home({navigation}) {
  const [state, setState] = React.useState({
    data: khel,
    search: "",
    searchData: [],
    alphabetEnabled: true,
    categoryEnabled: false,
    pursuit: false,
    individual: false,
    mandal: false,
    team: false,
    sit: false,
    dandh: false,
  });

  function sortByProps(props) {
    const list = data.sort(
      function (a, b) {
        if (a[props] < b[props]) {
          return -1;
        } else if (a[props] > b[props]) {
          return 1;
        } else {
          return 0;
        }
      }
    );
    setData(list);
  }


  return (
    <Layout level='3'>
      <Input
        label="Search"
        value={state.search}
        placeholder="Enter name here"
      />
      <ButtonGroup>
        <Button onPress={() => sortByProps("name")}>A to Z</Button>
        <Button onPress={() => sortByProps("category")}>By Category</Button>
      </ButtonGroup>


      <FlatList
        data={data}
        renderItem={({item}) =>
          <Card header={() =>
              <View>
                <Text>{item.name}</Text>
              </View>
          } footer={() =>
            <View>
              <Button onPress={() => addToList()}>Add to List</Button>
              <Button onPress={() => navigation.navigate("Menu", {
                  item: item
                })}>
              More info
              </Button>
            </View>
          }>
            <Text>{item.name}</Text>
          </Card>
        }
        keyExtractor={(item, index) => item.name}
      />
  </Layout>
  );
}
