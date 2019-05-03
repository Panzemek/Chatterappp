import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import NewRoom from "../components/NewRoom/NewRoom"

export default class HomeScreen extends React.Component {
  displayData = []

  state = {
    rooms: this.displayData,
    keys: 0
  }

  static navigationOptions = {
    header: null,
    title: "Home",
  };

  addRoom = () => {
    this.displayData.push(<Button key={this.state.keys} onPress={console.log("lol")} title="New Room" style={styles.input}/>)
    this.setState({
      rooms: this.displayData,
      keys: this.state.keys + 1,
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.button}>
          <Button title="Create New Room" onPress={this.addRoom} />
        </View>
        {this.state.rooms.map(room => {
          return(room)})}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    height: 40,
    backgroundColor: "rgba(000,000,000,0.2)",
    marginBottom: 20,
    color: "#000",
    paddingHorizontal: 10
  }
});