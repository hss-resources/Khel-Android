import React from "react";
import { Button, Layout, Card, Text, Toggle, ButtonGroup, Divider, Input } from "@ui-kitten/components";
import { FlatList, View, AsyncStorage, ScrollView } from "react-native";
import khel from "../assets/khel.json";


export default function New({ navigation }) {

  const [khel_number, setNumber] = React.useState(0);
  const [pursuit, setPursuit] = React.useState(false);
  const [individual, setIndividual] = React.useState(false);
  const [mandal, setMandal] = React.useState(false);
  const [team, setTeam] = React.useState(false);
  const [sit, setSit] = React.useState(false);
  const [dand, setDand] = React.useState(false);
  // const [list, setList] = React.useState([]);
  const [name, setName] = React.useState("");

  function evaluateCriteria() {
    const categories = ["Pursuit", "Individual", "Mandal", "Team", "Sitting Down", "Dand"];
    const temp = [];
    if (!pursuit) {
      temp.push("Pursuit");
    }
    if (!individual) {
      temp.push("Individual")
    }
    if (!mandal) {
      temp.push("Mandal")
    }
    if (!team) {
      temp.push("Team");
    }
    if (!sit) {
      temp.push("Sitting Down");
    }
    if (!dand) {
      temp.push("Dand")
    }

    var values = categories.filter(x => !temp.includes(x));
    return values;
  }

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  async function generateList(limit) {
    var criteria = evaluateCriteria();
    let map = await AsyncStorage.getItem("store");
    if (map == null) {
      map = [];
    }
    let array = khel.filter(item => criteria.includes(item.category));
    array = shuffle(array);
    if (limit !== 0) {
      array = array.slice(0, limit);
    }
    const store = await AsyncStorage.getItem("store");
    const list = {
      name: name,
      khel: array,
      categories: criteria
    };
    map.push(list);
    console.log(map);
    await AsyncStorage.setItem("store", JSON.stringify(map));
    navigation.goBack();
  }

  return (
    <ScrollView>
      <Card>
        <Input placeholder="Enter List Name" value={name} onChangeText={(item) => setName(item)} />
        <View>
          <Text>{khel_number}</Text>
          <ButtonGroup>
            <Button onPress={() => setNumber(khel_number+1)}>
            +
            </Button>
            <Button onPress={() => setNumber(khel_number-1)}>
            -
            </Button>
          </ButtonGroup>
        </View>
        <View>
          <Divider /><Text category="label">Categories:</Text><Divider/>
        </View>
        <View>
          <Text category="s1">Pursuit</Text><Toggle checked={pursuit} onChange={() => setPursuit(!pursuit)}/>
          <Text>Individual</Text><Toggle checked={individual} onChange={() => setIndividual(!individual)}/>
          <Text>Mandal</Text><Toggle checked={mandal} onChange={() => setMandal(!mandal)}/>
          <Text>Team</Text><Toggle checked={team} onChange={() => setTeam(!team)}/>
          <Text>Sitting down</Text><Toggle checked={sit} onChange={() => setSit(!sit)}/>
          <Text>Dandh</Text><Toggle checked={dand} onChange={() => setDand(!dand)}/>
        </View>
      </Card>
      <Button onPress={() => generateList(khel_number)}>Generate List</Button>
    </ScrollView>
  );
}
