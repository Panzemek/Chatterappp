import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { MapView } from "expo";



let initialReg = {
    latitude: 47.6062,
    longitude: -122.3321,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

export default class NewChat extends React.Component {

  static navigationOptions = {
    headerLeft: null
  };

  state = {
    latlng : {
      latitude: 47.6062,
      longitude: -122.3321
    },
    radius: 1000,
    name:""
  }

  render() {
    return(
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialReg}>
        <MapView.Marker 
          coordinate={this.state.latlng}
          title={"Press here to create your new room!"}
          onCalloutPress={() => this.props.navigation.navigate("App")}
        />
        <MapView.Circle
          center={this.state.latlng}
          radius={this.state.radius}
        />
      </MapView>
      <View style={styles.inputView}>
        <TextInput 
          style={styles.input}
          onChangeText={name => this.setState({name: name})}
        />
        <TextInput 
          style={styles.input}
          onChangeText={radius => this.setState({radius: radius})}
        />
      </View>
    </View>
    )
  }
};

var styles = StyleSheet.create ({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
  },
  map: {
      flex: 1,
  },
  inputView: {
      backgroundColor: 'rgba(0,0,0,0)',
      position: 'absolute', 
      top: 12,
      left: 5,
      right: 5
  },
  input: {
      height: 36,
      padding: 10,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 14,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#48BBEC',
      backgroundColor: 'white',
  }
})