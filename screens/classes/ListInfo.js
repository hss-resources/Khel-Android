import React from "react";
import { Card, Button, Surface, Divider, Title, Subheading, Paragraph, Caption, Headline } from "react-native-paper";
import { View,  AsyncStorage, FlatList, Share, Text } from "react-native";

import styles from "../../assets/styles/styles";

export default class ListInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    }
  }

  async componentDidMount() {
    const { item } = this.props.route.params;
    console.log(item.categories);
    this.setState({data: item, isLoading: false});
  }


  remove(item) {
    const list = this.state.data.khel.filter(x => x.name != item.name);
    let categories = this.props.route.params.item.categories;
    if (list.findIndex(i => i.category == item.category) == -1) {
      categories = this.props.route.params.item.categories.filter(i => i != item.category);
    }
    console.log(list);
    const editedData = this.state.data;
    editedData.khel = list;
    editedData.categories = categories;
    this.setState({data: editedData});
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

  headerComponent() {
    return (
    <Surface>
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <View style={styles.spacer}/>
        <Headline>{this.state.data.name}</Headline>
        <View style={styles.spacer}/>
      </View>
      <View style={{padding: 10}}>
        <Divider></Divider>
      </View>
      <View style={{padding: 10}}>
        <Caption>Categories:</Caption>
        <View style={styles.pillContainer}>
          {this.props.route.params.item.categories.map(item =>
            <View style={this.adjustStyles(item)}>
              <Text style={this.adjustText(item)}>{item}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.spacer}/>
        <View style={{padding: 10}}>
          <Button mode="outlined" onPress={() => this.props.navigation.navigate("Home", {
              item: this.state.data
            })}>Add Khel to List</Button>
        </View>
      <View style={{padding: 10}}>
        <Button mode="contained" onPress={() => this.onShare()}>Share List</Button>
      </View>
    </Surface>
  );
}

async onShare() {
  var string = this.state.data.khel.map(item => item.name + " (" + item.category + ")\r\n")
                                   .reduce((acc, cur, index, data) => acc + (index+1) + ": " + cur, this.state.data.name+":\r\n");
  try {
    const result = await Share.share({
      message: string
    });
  } catch(err) {
    alert(err)
  }
}



  render() {
    return (
        <FlatList
          ListHeaderComponent={() => this.headerComponent()}
          data={this.state.data.khel}
          renderItem={({item, index}) =>
          <View key={index} style={styles.cardContainer}>
            <Card>
              <Card.Title title={item.name} />
              <Card.Content>
                <View style={styles.pillContainer}>
                  <Surface style={this.adjustStyles(item.category)} key={index}><Text style={this.adjustText(item.category)}>{item.category}</Text></Surface>
                </View>
                <View style={styles.rowContainer}>
                  <Text>Aim: {item.aim}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <View style={styles.rowButtonContainer}>
                  <Button onPress={() => this.remove(item)}>Remove Item</Button>
                  <Button onPress={() => this.props.navigation.navigate("KhelInfo", {
                      item: item
                    })}>
                  More info
                  </Button>
                </View>
              </Card.Actions>
            </Card>
          </View>
          }
          keyExtractor={(item, index) => item.name}
        />
    );
  }
}
