import React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';


export default class AppScan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      numberCompare: 0,
      scanned: false,
      DATA: []
    };
  }

  componentDidMount() {
    async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasPermission: status === 'granted',
      });
    };
    AsyncStorage.getItem('DATA').then((theDATA)=>{
      const data = JSON.parse(theDATA);
      this.setState({DATA:data});
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  _alertSame = (name) => {
    Alert.alert(
      name,
      "Sản phẩm này đã có trong giỏ hàng!",
      [
        { text: "OK", onPress: () => {
            this.setState({
              scanned: false
            });
        } }
      ],
      { cancelable: false }
    );
  };

  _alertNoData = (barcode) => {
    Alert.alert(
      "Ố ồ, cái này lạ lắm à nghen!",
      `Mã vạch ${barcode} chưa có trong danh sách, cập nhật giá ngay?`,
      [
        { text: "Cập nhật", onPress: () => {
          let new_Item = {barCode: barcode, itemName: "", price: ""};
          this.props.navigation.navigate("EditItem", {item: new_Item});
        } },
        { text: "Không", onPress: () => {
          this.setState({
            scanned: false
          });
        }}
      ],
      { cancelable: false }
    );
  }
  render(){

    const { navigation, route } = this.props;
    return (
      <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
      onBarCodeScanned={this.state.scanned ? undefined : ({ data }) => {
        this.setState({
          scanned: true
        });
        let _strDATA = JSON.stringify(this.state.DATA);
        if (_strDATA.includes(data) == false){
          this._alertNoData(data);
        }
        else{
          for(let i of this.state.DATA){
            if (data == i.barCode) {
              AsyncStorage.getItem('cart').then((datacart)=>{
                if (datacart == null){
                  const cart  = [];
                  cart.push(i);
                  AsyncStorage.setItem('cart',JSON.stringify(cart));
                  navigation.reset({
                      index: 0,
                      routes: [{ name: 'Home' }],
                  });
                  navigation.navigate("Cart");
                }
                else if (datacart.includes(data) == false) {
                  const cart = JSON.parse(datacart);
                  cart.push(i);
                  AsyncStorage.setItem('cart',JSON.stringify(cart));
                  navigation.reset({
                      index: 0,
                      routes: [{ name: 'Home' }],
                  });
                  navigation.navigate("Cart");
                }
                else {
                  this._alertSame(i.itemName);
                }
              })
              .catch((err)=>{
                console.log(err);
              })
            }
          }
        }
      }}
      style={StyleSheet.absoluteFillObject}
      >
      </BarCodeScanner>
      </View>
      );
  }
}


