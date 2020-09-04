import React from 'react';
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CommonActions } from '@react-navigation/native';


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
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({
        hasPermission: status === 'granted',
      });
    })();
    AsyncStorage.getItem('DATA').then((theDATA)=>{
      if (theDATA){
        let data = JSON.parse(theDATA);
        this.setState({DATA:data});
      }
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
          let newItem = {barCode: barcode, itemName: "", price: ""};
          this.props.navigation.navigate("EditItem", {item: newItem});
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
    const { navigation } = this.props;
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
        // Check if this barcode have data
        let checkInclude = this.state.DATA.filter(item => (item.barCode == data));
        if (checkInclude.length == 0){
          this._alertNoData(data);
        }
        else{
          for(let i of this.state.DATA){
            if (data == i.barCode) {
              AsyncStorage.getItem('cart').then((datacart)=>{
                // Check if cart is empty
                if (datacart == null){
                  const cart  = [];
                  let newCartItem = Object.assign({}, i, {"quantity": 1});
                  cart.push(newCartItem);
                  AsyncStorage.setItem('cart',JSON.stringify(cart));
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'Home' },
                        { name: 'Cart' },
                      ],
                    })
                  );
                }
                // Check if this barcode not in cart
                else if (JSON.parse(datacart).filter(item => (item.barCode == data)).length == 0) {
                  const cart = JSON.parse(datacart);
                  let newCartItem = Object.assign({}, i, {"quantity": 1});
                  cart.push(newCartItem);
                  AsyncStorage.setItem('cart',JSON.stringify(cart));
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'Home' },
                        { name: 'Cart' },
                      ],
                    })
                  );
                }
                // This barcode already in cart
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


