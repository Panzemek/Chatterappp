//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput, Alert } from 'react-native';
import API from "../utils/API"

// create a component
class SignInScreen extends Component {
  state = {
    users: [],
    username: "",
    password: ""
  }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers = () => {
    API.getUsers().then(res => this.setState({ users: res.data })).catch(err => console.log(err))
  }

  checkState = () => {
    if (this.state.username.trim() && this.state.password.trim()) {
      return true;
    }
    Alert.alert(
      "Field error",
      "Please fill out all fields",
      [
        { text: "Okay", onPress: () => console.log("okay") }
      ]
    )
    return false;
  }

  checkUsers = () => {
    let name;
    let password;
    for (let i = 0; i < this.state.users.length; i++) {
      name = this.state.users[i].name;
      password = this.state.users[i].password;
      if (this.state.username.trim() == name) {
        if (this.state.password.trim() == password) {
          return true;
        }
        else {
          Alert.alert(
            "Wrong Password",
            "Please check your password. (Password is case sensitive)",
            [
              { text: "Okay", onPress: () => console.log('Okay') }
            ]
          )
          return false
        }
      }
    }
    Alert.alert(
      "Wrong Username",
      "Please check your username, or create a new account. (Username is case sensitive)",
      [
        { text: "Okay", onPress: () => console.log("Okay") }
      ]
    )
    return false;
  }

  signIn = async () => {
    if (this.checkState()) {
      if (this.checkUsers()) {
        await AsyncStorage.setItem('userToken', this.state.username)
        this.props.navigation.navigate("App")
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#FFF"
          style={styles.input}
          autoCapitalize={"none"}
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#FFF"
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize={"none"}
          onChangeText={text => this.setState({ password: text })}
        />


        <Button title="Complete Sign In" onPress={this.signIn} />
      </View>
    );
  }
}

// define your styles
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

//make this component available to the app
export default SignInScreen;
