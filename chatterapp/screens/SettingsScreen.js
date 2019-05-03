import React from 'react';
import { View, Button, AsyncStorage } from "react-native"

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  signOut = async() => {
    await AsyncStorage.clear()
    this.props.navigation.navigate("AuthLoading")
  }
  render() {
    return (
    <View>
      <Button title="Sign Out" onPress={this.signOut} />
    </View>
    )
  }
}
