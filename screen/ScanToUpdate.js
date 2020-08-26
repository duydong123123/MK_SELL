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

  _askUpdate = (item) => {
    Alert.alert(
      item.itemName,
      "Cập nhật thông tin cho sản phẩm này ?",
      [
        { text: "Cập nhật", onPress: () => {
          this.props.navigation.replace("EditItem", {item: item});
        } },
        { text: "Không", onPress: () => {
          this.setState({
            scanned: false
          });
        }}
      ],
      { cancelable: false }
    );
  };

  _alertNoData = (barcode) => {
    Alert.alert(
      "Sản phẩm mới!",
      `Mã vạch ${barcode} chưa có trong danh sách, cập nhật giá ngay?`,
      [
        { text: "Cập nhật", onPress: () => {
          let new_Item = {barCode: barcode, itemName: "", price: ""};
          this.props.navigation.replace("EditItem", {item: new_Item});
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
        let checkInclude = this.state.DATA.filter(item => (item.barCode == data));
        if (checkInclude.length == 0){
          this._alertNoData(data);
        }
        else{
          for(let i of this.state.DATA){
            if (data == i.barCode) {
              this._askUpdate(i);
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


