import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './screen/AppNavigator';

class App extends React.Component {
  render(){
    return (
      <AppNavigator/>
    );
  }
}

export default App;
