import React from "react";
import { Button, Card, Chip } from "react-native-paper";
import { FlatList, View, AsyncStorage, ScrollView, Text } from "react-native";

import styles from "../../assets/styles/styles";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    var items = await AsyncStorage.getItem("store");
    this.setState({data: JSON.parse(items)});
  }


  removeList(item) {
    console.log(item);
    var array = this.state.data.filter(value => value.name !== item.name);
    this.setState({data: array});
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
      case "Sitting Down":
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
      case "Sitting Down":
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

  addView = () => (
    <View style={styles.container}>
      <Button mode="outlined" icon="plus-outline" onPress={() => this.props.navigation.navigate("New")}>Generate New List</Button>
    </View>
  );

  render() {
    return (
        <FlatList
          ListHeaderComponent={this.addView}
          data={this.state.data}
          renderItem={({item, index}) => (
            <Card>
              <Card.Title title={item.name} />
              <Card.Content>
              <View style={{flexDirection: "row", flex: 1}}>
                {item.categories.map((i, index) => <View style={this.adjustStyles(i)} key={index}><Text style={this.adjustText(i)}>{i}</Text></View>)}
              </View>
              <Text></Text>
              {item.khel.map((i, n) => (
                <Text>{n+1} : {i.name}</Text>
              ))}
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" onPress={() => Alert.alert(
                    "Warning!",
                    "Are you sure you want to delete this list? Deleted lists cannot be recovered!",
                    [
                      {text: 'Cancel', onPress: () => {return;}, style: 'cancel'},
                      {text: 'Delete List', onPress: () => this.removeList(item)}
                    ],
                    { cancelable: 'false'}
                  )
                }>Remove List</Button>
                <Button icon="information-outline">More Info</Button>
              </Card.Actions>
            </Card>
          )}
          keyExtractor={(item, index) => item.name}
        />
    );
  }
}
