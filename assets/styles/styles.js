import { React } from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rowContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  switchText: {
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1
  },
  itemContainer: {
    padding: 10,
    width: '95%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default styles;
