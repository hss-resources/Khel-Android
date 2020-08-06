import React from "react";
import { StyleSheet, View, FlatList, ScrollView, AsyncStorage } from "react-native";
import { Button, Card, ToggleButton, Switch, TextInput, Text, Dialog, Portal, Checkbox, ActivityIndicator, Colors, Surface, Title, Subheading } from "react-native-paper";
import styles from "../../assets/styles/styles";

import khel from "../../assets/khel.json";

export default class Home extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      pursuit: false,
      team: false,
      individual: false,
      mandal: false,
      sit: false,
      ekhel: false,
      dand: false,
      search: "",
      searchData: khel,
      data: [],
      list: [],
      editedList: [],
      item: null,
      checkboxes: [],
      visible: false,
      isLoading: true,
      refreshing: false,
    }
  }

  async componentDidMount() {
    await AsyncStorage.removeItem("store");
    this.getKhelLists();
    this.getDataOnFocus = this.props.navigation.addListener('focus', () => {
      this.getKhelLists();
    });
  }

  async componentWillUnmount() {
    this.getDataOnFocus();
  }

  async getKhelLists() {
    try {
      var maps = await AsyncStorage.getItem("store");
      if (maps == null) {
        maps = false;
      } else {
        var array = [];
        maps = JSON.parse(maps);
        if (maps.length || !maps.includes(null)) {
          maps.forEach(item => array.push(false));
        } else {
          maps = false;
        }
      }
    } catch (err) {
      maps = false;
    }
    this.setState({
      isLoading: false,
      checkboxes: array,
      list: maps,
      editedList: maps,
      data: khel
    }, () => console.log("state updated \n",this.state.editedList));
  }

  evaluateCriteria() {
    const categories = ["Pursuit", "Individual", "Mandal", "Team", "Sitting down", "Dand", "E-Khel"];
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
      return categories;
    }
    return temp;
  }

  sortByProps(props) {
    const list = this.state.data.sort(
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
    this.setState({data: list});
  }

  updateSearch() {
    const criteria = this.evaluateCriteria();
    const list = this.state.data.filter(
      item => criteria.includes(item.category));
      this.setState({
        searchData: list
      });
    }

  openDialog(item) {
      this.setState({
        item: item,
        visible: true,
      });
    }

  hideDialog() {
      let array = new Array(this.state.checkboxes.length).fill(false);
      this.setState({
        checkboxes: array,
        visible: false
      });
    }

  searchStr() {
      if (this.state.search == "") {
        this.updateSearch();
      } else {
        this.updateSearch();
        const array = this.state.searchData.filter(
          (item) => item.name.includes(this.state.search)
        );

        this.state.searchData.forEach(item => console.log(item.name));
        this.setState({
          searchData: array
        });
      }
    }

  async addToList() {
      var indexes = [];

      for (var i = 0; i < this.state.checkboxes.length; i++) {
        if (this.state.checkboxes[i] == true) {
          indexes.push(i);
        }
      }
      console.log("indexes", indexes)

      if (indexes.includes(-1)) {
        return;
      }

      var map = this.state.editedList.map(
        (item) => {
          if (indexes.includes(this.state.editedList.indexOf(item))) {
            item.khel.push(this.state.item);
            if (!item.categories.includes(this.state.item.category)) {
              item.categories.push(this.state.item.category);
            }
          }
          return item;
        }
      );
      console.log("map", map);

      await AsyncStorage.setItem("store", JSON.stringify(map));
      this.setState({editedList: map, visible: false}, () => {
        console.log("new editedList", this.state.editedList)
        alert("Added!");
      });
  }

  adjustStyles(i) {
    var obj = {
      borderRadius: 10,
      padding: 2,
      borderColor:"black",
      alignItems: "center",
      marginRight: 3,
      elevation: 1

    }
    switch (i) {
      case "Pursuit":
      obj.backgroundColor = "red";
      obj.color = "white";
      break;
      case "Individual":
      obj.backgroundColor = "yellow";
      obj.color = "black";
      break;
      case "Mandal":
      obj.backgroundColor = "dodgerblue";
      obj.color= "black";
      break;
      case "Team":
      obj.backgroundColor = "lime";
      obj.color = "black";
      break;
      case "Sitting down":
      obj.backgroundColor = "darkorange";
      break;
      case "Dand":
      obj.backgroundColor = "blueviolet";
      obj.color="white";
      break;
      case "E-Khel":
        obj.backgroundColor = "deeppink";
        obj.color="white";
        break;
    }
    return obj;
  }

  adjustText(i) {
    var obj = {
      fontSize: 10,
      padding: 5

    }
    switch (i) {
      case "Pursuit":
      obj.color = "white";
      break;
      case "Individual":
      obj.color = "black";
      break;
      case "Mandal":
      obj.color= "black";
      break;
      case "Team":
      obj.color = "black";
      break;
      case "Sitting down":
      obj.color = "black";
      break;
      case "Dand":
      obj.color="white";
      break;
      case "E-Khel":
        obj.color="white";
        break;
    }
    return obj;
  }

  async refreshControl() {
    this.setState({refreshing: true});
    var maps = JSON.parse(await AsyncStorage.getItem("store"));
    var array = [];
    if (maps.length || !maps.includes(null)) {
      maps.forEach(item => array.push(false));
    } else {
      maps = false;
    }
    this.setState({
      isLoading: false,
      checkboxes: array,
      list: maps,
      editedList: maps,
      data: khel,
      refreshing: false
    }, () => console.log("refreshed editedList", this.state.editedList));
  }

  toggleView() {
      return (
      <View>
        <View style={styles.spacer}></View>
        <Surface style={[styles.surfaceContainer, { padding: 20 }]}>
          <Text>Filter your options here:</Text>
          <TextInput
            mode="outlined"
            label="Search for khel"
            placeholder="Enter search here"
            value={this.state.search}
            onChangeText={text => this.setState({search: text}, () => this.searchStr())}
          />
        <View style={styles.spacer}></View>
          <View style={styles.rowContainer}>
            <Subheading style={styles.switchText}>Pursuit</Subheading>
            <Switch
              value={this.state.pursuit}
              onValueChange={(isChecked) =>
                this.setState({pursuit: isChecked}, () => this.updateSearch())
            }/>
          </View>
          <View style={styles.rowContainer}>
            <Subheading style={styles.switchText}>Individual</Subheading>
            <Switch
              value={this.state.individual}
              onValueChange={(isChecked) =>
                this.setState({individual: isChecked}, () => this.updateSearch())
            }/>
          </View>
          <View style={styles.rowContainer}>
            <Subheading style={styles.switchText}>Mandal</Subheading>
            <Switch
              value={this.state.mandal}
              onValueChange={(isChecked) =>
                this.setState({mandal: isChecked}, () => this.updateSearch())
            }/>
          </View>
          <View style={styles.rowContainer}>
            <Subheading style={styles.switchText}>Team</Subheading>
            <Switch
              value={this.state.team}
              onValueChange={(isChecked) =>
                this.setState({team: isChecked}, () => this.updateSearch())
            }/>
          </View>
          <View style={styles.rowContainer}>
            <Subheading style={styles.switchText}>Sitting down</Subheading>
            <Switch
              value={this.state.sit}
              onValueChange={(isChecked) =>
                this.setState({sit: isChecked}, () => this.updateSearch())
            }/>
          </View>
          <View style={styles.rowContainer}>
            <Subheading style={styles.switchText}>Dandh</Subheading>
            <Switch
              value={this.state.dand}
              onValueChange={(isChecked) =>
                this.setState({dand: isChecked}, () => this.updateSearch())
            }/>
          </View>
          <View style={styles.rowContainer}>
            <Subheading style={styles.switchText}>E-Khel</Subheading>
            <Switch
              value={this.state.ekhel}
              onValueChange={(isChecked) =>
                this.setState({ekhel: isChecked}, () => this.updateSearch())
            }/>
          </View>
        </Surface>
        <View style={styles.spacer}></View>
      </View>
      );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} color={Colors.red800}/>
          <Text>Please wait while your selection loads</Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={this.state.searchData}
            ListHeaderComponent={() => this.toggleView()}
            onRefresh={() => this.refreshControl()}
            refreshing={this.state.refreshing}
            renderItem = {({item, index}) => (
            <View key={index} style={styles.cardContainer}>
              <Card>
                <Card.Title title={item.name} />
                <Card.Content>
                  <View style={{flexDirection: "row", flex: 1}}>
                    <Surface style={this.adjustStyles(item.category)} key={index}><Text style={this.adjustText(item.category)}>{item.category}</Text></Surface>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text>Aim: {item.aim}</Text>
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button mode="contained" icon="plus" onPress={() => this.openDialog(item)}>
                    Add to List
                  </Button>
                  <Button icon="information-outline" onPress={() => this.props.navigation.navigate("KhelInfo",
                    {
                      item: item
                    }
                  )}>
                    More Info
                  </Button>
                  </Card.Actions>
                </Card>
              <Portal>
                <Dialog visible={this.state.visible} onDismiss={() => this.hideDialog()}>
                <Dialog.Title>Please choose the list:</Dialog.Title>
                <Dialog.Content>
                {this.state.list.length && (
                <View>
                  {this.state.checkboxes.map((item, index) => (
                    <View>
                      <Text>{this.state.editedList[index].name}</Text>
                      <Checkbox.Android
                        status={this.state.checkboxes[index] ? "checked": "unchecked"}
                        onPress={() => {
                          let array = this.state.checkboxes;
                          array[index] = !item;
                          this.setState({checkboxes: array}, () => console.log("update", this.state.checkboxes));
                        }
                      }/>
                    </View>
                  ))}
                  </View>
                )}
                {!this.state.list && (
                  <View>
                    <Text>There exists no lists to add to!</Text>
                  </View>
                )}
                </Dialog.Content>
                <Dialog.Actions>
                  <Button mode="contained" icon="plus" onPress={() => this.addToList()}>
                    Add to List
                  </Button>
                  <Button icon="information-outline" onPress={() => this.hideDialog()}>
                    Close
                  </Button>
                </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
            )}
            keyExtractor={(item, index) => item.name}
          />
        </View>
      );
    }
  }

}
