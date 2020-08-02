import React from "react";
import { Button, Card } from "react-native-paper";
import { FlatList, View, AsyncStorage, ScrollView, Text } from "react-native";

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

  render() {
    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Button onPress={() => this.props.navigation.navigate("New")}>Generate New List</Button>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <Card>
              <Card.Title title={item.name} />
              <Card.Content>
              {item.khel.map((i, n) => (
                <Text>{n+1} : {i.name}</Text>
              ))}
              </Card.Content>
              <Card.Actions>
                <Button>Remove List</Button>
                <Button>More Info</Button>
              </Card.Actions>
            </Card>
          )}
          keyExtractor={(item, index) => item.name}
        />
      </View>
    );
  }
}
