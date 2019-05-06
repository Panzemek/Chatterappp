import React from 'react';
import { View, TextInput, Button, StyleSheet,Text } from "react-native"


export default class MessageScreen extends React.Component {
  state = {
    messages: [],
    message: "",
    room: ""
  }

  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam("pageToLoad", "Seattle")}
  }


  componentDidMount() {
    let newRoom = this.props.navigation.getParam("pageToLoad", "Seattle")
    this.setState({room:newRoom})

  }


  handleSend = () => {
    let arr = this.state.messages.slice();

    if (this.state.message) {
      arr.push(this.state.message);
      this.setState({
        messages: arr,
        message: ""
      })
    }
  }

  render() {
    return (
      <View>
        <TextInput
          value={this.state.message}
          onChangeText={message => this.setState({message: message})}
          placeholder="Message"
          placeholderTextColor="#FFF"
          style={styles.input}
        />

        <Button title="Send" onPress={this.handleSend} />

        <Text>{this.state.messages.join(" ")}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  input: {
    height: 40,
    backgroundColor: "rgba(000,000,000,0.2)",
    marginBottom: 20,
    color: "#000",
    paddingHorizontal: 10
  }
});
