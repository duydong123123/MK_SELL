import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, AsyncStorage, ImageBackground } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanImg from '../icon/scan.png';
import UpdateImg from '../icon/update.png';
import BackgroundImg from '../img/bg.jpg';

// products=[];

class HomeScreen extends React.Component{
  // componentDidMount() {
  //   AsyncStorage.setItem('cart', null);
  // }

  reset = async () => {
    try {
      await AsyncStorage.setItem('cart', '');
    } catch (e) {
      console.error('Failed reset')
    }
  }

  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <View style={styles.container}>
            <TouchableOpacity style = {styles.btn} onPress={() => {this.reset(); navigation.navigate('AppScan')}}>
                <Image style = {{width: 64, height: 64}} source = {ScanImg} />
                <Text style = {{fontSize: 20, color: '#ff7f50', fontWeight: "bold"}}>Quét mã</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.btn} onPress={() => navigation.navigate('Update')}>
                <Image style = {{width: 64, height: 64}} source = {UpdateImg} />
                <Text style = {{fontSize: 20, color: '#ff7f50', fontWeight: "bold"}}>Thêm/Cập nhật giá</Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  btn: {
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderRadius: 4,
    shadowColor: "#D3D3CF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  bgimg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});



export default HomeScreen;
