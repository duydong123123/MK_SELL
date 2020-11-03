import React from 'react';
import { View } from 'react-native';
import AppNavigator from './AppNavigator';
import FlashMessage from "react-native-flash-message";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
    };
  }

  componentDidMount() {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({
        hasPermission: status === 'granted',
      });
    })();
  }

  render(){
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator/>
        <FlashMessage position="top"/>
      </View>
    );
  }
}

