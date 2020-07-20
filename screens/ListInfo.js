import React from "react";
import { Layout, }


export default function ListInfo({navigation}) {
  const [data, setData] = React.useState([]);

  async function getData() {
    const map = await AsyncStorage.getItem("store");
    setData(map);
  }

  async function remove(item) {
    const list = data.filter(x => x.name !== item.name);
    console.log(list);
    await AsyncStorage.setItem("store", list);
    setData(list);
  }

  return (
    <Layout>
      <FlatList
        data={khel}
        renderItem={({item}) =>
          <Card header={() =>
              <View>
                <Text>{item.name}</Text>
              </View>
          } footer={() =>
            <View>
              <Button onPress={() => this.remove(item)}>Remove Item</Button>
              <Button onPress={() => navigation.navigate("Menu", {
                  item: item
                })}>
              More info
              </Button>
            </View>
          }>
            <Text>{item.aim}</Text>
          </Card>
        }
        keyExtractor={(item, index) => item.name}
      />
    </Layout>
  )
}
