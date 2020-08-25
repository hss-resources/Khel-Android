import React from "react";
import { StyleSheet, View, FlatList, ScrollView, AsyncStorage } from "react-native";
import { Button, Card, ToggleButton, Switch, TextInput, Text, Dialog, Portal, Modal, Checkbox, ActivityIndicator, Colors, Surface, Title, Subheading, List, Caption, Divider } from "react-native-paper";
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
      data: khel,
      list: [],
      editedList: [],
      khelToAdd: [],
      visible: false,
      isLoading: false,
      refreshing: false,
      listExists: false
    }
  }

  async componentDidMount() {
    this.getDataOnFocus = this.props.navigation.addListener('focus', () => {
      this.getKhelList();
    });
  }

  async componentWillUnmount() {
    this.getDataOnFocus();
  }

  getKhelList() {
    if (this.props.route.params?.item) {
      const list = this.props.route.params.item;
      this.setState({
        list: list,
        listExists: true
      })
    } else {
      this.setState({
        list: [],
        listExists: false,
      })
    }
  }

  // async getKhelLists() {
  //     this.setState({isLoading: true});
  //     var maps = await AsyncStorage.getItem("store");
  //     console.log("maps", maps);
  //     if (maps == null) {
  //       console.log("maps is null")
  //       maps = false;
  //     } else {
  //       var array = [];
  //       maps = JSON.parse(maps);
  //       console.log("maps", maps);
  //       if (maps.length > 0 && !maps.includes(null)) {
  //         console.log("Success");
  //         maps.forEach(item => array.push(false));
  //       } else {
  //         console.log("Fell into this pool here");
  //         maps = [];
  //       }
  //     }
  //   this.setState({
  //     isLoading: false,
  //     checkboxes: array,
  //     list: maps,
  //     editedList: maps,
  //     data: khel
  //   }, () => console.log(this.state.isLoading));
  // }

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
        this.setState({searchData: this.state.data})
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
      // var indexes = [];
      //
      // for (var i = 0; i < this.state.checkboxes.length; i++) {
      //   if (this.state.checkboxes[i] == true) {
      //     indexes.push(i);
      //   }
      // }
      // console.log("indexes", indexes)
      //
      // if (indexes.includes(-1)) {
      //   return;
      // }
      //
      // var map = this.state.editedList.map(
      //   (item) => {
      //     if (indexes.includes(this.state.editedList.indexOf(item))) {
      //       item.khel.push(this.state.item);
      //       if (!item.categories.includes(this.state.item.category)) {
      //         item.categories.push(this.state.item.category);
      //       }
      //     }
      //     return item;
      //   }
      // );
      // console.log("map", map);
      //
      // await AsyncStorage.setItem("store", JSON.stringify(map));
      // this.setState({editedList: map, visible: false}, () => {
      //   console.log("new editedList", this.state.editedList)
      //   alert("Added!");
      // });

      let list = this.state.list;
      const amendedList = list.khel.concat(this.state.khelToAdd);
      list.khel = amendedList;
      this.setState({list: list, visible: false}, () => this.props.navigation.navigate("ListInfo", {
        item: list
      }))

  }

  removeList(item) {
    const list = this.state.khelToAdd.filter(x => x.name !== item.name);
    console.log(list);
    this.setState({khelToAdd: list});
  }

  adjustStyles(i) {
    var obj = {
      borderRadius: 10,
      padding: 2,
      borderColor:"black",
      alignItems: "center",
      marginRight: 3

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
    this.getKhelList();
    this.setState({refreshing: false});
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
            ListHeaderComponent={
              <View>
                    <Portal>
                    <Modal
                      visible={this.state.visible}
                      dismissable={true}
                      transparent={false}
                      onDismiss={() => this.setState({visible: false})}
                      onRequestClose={() => this.setState({visible: false})}
                    >
                    <View style={{backgroundColor: "white", padding: 10, height: 400}}>
                      <ScrollView>
                      {this.state.listExists && (
                      <View>
                        {this.state.list.khel.map((item, index) =>
                        <View style={{padding: 10}}>
                          <Title>{item.name}</Title>
                          <Caption>{item.category}</Caption>
                        </View>
                        )}
                        <View />
                        <Divider />
                        <View />
                        {this.state.khelToAdd.length > 0
                          ?
                          this.state.khelToAdd.map((item, index) => (
                            <View style={{padding: 10}}>
                                <Title>{item.name}</Title>
                                <View style={styles.rowContainer}>
                                  <Caption>{item.category}</Caption>
                                  <Button compact mode="contained" icon="minus" onPress={() => this.removeList(item)}></Button>
                                </View>
                            </View>
                          ))
                          : (
                            <View>
                              <Title>There are no items to add!</Title>
                            </View>
                        )}
                      </View>
                      )}
                      {!this.state.listExists && (
                        <View style={{justifyContent: "center"}}>
                          <Title>There are no items to add!</Title>
                        </View>
                      )}
                      <View style={styles.rowButtonContainer}>
                        <Button compact onPress={() => this.setState({visible: false})}>Close List</Button>
                        <Button compact mode="contained" disabled={!this.state.khelToAdd.length > 0} onPress={() => this.addToList()}>Add to List</Button>
                      </View>
                      </ScrollView>
                    </View>
                  </Modal>
                </Portal>
                    <Surface style={[styles.surfaceContainer, { padding: 20 }]}>
                      <View style={{justifyContent: "center", padding: 10}}>
                        <Button mode="contained" onPress={() => this.props.navigation.navigate("New")}>Make New List </Button>
                        <View style={styles.spacer}></View>
                        <Button onPress={() => this.setState({visible: true})}>Open List</Button>
                      </View>
                      <View style={styles.spacer}></View>
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
                }
            onRefresh={() => this.refreshControl()}
            refreshing={this.state.refreshing}
            renderItem = {({item, index}) => (
            <View key={index} style={styles.cardContainer}>
              <Card key={index}>
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
                  <View style={{flexDirection: "row"}}>
                  <Button compact={true} mode="contained" icon="plus" onPress={() => {
                      if (this.state.listExists) {
                        let khelToAddList = this.state.khelToAdd;
                        khelToAddList.push(item);
                        this.setState({
                          khelToAdd: khelToAddList
                        }, () => alert("Added!"));
                      } else {
                        this.props.navigation.navigate("New");
                      }
                  }}>
                    Add to List
                  </Button>
                  <Button compact={true} icon="information-outline" onPress={() => this.props.navigation.navigate("KhelInfo",
                    {
                      item: item
                    }
                  )}>
                    More Info
                  </Button>
                </View>
                  </Card.Actions>
                </Card>
            </View>
            )}
            keyExtractor={(item, index) => item.name}
          />
        </View>
      );
    }
  }

}
