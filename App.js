import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TextInput } from "react-native";
import { Container, Card, CardItem, Header } from "native-base";

export default function App() {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();

  useEffect(() => {
    fetch("https://covid-api.mmediagroup.fr/v1/cases")
      .then((response) => response.json())
      .then((responseJson) => {
        const countryData = [];
        for (let i in responseJson) {
          countryData.push(responseJson[i].All);
        }
        setData(countryData);
        setFilterData(countryData);
      });
  }, []);

  const renderItem = ({ item }) => (
    <Card>

      <CardItem>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.country}</Text>
      </CardItem>

      <CardItem style={styles.info}>
        <Text style={{ color: "darkmagenta" }}>
          Population: {item.population}
        </Text>
        <Text style={{ color: "blue" }}>Confirmed: {item.confirmed}</Text>
        <Text style={{ color: "green" }}>Recovered: {item.recovered}</Text>
        <Text style={{ color: "red" }}>Deaths: {item.deaths}</Text>
      </CardItem>

    </Card>
  );

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter(function(item) {
        const itemData = item.country
          ? item.country.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  };

  return (
    <Container>
      <Header>
        <Text style={styles.header}>Covid 19 Statistics Report</Text>
      </Header>

      <TextInput
        placeholder="Search Country"
        style={styles.textInput}
        onChangeText={(text) => searchFilterFunction(text)}
      />

      <FlatList data={filterData} renderItem={renderItem} />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",

  },
  textInput: {
    padding: 10,
    alignItems: "center",
    fontWeight: "bold",
    paddingLeft: 20,
  },
  info: {
    flexDirection: "column",
  },
});
