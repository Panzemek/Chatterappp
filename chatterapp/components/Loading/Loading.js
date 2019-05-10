//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';

// create a component
const Loading = props => {
    return (
        <View>
        <Modal
          animationType={'none'}
          visible={props.loading}
          onRequestClose={() => { console.log('close modal') }}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={props.loading} />
            </View>
          </View>
        </Modal>
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
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }
});

//make this component available to the app
export default Loading;
