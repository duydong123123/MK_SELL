import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import BackgroundImg from '../img/bg.jpg';

export default class New_Screen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bgimg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});


