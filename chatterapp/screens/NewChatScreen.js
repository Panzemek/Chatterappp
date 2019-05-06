import React from "react";
import { View, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { MapView } from "expo";

let initialReg = {
    latitude: 47.6062,
    longitude: -122.3321,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

export default class NewChat extends React.Component {
  state = {
    latlng : {
      latitude: 47.6062,
      longitude: -122.3321
    },
    radius: 1
  }

  render() {
      <MapView style={{ flex: 1 }} initialRegion={initialReg}>
        <MapView.Marker 
          coordinate={this.state.latlng}
        />
        <MapView.Circle
          center={this.state.latlng}
          radius={this.state.radius}
        />

      </MapView>
  }
};