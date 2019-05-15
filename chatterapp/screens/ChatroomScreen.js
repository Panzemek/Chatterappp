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
import axios from "axios";
import API from "../utils/API"

const userToken = "@userId";

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      room: "",
      userId: "",
      username: ""
    };


    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient("https://murmuring-sea-22252.herokuapp.com/");
    // this.socket = SocketIOClient("http://10.0.2.2:3001");
    this.socket.on("message", this.onReceivedMessage);
    this.determineUser();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("pageToLoad", "Seattle"),
      headerRight: (
        <Button onPress={() => navigation.navigate("App")} title="Go Back" />
      )
    };
  };

  loadUsers = (callback) => {
    API.getUsers().then(res => this.setState({ users: res.data }, () => {
      let name;
      AsyncStorage.getItem("userToken").then(data => {
        console.log(data);
        for (var i = 0; i < this.state.users.length; i++) {
          name = this.state.users[i];
          if (name.name == data) {
            this.setState({
              userId: name._id,
              username: name.name
            }, () => callback())
          }
        }
      })
    }))
      .catch(err => console.log(err))
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    // AsyncStorage.getItem(userToken)
    //   .then(userId => {
    //     // If there isn't a stored userId, then fetch one from the server.
    //     // Todo: modify for our server structure
    //     if (!userId) {
    //       this.socket.emit("join", null);
    //       this.socket.on("join", userId => {
    //         AsyncStorage.setItem(userToken, userId);
    //         this.setState({ userId });
    //       });
    //     } else {
    //       this.socket.emit("userJoined", userId);
    //       this.setState({ userId });
    //     }
    //   })
    //   .catch(e => alert(e));
  }

  componentDidMount() {
    let newRoom = this.props.navigation.getParam("pageToLoad", "Seattle");
    this.loadUsers(() => {
      this.setState({
        room: newRoom,
      }, () => {
        this.socket.emit("join", this.state.userId, this.state.room);
        // let connStr =
        //   "https://murmuring-sea-22252.herokuapp.com/message/" + this.state.room;
        // axios.get(connStr).then(res => {
        //   let dbMessages = res;
        //   console.log(dbMessages);
        //   this.setState({ messages: dbMessages });
        // });
      });
    })
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
    this._storeMessages(messages.reverse());
  }

  onSend(messages = []) {
    console.log("client: ");
    console.log(messages[0]);
    this.socket.emit("message", messages[0], this.state.room);
    this._storeMessages(messages.reverse());
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
          user={{
            _id: this.state.userId,
            name: this.state.username
          }}
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
