import React from "react";
import { Button, Layout, Card } from "@ui-kitten/components";
import { FlatList } from "react-native";


export default function List({ navigation }) {
    const [data, setData] = React.useState([]);
    return (
      <Layout>
        <Button onPress={() => navigation.navigate("New")}>Generate New List</Button>
        <FlatList
          data={data}
          renderItem={(item, index) => {
            <Card>
              {item.map((number) => )}
            </Card>
          }}
        />
      </Layout>
    );
}
