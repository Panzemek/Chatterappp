//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput } from 'react-native';

// create a component
class SignInScreen extends Component {

  signIn = async() => {
    await AsyncStorage.setItem('userToken', "Sammy")
    this.props.navigation.navigate("App")
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username or Email"
          placeholderTextColor="#FFF"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#FFF"
          style={styles.input}
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
