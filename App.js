import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './screen/AppNavigator';
import FlashMessage from "react-native-flash-message";

class App extends React.Component {
  render(){
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator/>
        <FlashMessage position="top" />
      </View>
    );
  }
}

export default App;
