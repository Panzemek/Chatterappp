import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { MapView, Marker } from 'expo';
import Coords from '../assets/nHoodCords'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Maps',
  };

  render() {
    return (
      <MapView>style={{ flex: 1 }}
      initialRegion={{
        latitude: 47.6062,
        longitude: -122.3321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      </MapView>
    );
  }
}