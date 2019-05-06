//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
const RoomButton = props => {
    return (
        <View>
            <Button key={props.key} onPress={this.props.handleSubmit} title="New Room" style={styles.input} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
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
export default RoomButton;
