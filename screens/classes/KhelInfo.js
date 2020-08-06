import React from "react";
import { StyleSheet, View, FlatList, Share, AsyncStorage, ScrollView } from "react-native";
import { Button, Portal, Checkbox, Dialog, Surface, Divider, Text, Title, Caption, Paragraph, Subheading } from "react-native-paper";

import khel from "../../assets/khel.json";
import styles  from "../../assets/styles/styles";

export default class KhelInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: [],
      list: [],
      editedList: [],
      item: null,
      checkboxes: [],
      visible: false
    }
  }

  async componentDidMount() {
    const { item } = this.props.route.params;
    var maps = await AsyncStorage.getItem("store");
    var array = [];
    if (maps == null) {
      maps = false;
    } else {
      maps = JSON.parse(maps);
      if (maps.length && !maps.includes(null)) {
        maps.forEach(item => array.push(false));
      } else {
        maps = false;
      }
    }
    this.setState({
      isLoading: false,
      checkboxes: array,
      list: maps,
      editedList: maps,
      data: khel,
      object: item,
    });
  }

  openDialog() {
      this.setState({
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

    async addToList() {
        var indexes = this.state.checkboxes.map(
          item => {
            if (item == true) {
              return this.state.checkboxes.indexOf(item);
            }
          }
        );
        console.log("indexes", indexes)

        if (indexes.includes(-1)) {
          return;
        }

        this.state.editedList.forEach(
          item => {
            if (indexes.includes(this.state.editedList.indexOf(item))) {
              if (item.khel.some(e => e.name == this.state.item.name)) {
                this.setState({visible: false}, () => alert("The selected khel is already in the list!"));
                return;
              }
            }
          }
        )

        var map = this.state.editedList.map(
          (item) => {
            if (indexes.includes(this.state.editedList.indexOf(item))) {
              console.log("item", item);
              item.khel.push(this.state.item);
              if (!item.categories.some(this.state.item.category)) {
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

  async onShare() {
    try {
      const result = await Share.share({
        message: object
      });
      return;
    } catch (error) {
      console.log(error);
      alert("Your item could not be shared. Please try again");
    }
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

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 10}}>
          <Surface style={styles.khelContainer}>
            <Title>{this.state.object.name}</Title>
            <View style={{ justifyContent: "space-between", flexDirection: "row"}}>
              <Subheading>Category:</Subheading>
              <View style={this.adjustStyles(this.state.object.category)}><Text style={this.adjustText(this.state.object.category)}>{this.state.object.category}</Text></View>
            </View>
            <View style={styles.spacer}/>
              <Divider />
            <View style={styles.spacer}/>
            <View style={styles.cardText}>
              <Caption>Aim:</Caption>
              <Paragraph>{this.state.object.aim}</Paragraph>
            </View>
            <View style={styles.spacer}/>
              <Divider />
            <View style={styles.spacer}/>
            <View style={styles.cardText}>
              <Caption>Description:</Caption>
              <Paragraph>{this.state.object.description}</Paragraph>
            </View>
            <View style={styles.spacer}/>
            <Divider />
            <View style={styles.spacer} />
          </Surface>

        <View style={styles.spacer}></View>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={() => this.hideDialog()}>
          <Dialog.Title>Please choose the list:</Dialog.Title>
          <Dialog.Content>
          {this.state.checkboxes.length == 0 && !this.state.list && (
            <View>
              <Text>There are no lists to add to!</Text>
            </View>
          )}
          {this.state.checkboxes.length > 0 && this.state.list  && (
            <View>
              {this.state.checkboxes.map((item, index) => (
                <View style={styles.rowContainer}>
                  <Text>{this.state.list[index].name}</Text>
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
        <View>
          <Button onPress={() => this.openDialog()}> Add to List </Button>
          <Button onPress={() => this.onShare()}> Share khel info </Button>
          <Button> Spotted something wrong? </Button>
        </View>
      </ScrollView>
    );
  }
}
