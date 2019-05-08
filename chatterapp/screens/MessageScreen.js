import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import SocketIOClient from "socket.io-client";

const USER_ID = "@userId";

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      room: "",
      userId: null
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient("https://murmuring-sea-22252.herokuapp.com/");
    this.socket.on("message", this.onReceivedMessage);
    this.determineUser();
  }

  static navigationOptions = ({ navigation }) => {
    return { title: navigation.getParam("pageToLoad", "Seattle") };
  };

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then(userId => {
        // If there isn't a stored userId, then fetch one from the server.
        // Todo: modify for our server structure
        if (!userId) {
          this.socket.emit("join", null);
          this.socket.on("join", userId => {
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit("userJoined", userId);
          this.setState({ userId });
        }
      })
      .catch(e => alert(e));
  }

  componentDidMount() {
    let newRoom = this.props.navigation.getParam("pageToLoad", "Seattle");
    this.setState({ room: newRoom }, () => {});
  }



  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  // Event listeners

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages = []) {
    this.socket.emit("message", messages[0]);
    this._storeMessages(messages);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        enabled
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{_id: 1}}
        />
      </KeyboardAvoidingView>
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
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
