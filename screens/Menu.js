import React from "react";
import { StyleSheet, View, FlatList, Share } from "react-native";
import { Button, Card, Layout, Text, ButtonGroup, Toggle } from "@ui-kitten/components";

export default function Display({ route, navigation }) {

  const object = route.params;

  const onShare = async () => {
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


  return (
    <Layout>
      <Card header={HeaderComponent} footer={FooterComponent}>
        <View>
          <Text>Meaning:</Text>
          <Text>{object.meaning}</Text>

          <Text>Aim:</Text>
          <Text>{object.aim}</Text>

          <Text>Description:</Text>
          <Text>{object.description}</Text>
        </View>
      </Card>
      <View></View>
      <Card>
        <View><Button onPress={this.onShare}> Add to List </Button></View>
        <View><Button> Share khel info </Button></View>
        <View><Button> Spotted something wrong? </Button></View>
      </Card>
    </Layout>
  );
}
