import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat"


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


//   handleSend = () => {
//     let arr = this.state.messages.slice();

//     if (this.state.message) {
//       arr.push(this.state.message);
//       this.setState({
//         messages: arr,
//         message: ""
//       })
//     }
//   }

//   render() {
//     return (
//       <View>
//         <TextInput
//           value={this.state.message}
//           onChangeText={message => this.setState({message: message})}
//           placeholder="Message"
//           placeholderTextColor="#FFF"
//           style={styles.input}
//         />

//         <Button title="Send" onPress={this.handleSend} />

//         <GiftedChat>{this.state.messages.join(" ")}</GiftedChat>
//       </View>
//     )
//   }
// }

componentWillMount() {
  this.setState({
    messages: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  })
}

onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))
}

render() {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={{flex:1}} keyboardVerticalOffset={100} enabled>
    <GiftedChat
      messages={this.state.messages}
      onSend={messages => this.onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </KeyboardAvoidingView>
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
