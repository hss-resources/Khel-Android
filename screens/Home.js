import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Button, Card, Layout, Text, ButtonGroup, Toggle, Input } from "@ui-kitten/components";

import khel from "../assets/khel.json";

export default function Home({navigation}) {
  const [state, setState] = React.useState({
    data: json,
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
  return (
    <Layout level="4">
      <Input
        label="Search"
        value={state.search}
        placeholder="Enter name here"
      />
      <ButtonGroup>
        <Button>A to Z</Button>
        <Button>By Category</Button>
      </ButtonGroup>
      <View>
        <Text>Categories:</Text>
        <Text>Pursuit:</Text><Toggle checked={state.pursuit} onChange={() => setState({pursuit: !state.pursuit})} />
        <Text>Individual:</Text><Toggle checked={state.individual} onChange={() => setState({individual: !state.individual})} />
        <Text>Mandal:</Text><Toggle checked={state.mandal} onChange={() => setState({mandal: !state.mandal})} />
        <Text>Team:</Text><Toggle checked={state.team} onChange={() => setState({team: !state.team})} />
        <Text>Sitting Down:</Text><Toggle checked={state.sit} onChange={() => setState({sit: !state.sit})} />
        <Text>Dandh:</Text><Toggle checked={state.dandh} onChange={() => setState({dandh: !state.dandh})} />
      </View>

      <FlatList
        data={khel}
        renderItem={({item, index}) => {
          <Card style={styles.cardContainer} header={() => {
            <View>
              <Text category="h6">{item.name}</Text>
              <Text>{item.category}</Text>
            </View>
          }} footer={() => {
            <View>
              <Button>Add to List</Button>
              <Button onPress={navigation.navigate("Menu", {
                  item: item
              })}>More info</Button>
            </View>
          }}>
            {item.description}
          </Card>
        }}
        keyExtractor={({item, index}) => item.name}
      />
    </Layout>
  );
}
