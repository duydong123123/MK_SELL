import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppScan from './AppScan';
import HomeScreen from './Home';
import ScanToUpdate from './ScanToUpdate';
import Cart from './Cart';
import ProductList from './ProductList';
import CheckOut from './CheckOut';
import EditItem from './EditItem';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{title: "Trang chủ", headerShown: true, headerTitleStyle: {textAlign:"center", flex:1},}}/>
          <Stack.Screen name="AppScan" component={AppScan} options={{title: "Quét mã"}}/>
          <Stack.Screen name="ProductList" component={ProductList} options={{title: "Thêm/Cập nhật giá"}}/>
          <Stack.Screen name="EditItem" component={EditItem} options={{title: "Cập nhật"}}/>
          <Stack.Screen name="ScanToUpdate" component={ScanToUpdate} options={{title: "Quét mã"}}/>
          <Stack.Screen name="Cart" component={Cart} options={{title: "Giỏ hàng"}}/>
          <Stack.Screen name="CheckOut" component={CheckOut} options={{title: "Thanh toán"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
