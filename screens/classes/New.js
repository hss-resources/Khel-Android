import React from "react";
import { Button, Layout, Card, Text, Switch, ButtonGroup, Divider, Input, Surface, TextInput, ToggleButton, Title, Subheading, Paragraph, Caption} from "react-native-paper";
import { FlatList, View, AsyncStorage, ScrollView } from "react-native";
import khel from "../../assets/khel.json";
import styles from "../../assets/styles/styles"

export default class New extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      khel_number: 1,
      pursuit: false,
      individual: false,
      mandal: false,
      team: false,
      sit: false,
      dand: false,
      ekhel: false,
      name: "",
      data: [],
    }
  }

  async componentDidMount() {
    var map = JSON.parse(await AsyncStorage.getItem("store"));
    console.log("store", map);
    this.setState({data: map});
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
    console.log("map", this.state.data);
    if (!this.state.data) {
      var map = [];
      console.log(map);
    } else {
      var map = this.state.data;
    }
    let array = khel.filter(item => criteria.includes(item.category));
    array = this.shuffle(array);
    if (limit !== 0) {
      array = array.slice(0, limit);
    }
    console.log("array", array);
    const list = {
      name: this.state.name,
      khel: array,
      categories: criteria
    };
    map.push(list);
    console.log("new map", map);
    await AsyncStorage.setItem("store", JSON.stringify(map));
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 10}}>
        <Surface style={styles.surfaceContainer}>
          <TextInput mode="outlined" label="Enter Your List Name Here" value={this.state.name} onChangeText={(item) => this.setState({name: item})} />
          <View style={styles.titleContainer}>
            <Divider /><Text>Number of Khel</Text><Divider />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.switchText}>{this.state.khel_number}</Text>
            <View style={styles.rowButtonContainer}>
              <Button icon="minus" mode="contained" onPress={() => this.setState({khel_number: this.state.khel_number - 1})}></Button>
              <Button icon="plus" mode="contained" onPress={() => this.setState({khel_number: this.state.khel_number + 1})}></Button>
            </View>
          </View>
          <Divider />
          <View>
            <View style={styles.titleContainer}>
              <Title>Type of Khel</Title>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.switchText}>Pursuit</Text>
              <Switch
                value={this.state.pursuit}
                onValueChange={(isChecked) => this.setState({pursuit: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.switchText}>Individual</Text>
              <Switch
                value={this.state.individual}
                onValueChange={(isChecked) => this.setState({individual: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.switchText}>Mandal</Text>
              <Switch
                value={this.state.mandal}
                onValueChange={(isChecked) => this.setState({mandal: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.switchText}>Team</Text>
              <Switch
                value={this.state.team}
                onValueChange={(isChecked) => this.setState({team: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.switchText}>Dandh</Text>
              <Switch
                value={this.state.dand}
                onValueChange={(isChecked) => this.setState({dand: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.switchText}>Sitting down</Text>
              <Switch
                value={this.state.sit}
                onValueChange={(isChecked) => this.setState({sit: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Title style={styles.switchText}>E-Khel</Title>
              <Switch
                value={this.state.ekhel}
                onValueChange={(isChecked) => this.setState({ekhel: isChecked})
              }/>
            </View>
          </View>
        </Surface>
        <View style={styles.spacer}></View>
        <Surface style={styles.surfaceContainer}>
        <Button icon="plus-outline" mode="contained" onPress={() => this.generateList(this.state.khel_number)}>Generate List</Button>
        </Surface>
      </ScrollView>
    );
  }
}
