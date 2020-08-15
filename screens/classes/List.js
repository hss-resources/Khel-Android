import React from "react";
import { Button, Card, Chip, Surface, Title, Paragraph, Subheading, Caption, Divider } from "react-native-paper";
import { FlatList, View, AsyncStorage, ScrollView, Alert, Text } from "react-native";

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
    } else {
      let newMaps = JSON.parse(items);
      if (newMaps.length > 1 && !newMaps.includes(null)) {
        this.setState({data: newMaps});
      } else if (newMaps.length === 1 && newMaps[0] != null) {
        this.setState({data: newMaps});
      } else {
        this.setState({data: []})
      }
    }
  }


  async removeList(item) {
    console.log(item);
    var array = this.state.data.filter(value => value.name !== item.name);
    await AsyncStorage.setItem("store", JSON.stringify(array));
    this.setState({data: array});
  }

  adjustStyles(i) {
    var obj = {
      borderRadius: 10,
      padding: 2,
      borderColor:"black",
      alignItems: "center",
      margin: 5,
    };

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
      padding: 5,
      flexShrink: 1
    };

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
    var items = await AsyncStorage.getItem("store");
    console.log("THIS IS ME ARRAY", JSON.parse(items));
    if (items == null) {
      this.setState({data: []})
    } else if (!JSON.parse(items).includes(null)) {
      this.setState({data: JSON.parse(items)});
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
              <Card.Title title={<Title>{item.name}</Title>} />
              <Card.Content>
                <Divider />
              <View style={styles.spacer}/>
              <Caption>Categories: </Caption>
              <View style={{flexDirection: "row", flexWrap: "wrap", flex: 1, alignItems: "center"}}>
                {item.categories.map((i, index) => <Surface style={this.adjustStyles(i)} key={index}><Text style={this.adjustText(i)}>{i}</Text></Surface>)}
              </View>
              <View style={styles.spacer}/>
              <Divider />
              <View style={styles.spacer}/>
                <Subheading>Khel:</Subheading>
              <View style={styles.spacer}/>
              {item.khel.map((i, n) => (
                <Text>{n+1} : {i.name}</Text>
              ))}
              <View style={styles.spacer}/>
              <Divider />
              <View style={styles.spacer} />
              </Card.Content>
              <Card.Actions>
              <View style={styles.rowButtonContainer}>
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
              <Button icon="information-outline" mode="outlined" onPress={() => this.props.navigation.navigate("ListInfo", {
                  item: JSON.stringify(item)
                })}>More Info</Button>
            </View>
              </Card.Actions>
            </Card>
          </View>
          )}
          keyExtractor={(item, index) => item.name}
        />
    );
  }
}
