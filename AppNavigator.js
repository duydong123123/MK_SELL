import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppScan from './screen/AppScan';
import HomeScreen from './screen/Home';
import ScanToUpdate from './screen/ScanToUpdate';
import Cart from './screen/Cart';
import ProductList from './screen/ProductList';
import CheckOut from './screen/CheckOut';
import EditItem from './screen/EditItem';
import Import_Export from './screen/Import_Export';

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
          <Stack.Screen name="Import_Export" component={Import_Export} options={{title: "Nhập/Xuất dữ liệu"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
