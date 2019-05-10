//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput, Alert } from 'react-native';
import API from "../utils/API";


// create a component
class SignUpScreen extends Component {

  state = {
    users: [],
    username: "",
    email: "",
    password: "",
    confirmPass: "",
    firstname: "",
    lastname: ""
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers().then(res => this.setState({ users: res.data })).catch(err => console.log(err))
  }

  checkState = () => {
    if (this.state.username.trim() && this.state.email.trim() && this.state.email.trim() && this.state.password.trim() && this.state.confirmPass.trim() && this.state.firstname.trim() && this.state.lastname.trim()) {
      return true;
    }
    Alert.alert(
      "Field error",
      "Please fill out all fields",
      [
        { text: "Okay", onPress: () => console.log("okay") }
      ]
    )
    return false
  }


  validateEmail = (email) => {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if(re.test(email)){
      return true;
    }
    else{
      Alert.alert(
        "Please enter a valid email",
        "Email must be valid",
        [
          {text: "Okay", onPress: () => console.log("okay")}
        ]
      )
    }
  }

  checkEmail = () => {

  }

  checkUsers = () => {
    let name;
    for (let i = 0; i < this.state.users.length; i++) {
      name = this.state.users[i].userName;
      if (this.state.username.trim() == name) {
        return false;
      }
    }
    if (this.state.username.includes(" ")) {
      Alert.alert(
        "Please enter a valid username",
        "Usernames cannot contain spaces",
        [
          { text: "Okay", onPress: () => console.log("okay") }
        ]
      )
      return false;
    }
    return true;
  }

  checkPassword = () => {
    if (this.state.password.length > 6) {
      if (this.state.password.trim() == this.state.confirmPass.trim()) {
        return true;
      }
      else {
        Alert.alert(
          "Passwords don't match",
          "Please confirm your password",
          [
            { text: "Okay", onPress: () => console.log("okay") }
          ]
        )
      }
    }
    else {
      Alert.alert(
        "Password must be longer than 6",
        "Please try again",
        [
          { text: "Okay", onPress: () => console.log("okay") }
        ]
      )
      return false;
    }
  }

  signIn = async () => {
    if (this.checkState()) {
      if (this.checkUsers()) {
        if (this.validateEmail(this.state.email)) {
          if (this.checkPassword()) {
            let user = {
              name: this.state.username,
              password: this.state.confirmPass,
              firstName: this.state.firstname,
              lastName: this.state.lastname
            }
            API.saveUser(user);
            await AsyncStorage.setItem('userToken', this.state.username)
            this.props.navigation.navigate("App")
          }
        }
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
          placeholder="First Name"
          placeholderTextColor="#FFF"
          style={styles.input}
          onChangeText={text => this.setState({ firstname: text })}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#FFF"
          style={styles.input}
          onChangeText={text => this.setState({ lastname: text })}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#FFF"
          style={styles.input}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          textContentType={"emailAddress"}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#FFF"
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize={"none"}
          onChangeText={text => this.setState({ password: text })}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#FFF"
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize={"none"}
          onChangeText={text => this.setState({ confirmPass: text })}
        />


        <Button title="Complete Sign Up" onPress={this.signIn} />
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
export default SignUpScreen;
