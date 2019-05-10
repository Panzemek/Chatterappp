//Loading Authentication screen

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

// create a component
class AuthLoadingScreen extends Component {
    constructor() {
        super()
        this.loadApp()
    }

    //On load app, get the userToken from AsyncStorage
    loadApp = async () => {
        const userToken = await AsyncStorage.getItem("userToken")

        this.props.navigation.navigate(userToken ? "App" : "Auth")
    }

    //render the activity indicator
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AuthLoadingScreen;
