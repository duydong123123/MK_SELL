import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppScan from './AppScan';
import ScanMore from './ScanMore';
import HomeScreen from './Home';
import Update from './Update';
import Cart from './Cart';
import SetPrice from './SetPrice';
import CheckOut from './CheckOut';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{title: "Trang chủ", headerShown: true, headerTitleStyle: {textAlign:"center", flex:1},}}/>
          <Stack.Screen name="AppScan" component={AppScan} options={{title: "Quét mã"}}/>
          <Stack.Screen name="ScanMore" component={ScanMore} options={{title: "Thêm"}}/>
          <Stack.Screen name="Update" component={Update} options={{title: "Thêm/Cập nhật giá"}}/>
          <Stack.Screen name="Cart" component={Cart} options={{title: "Giỏ hàng"}}/>
          <Stack.Screen name="SetPrice" component={SetPrice} options={{title: "Đặt giá cho sản phẩm"}}/>
          <Stack.Screen name="CheckOut" component={CheckOut} options={{title: "Thanh toán"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
