import React from "react";
import { Button, Layout, Card, Text, Switch, ButtonGroup, Divider, Input } from "@ui-kitten/components";
import { FlatList, View, AsyncStorage, ScrollView } from "react-native";
import khel from "../../assets/khel.json";

export default class New extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      khel_number: 0,
      pursuit: false,
      individual: false,
      mandal: false,
      team: false,
      sit: false,
      dand: false,
      name: "",
      data: [],
    }
  }

  async componentDidMount() {
    var map = await AsyncStorage.getItem("store");
    this.setState({data: map});
  }

  async componentWillUnmount() {
    await AsyncStorage.setItem("store", JSON.stringify(this.state.data));
  }

  evaluateCriteria() {
    const temp = [];
    if (this.state.pursuit) {
      temp.push("Pursuit");
    }
    if (this.state.individual) {
      temp.push("Individual")
    }
    if (this.state.mandal) {
      temp.push("Mandal")
    }
    if (this.state.team) {
      temp.push("Team");
    }
    if (this.state.sit) {
      temp.push("Sitting down");
    }
    if (this.state.dand) {
      temp.push("Dand")
    }
    if (this.state.ekhel) {
      temp.push("E-Khel")
    }
    if (temp.length == 0) {
      return ["Pursuit", "Individual", "Mandal", "Team", "Sitting down", "Dand", "E-Khel"];
    }
    return temp;
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  async generateList(limit) {
    var criteria = this.evaluateCriteria();
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
    this.setState({data: map});
    await AsyncStorage.setItem("store", JSON.stringify(map));
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Input placeholder="Enter List Name" value={this.state.name} onChangeText={(item) => this.setState({name: item})} />
          <View>
            <Text>{this.state.khel_number}</Text>
            <ToggleButton.Row onValueChange={value => this.setState({khel_number: value})} value={value}>
              <ToggleButton value={this.state.khel_number+1} icon="add"/>
              <ToggleButton value={this.state.khel_number-1} icon="remove"/>
            </ToggleButton.Row>
          </View>
          <View>
            <Divider /><Text category="label">Categories:</Text><Divider/>
          </View>
          <View>
            <Text category="s1">Pursuit</Text><Switch value={this.state.pursuit} onValueChange={(isChecked) => this.setState({pursuit: isChecked})}/>
            <Text>Individual</Text><Switch value={this.state.individual} onValueChange={(isChecked) => this.setState({individual: isChecked})}/>
            <Text>Mandal</Text><Switch value={this.state.mandal} onValueChange={(isChecked) => this.setState({mandal: isChecked})}/>
            <Text>Team</Text><Switch value={this.state.team} onValueChange={(isChecked) => this.setState({team: isChecked})}/>
            <Text>Sitting down</Text><Switch value={this.state.sit} onValueChange={(isChecked) => this.setState({sit: isChecked})}/>
            <Text>Dandh</Text><Switch value={this.state.dand} onValueChange={(isChecked) => this.setState({dand: isChecked})}/>
          </View>
        </View>
        <Button icon="plus" onPress={() => this.generateList(khel_number)}>Generate List</Button>
      </ScrollView>
    );
  }
}
