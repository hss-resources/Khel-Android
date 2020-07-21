import React from "react";
import { StyleSheet, View, FlatList, ScrollView, Modal } from "react-native";
import { Button, Card, Layout, Text, ButtonGroup, Toggle, Input } from "@ui-kitten/components";

import khel from "../assets/khel.json";

export default function Home({navigation}) {

  const [pursuit, setPursuit] = React.useState(true);
  const [individual, setIndividual] = React.useState(true);
  const [mandal, setMandal] = React.useState(true);
  const [team, setTeam] = React.useState(true);
  const [sit, setSit] = React.useState(true);
  const [dand, setDand] = React.useState(true);
  //
  const [data, setData] = React.useState(khel);
  const [search, setSearch] = React.useState("");
  const [searchData, setSearchData] = React.useState(khel);
  const [alphabetEnabled, setAlphabetEnabled] = React.useState(true);
  const [categoryEnabled, setCategoryEnabled] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  function evaluateCriteria() {
    const temp = [];
    if (pursuit) {
      temp.push("Pursuit");
    }
    if (individual) {
      temp.push("Individual")
    }
    if (mandal) {
      temp.push("Mandal")
    }
    if (team) {
      temp.push("Team");
    }
    if (sit) {
      temp.push("Sitting Down");
    }
    if (dand) {
      temp.push("Dand")
    }
    console.log(temp)
    return temp;
  }

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

  function searchStr() {
    if (search == "") {
      updateSearch();
    } else {
      updateSearch();
      const array = searchData.filter(item => item.name == search);
      console.log(array);
      setSearchData(array);
    }
  }

  async function displayList() {
    var map = await AsyncStorage.getItem("store");
    return map
  }

  async function addToList(item, list) {
    list.khel.push(item);
    var map = await AsyncStorage.getItem("store");
    map.push(list);
    await AsyncStorage.setItem("store", map);
    return;
  }

  return (
    <Layout level='3'>
       <Input
         label="Search"
         value={search}
         placeholder="Enter name here"
         onChangeText={(str) => {setSearch(str); searchStr()}}
        />
       <ButtonGroup>
         <Button onPress={() => sortByProps("name")}>A to Z</Button>
         <Button onPress={() => sortByProps("category")}>By Category</Button>
       </ButtonGroup>

      <View>
        <Toggle checked={!pursuit} onChange={(isChecked) => {setPursuit(!isChecked); updateSearch()}}/>
        <Text>Individual:</Text><Toggle checked={!individual} onChange={(isChecked) => {setIndividual(!isChecked); updateSearch()}}/>
        <Text>Mandal:</Text><Toggle checked={!mandal} onChange={(isChecked) => {setMandal(!isChecked); updateSearch()}}/>
         <Text>Team:</Text><Toggle checked={!team} onChange={(isChecked) => {setTeam(!isChecked); updateSearch()}}/>
        <Text>Sitting Down:</Text><Toggle checked={!sit} onChange={(isChecked) => {setSit(!isChecked); updateSearch()}}/>
        <Text>Dand:</Text><Toggle checked={!dand} onChange={(isChecked) => {setDand(!isChecked); updateSearch()}}/>
      </View>
    {/*  <View>
    *  <Toggle checked={!pursuit} onChange={(isChecked) => {setPursuit(!isChecked); updateSearch()}}/>
    *    <Text>Individual:</Text><Toggle checked={!individual} onChange={(isChecked) => {setIndividual(!isChecked); updateSearch()}}/>
    *    <Text>Mandal:</Text><Toggle checked={!mandal} onChange={(isChecked) => {setMandal(!isChecked); updateSearch()}}/>
    *     <Text>Team:</Text><Toggle checked={!team} onChange={(isChecked) => {setTeam(!isChecked); updateSearch()}}/>
    *    <Text>Sitting Down:</Text><Toggle checked={!sit} onChange={(isChecked) => {setSit(!isChecked); updateSearch()}}/>
    *    <Text>Dand:</Text><Toggle checked={!dand} onChange={(isChecked) => {setDand(!isChecked); updateSearch()}}/>
      </View> */}
     <ScrollView>
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
    <Text>End of view</Text>
    <Modal></Modal>
  </Layout>
  );
}
