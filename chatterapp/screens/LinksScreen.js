import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { MapView } from "expo";
import Coords from "../assets/nHoodCords";

let initialReg = {
  latitude: 47.6062,
  longitude: -122.3321,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

//github issue on markers not returning key value
//https://github.com/react-native-community/react-native-maps/issues/218

export default class LinksScreen extends React.Component {

  static navigationOptions = {
    title: "Maps"
  };

  handlePress = (e) => {
    coordinates = [e.coordinate.longitude, e.coordinate.latitude]
    for (i=0; i<Coords.length; i++) {
      nHoodCoord = Coords[i].geometry.coordinates
      if (coordinates[0]===nHoodCoord[0] && coordinates[1]===nHoodCoord[1]) {
        return Coords[i].properties.neighborhood;
      }
    }
  }
  
  

  render() {
    return (
      <MapView style={{ flex: 1 }} initialRegion={initialReg}>
        {Coords.map(coord => (
          <MapView.Marker
            //TODO: This needs to handle page redirection - currently it just returns the name of the neighborhood you clicked on
            onCalloutPress={e => console.log(this.handlePress(e.nativeEvent))}
            key={coord.properties.neighborhood}
            title={coord.properties.neighborhood + "- Press To Join Room!"}
            coordinate={{
              latitude: coord.geometry.coordinates[1],
              longitude: coord.geometry.coordinates[0]
            }}
          />
        ))}
      </MapView>
    );
  }
}
