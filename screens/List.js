import React from "react";
import { Button, Layout, Card, Text } from "@ui-kitten/components";
import { FlatList, View, AsyncStorage, ScrollView } from "react-native";


export default function List({ navigation }) {
  const [data, setData] = React.useState([]);
  () => getData();


  function removeList(item) {
    console.log(item);
    var array = data.filter(value => value.name !== item.name);
    console.log(done);
    setData(array);
  }

  async function getData() {
    var items = await AsyncStorage.getItem("store");
    setData(JSON.parse(items));
    console.log(data);
  }

    return (
      <Layout>
        <Text></Text>
        <Text></Text>
        <Button onPress={() => navigation.navigate("New")}>Generate New List</Button>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <Card header={() => (
              <View>
                <Text category="h2">{item.name}</Text>
              </View>
            )} footer={() => (
              <View>
                <Button>Remove List</Button>
                <Button>More Info</Button>
              </View>
            )}>
              {item.khel.map((i, n) => (
                <Text>{n+1} : {i.name}</Text>
              ))}
            </Card>
          )}
          keyExtractor={(item, index) => item.name}
        />
      </Layout>
    );
}
