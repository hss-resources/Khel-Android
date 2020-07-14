import React from "react";
import { Button, Layout, Card, Text, Toggle  } from "@ui-kitten/components";
import { FlatList } from "react-native";
import khel from "../assets/khel.json";

export default function New({ navigation }) {
  const [state, setState] = React.useState({
    khel_number: 0,
    pursuit: false,
    individual: false,
    mandal: false,
    team: false,
    sit: false,
    dand: false,
    list: [],
  });
  return (
    <Layout>
      <Text></Text>
      <Card>
        <View>
          <Text>{state.khel_number}</Text>
          <ButtonGroup>
            <Button onPress={() => setState({khel_number: state.khel_number+1})}>
            +
            </Button>
            <Button onPress={() => setState({khel_number: state.khel_number-1})}>
            +
            </Button>
          </ButtonGroup>
        </View>
        <View>
          <Divider /><Text category="label">Categories:</Text><Divider/>
        </View>
        <View>
          <Text category="s1">Pursuit</Text><Toggle/>
          <Text>Individual</Text><Toggle/>
          <Text>Mandal</Text><Toggle/>
          <Text>Team</Text><Toggle/>
          <Text>Sitting down</Text><Toggle/>
          <Text>Dandh</Text><Toggle/>
        </View>
      </Card>
      <Button>Generate List</Button>
    </Layout>
  );
}

function generateList(list) {
  const criteria = evaluateCriteria();
  const array = khel.filter(({item}) => criteria.contains(item.category));
  {/* Store in AsyncStorage */}
  return;
}

function generateList() {
  const categories = ["Pursuit", "Individual", "Mandal", "Team", "Sitting Down", "Dand"];
  const temp = [];
  if (!state.pursuit) {
    temp.push("Pursuit");
  }
  if (!state.individual) {
    temp.push("Individual")
  }
  if (!state.mandal) {
    temp.push("Mandal")
  }
  if (!state.team) {
    temp.push("Team");
  }
  if (!state.sit) {
    temp.push("Sitting Down");
  }
  if (!state.dand) {
    temp.push("Dand")
  }

  categories = categories.filter(x => !temp.contains(x));
  console.log(categories);
  return categories;
}
