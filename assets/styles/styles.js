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
  rowButtonContainer: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  switchText: {
    alignItems: 'center',
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  newContainer: {
    height: '80%',
    padding: 10,
    flex: 1
  },
  surfaceContainer: {
    elevation: 1,
    padding: 10
  },
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1
  },
  khelContainer: {
    padding: 10,
    borderRadius: 10,
    elevation: 1
  },
  spacer: {
    height: 20
  },
  cardContainer: {
    padding: 10,
    flex: 1
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: "row",
    flex: 1
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  cardTitle: {

  }
});

export default styles;
