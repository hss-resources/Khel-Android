import React from "react";
import { Button, Layout, Card, Text, Switch, ButtonGroup, Divider, Input, Surface, TextInput, ToggleButton, Title, Subheading, Paragraph, Caption, HelperText} from "react-native-paper";
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
      data: null,
    }
  }

  async componentDidMount() {
    // var map = await AsyncStorage.getItem("store");
    // if (map == null) {
    //   map = [];
    // } else {
    //   list = JSON.parse(map);
    //   if (list.length > 1 && !list.includes(null)) {
    //     map = list;
    //   } else if (list.length == 1 && list[0] != null){
    //     map = list;
    //   } else {
    //     map = null;
    //   }
    // }
    // console.log("store", map);
    // this.setState({data: map});
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
    // console.log("map", this.state.data);
    // if (this.state.data == null) {
    //   var map = [];
    //   console.log(map);
    // } else {
    //   var map = this.state.data;
    // }
    let array = khel.filter(item => criteria.includes(item.category));
    array = this.shuffle(array);
    if (limit != 0) {
      array = array.slice(0, limit);
    }
    const categories = array.filter((item, index) => array.indexOf(item) == index);
    console.log("array", criteria);
    const list = {
      name: this.state.name,
      khel: array,
      categories: categories
    };
    // map.push(list);
    this.props.navigation.navigate("ListInfo", {
      item: list
    });
  }

  checkErrors() {
    return this.state.name == "";
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 10}}>
        <Surface style={styles.surfaceContainer}>
          <TextInput mode="outlined" label="Enter Your List Name Here" value={this.state.name} onChangeText={(item) => this.setState({name: item})} error={this.checkErrors()}/>
          <HelperText type="error" visible={this.checkErrors()}>All lists require a name!</HelperText>
          <View style={styles.titleContainer}>
            <Divider /><Title>Number of Khel</Title><Divider />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.switchText}>{this.state.khel_number}</Text>
            <View style={styles.newButtonContainer}>
              <Button compact icon="minus" mode="contained" disabled={this.state.khel_number <= 1} onPress={() => this.setState({khel_number: this.state.khel_number - 1})}></Button>
              <Button compact icon="plus" mode="contained" disabled={this.state.khel_number >= 18} onPress={() => this.setState({khel_number: this.state.khel_number + 1})}></Button>
            </View>
          </View>
          <Divider />
          <View>
            <View style={styles.titleContainer}>
              <Title>Type of Khel</Title>
            </View>
            <View style={styles.rowContainer}>
              <Subheading style={styles.switchText}>Pursuit</Subheading>
              <Switch
                value={this.state.pursuit}
                onValueChange={(isChecked) => this.setState({pursuit: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Subheading style={styles.switchText}>Individual</Subheading>
              <Switch
                value={this.state.individual}
                onValueChange={(isChecked) => this.setState({individual: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Subheading style={styles.switchText}>Mandal</Subheading>
              <Switch
                value={this.state.mandal}
                onValueChange={(isChecked) => this.setState({mandal: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Subheading style={styles.switchText}>Team</Subheading>
              <Switch
                value={this.state.team}
                onValueChange={(isChecked) => this.setState({team: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Subheading style={styles.switchText}>Dandh</Subheading>
              <Switch
                value={this.state.dand}
                onValueChange={(isChecked) => this.setState({dand: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Subheading style={styles.switchText}>Sitting down</Subheading>
              <Switch
                value={this.state.sit}
                onValueChange={(isChecked) => this.setState({sit: isChecked})}/>
            </View>
            <View style={styles.rowContainer}>
              <Subheading style={styles.switchText}>E-Khel</Subheading>
              <Switch
                value={this.state.ekhel}
                onValueChange={(isChecked) => this.setState({ekhel: isChecked})
              }/>
            </View>
          </View>
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <Button icon="plus-outline" mode="contained" onPress={() => this.generateList(this.state.khel_number)}>Generate List</Button>
        </Surface>
      </ScrollView>
    );
  }
}
