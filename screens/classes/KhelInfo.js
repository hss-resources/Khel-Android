import React from "react";
import { StyleSheet, View, FlatList, Share, Text, AsyncStorage, ScrollView } from "react-native";
import { Button, Portal, Checkbox, Dialog, Divider } from "react-native-paper";

import khel from "../../assets/khel.json";

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
    var maps = JSON.parse(await AsyncStorage.getItem("store"));
    var array = [];
    maps.forEach(item => array.push(false));
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

        var map = this.state.list.map(
          (item) => {
            if (indexes.includes(this.state.list.indexOf(item))) {
              item.khel.push(this.state.item)
            }
          }
        );

        await AsyncStorage.setItem("store", JSON.stringify(map));
        this.setState({editedList: map, visible: false}, () => {
          alert("Added!");
        });
        return;
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

  render() {
    return (
      <ScrollView>
        <View>
          <Surface>
            <View styl>
              <Text>Meaning:</Text>
              <Text>{JSON.stringify(this.state.object.name)}</Text>
            </View>
            <Divider />
            <View>
              <Text>Aim:</Text>
              <Text>{this.state.object.aim}</Text>
            </View>
            <Divider />
            <View>
              <Text>Description:</Text>
              <Text>{this.state.object.description}</Text>
            </View>
          </Surface>
        </View>
        <View></View>
        <View>
          <View><Button onPress={() => this.openDialog()}> Add to List </Button></View>
          <View><Button onPress={() => this.onShare()}> Share khel info </Button></View>
          <View><Button> Spotted something wrong? </Button></View>
        </View>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={() => this.hideDialog()}>
          <Dialog.Title>Please choose the list:</Dialog.Title>
          <Dialog.Content>
            {this.state.checkboxes.map((item, index) => (
              <View>
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
      </ScrollView>
    );
  }
}
