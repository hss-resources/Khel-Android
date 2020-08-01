import React from "react";
import { StyleSheet, View, FlatList, Share } from "react-native";
import { Button} from "react-native-paper";

export default class KhelInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: [],
    }
  }

  componentDidMount() {
    this.setState({object: this.props.route.params});
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
      <View>
        <View>
          <View>
            <Text>Meaning:</Text>
            <Text>{this.state.object.meaning}</Text>

            <Text>Aim:</Text>
            <Text>{this.state.object.aim}</Text>

            <Text>Description:</Text>
            <Text>{this.state.object.description}</Text>
          </View>
        </View>
        <View></View>
        <View>
          <View><Button onPress={this.addToList()}> Add to List </Button></View>
          <View><Button onPress={this.onShare()}> Share khel info </Button></View>
          <View><Button> Spotted something wrong? </Button></View>
        </ScrollView>
      </View>
    );
  }
}
