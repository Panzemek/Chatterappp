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
  AsyncStorage
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  displayData = []

  state = {
    rooms: this.displayData,
    keys: 0
  }

  static navigationOptions = {
    title: "Home",
  };

  handleSubmit = () => {
    this.props.navigation.navigate("Room");
}

componentDidMount() {
  AsyncStorage.getItem("userToken").then(data => console.log(data))
}


  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.button}>
          <Button title="Create New Room" onPress={this.handleSubmit} />
        </View>
        {this.state.rooms.map(room => {
          return (room)
        })}
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