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

  const [data, setData] = React.useState(khel);
  const [searchData, setSearchData] = React.useState(khel);
  const [alphabetEnabled, setAlphabetEnabled] = React.useState(true);
  const [categoryEnabled, setCategoryEnabled] = React.useState(false);
  const [pursuit, setPursuit] = React.useState(false);
  const [individual, setIndividual] = React.useState(false);
  const [mandal, setMandal] = React.useState(false);
  const [team, setTeam] = React.useState(false);
  const [sit, setSit] = React.useState(false);
  const [dandh, setDandh] = React.useState(false);


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

  function updateSearch() {
    const criteria = evaluateCriteria();
    const list = data.filter(item => criteria.includes(item.category));
    setSearchData(list);
  }

  function search(string) {
    if (string == "") {
      updateSearch();
    } else {
      updateSearch();
      const array = searchData.filter(item => item.name == string);
      setSearchData(array);
    }
  }

  return (
    <Layout level='3'>
      <Input
        label="Search"
        value={state.search}
        placeholder="Enter name here"
        onChangeText={(str) => search(str)}
      />
      <ButtonGroup>
        <Button onPress={() => sortByProps("name")}>A to Z</Button>
        <Button onPress={() => sortByProps("category")}>By Category</Button>
      </ButtonGroup>
    <ScrollView>
      <View>
        <Text>Pursuit:</Text><Toggle checked={pursuit} onChange={() => {setPursuit(!pursuit); updateSearch()}}/>
        <Text>Individual:</Text><Toggle checked={individual} onChange={() => {setIndividual(!individual); updateSearch()}}/>
        <Text>Mandal:</Text><Toggle checked={mandal} onChange={() => {setMandal(!mandal); updateSearch()}}/>
        <Text>Team:</Text><Toggle checked={team} onChange={() => {setTeam(!team); updateSearch()}}/>
        <Text>Sitting Down:</Text><Toggle checked={sit} onChange={() => {setSit(!sit); updateSearch()}}/>
        <Text>Dandh:</Text><Toggle checked={dandh} onChange={() => {setDandh(!dandh); updateSearch()}}/>
      </View>
      {searchData.map((item) => (
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
      ))}
    </ScrollView>
    <View></View>
    <Text>End of view</Text>
  </Layout>
  );
}
