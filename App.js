import React from 'react';
import { View } from 'react-native';
import AppNavigator from './screen/AppNavigator';
import FlashMessage from "react-native-flash-message";

class App extends React.Component {
  render(){
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator/>
        <FlashMessage position="top"/>
      </View>
    );
  }
}

export default App;
