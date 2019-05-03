//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.button}>
                <Button title="Sign In" onPress={() => 
                this.props.navigation.navigate("SignIn")} />
            </View>
            <View style={styles.button}>
                <Button title="Sign Up" onPress={() => 
                this.props.navigation.navigate("SignUp")} />
            </View>
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
        backgroundColor: '#fff',
    },

    button: {
        margin: 5
    }
});

//make this component available to the app
export default Welcome;
