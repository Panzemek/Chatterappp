//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput } from 'react-native';

// create a component
class SignUpScreen extends Component {
  signIn = async() => {
    await AsyncStorage.setItem('userToken', "Sammy")
    this.props.navigation.navigate("App")
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#FFF"
          style={styles.input}
          autoCapitalize={"none"}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#FFF"
          style={styles.input}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#FFF"
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize={"none"}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#FFF"
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize={"none"}
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
