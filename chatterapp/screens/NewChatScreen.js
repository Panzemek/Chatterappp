import React from "react";
import { View, StyleSheet, TextInput, Alert, Button} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { MapView } from "expo";
import axios from "axios";

let initialReg = {
    latitude: 47.6062,
    longitude: -122.3321,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

export default class NewChat extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return{
    headerRight: (
      <Button
      onPress={() => navigation.navigate("App")}
      title="Go Back"
      />
    )
    }
  };

  state = {
    latlng : {
      latitude: 47.6062,
      longitude: -122.3321
    },
    radius: 1000,
    name:""
  }

  pressLogic = () => {
    
    let coordVal = this.state.latlng
    //radius is stored in meters
    let radVal = this.state.radius
    let nameVal = this.state.name
    let newChat = {
      title: nameVal,
      description: "placeholder",
      location: coordVal,
      messages:[]
    }

    if (coordVal && radVal && nameVal) {
      //TODO: test this
      //also redirect user to new room
      axios.post('https://murmuring-sea-22252.herokuapp.com/createChat', newChat).then(res=>{
        console.log(res);
        //TODO: REDIRECT TO NEW PAGE HERE
      })
    } else {
      //TODO: alert user that values are needed, also test this
      Alert.alert(
        'please enter appropriate values',
        [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },]
      )
    }
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
          defaultValue={"Enter Chat Name Here"}
          clearTextOnFocus={true}
        />
        <TextInput 
          style={styles.input}
          onChangeText={radius => this.setState({radius: radius})}
          defaultValue={"Radius"}
          clearTextOnFocus={true}
          keyboardType={"number-pad"}
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