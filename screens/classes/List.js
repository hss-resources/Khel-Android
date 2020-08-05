import React from "react";
import { Button, Card, Chip, Surface } from "react-native-paper";
import { FlatList, View, AsyncStorage, ScrollView, Text, Alert } from "react-native";

import styles from "../../assets/styles/styles";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
    }
  }

  async componentDidMount() {
    var items = await AsyncStorage.getItem("store");
    if (items == null) {
      this.setState({data: []});
    } else if (!(JSON.parse(items)).includes(null)) {
      this.setState({data: JSON.parse(items)});
    }
    console.log(JSON.parse(items));
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
      marginRight: 3,
      elevated: 1

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

  async refreshControl() {
    this.setState({refreshing: true});
    var items = JSON.parse(await AsyncStorage.getItem("store"));
    if (items == null) {
      this.setState({data: []})
    } else if (!items.includes(null)) {
      this.setState({data: items});
    }
    this.setState({refreshing: false});
  }

  addView = () => (
  <View style={styles.newContainer}>
    <Surface style={styles.surfaceContainer}>
      <Button mode="outlined" icon="plus" onPress={() => this.props.navigation.navigate("New")}>Generate New List</Button>
    </Surface>
  </View>
  );

  emptyView = () => (
    <Surface style={styles.surfaceContainer}>
      <Text>You don't seem to have made any lists yet -</Text>
      <Text>click on the button below to get started!</Text>
    </Surface>
  );

  render() {
    return (
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={() => this.refreshControl()}
          ListHeaderComponent={this.addView}
          ListEmptyComponent={this.emptyView}
          data={this.state.data}
          renderItem={({item, index}) => (
          <View style={styles.cardContainer}>
            <Card>
              <Card.Title title={item.name} />
              <Card.Content>
              <View style={{flexDirection: "row", flex: 1}}>
                {item.categories.map((i, index) => <Surface style={this.adjustStyles(i)} key={index}><Text style={this.adjustText(i)}>{i}</Text></Surface>)}
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
          </View>
          )}
          keyExtractor={(item, index) => item.name}
        />
    );
  }
}
