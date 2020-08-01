import React from "react";
import { Card, Button } from "react-native-paper";
import { View, Text, AsyncStorage } from "react-native";

export default class ListInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    const object = this.props.route.params;
    this.setState({data: object});
  }

  async componentWillUnmount() {
    await AsyncStorage.setItem("store", this.state.data);
  }

  async remove(item) {
    const list = this.state.data.filter(x => x.name !== item.name);
    console.log(list);
    this.setState({data: list});
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) =>
            <Card>
              <Card.Title title={item.name} />
              <Card.Content>
                {item.aim}
              </Card.Content>
              <Card.Actions>
                <View>
                  <Button onPress={() => this.remove(item)}>Remove Item</Button>
                  <Button onPress={() => this.props.navigation.navigate("Menu", {
                      item: item
                    })}>
                  More info
                  </Button>
                </View>
              </Card.Actions>
            </Card>
          }
          keyExtractor={(item, index) => item.name}
        />
      </View>
    );
  }
}
