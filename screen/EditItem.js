import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, AsyncStorage, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import BackgroundImg from '../img/bg.jpg';
import { TextInputMask } from 'react-native-masked-text';
import { showMessage } from "react-native-flash-message";
import { CommonActions } from '@react-navigation/native';

export default class EditItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.route.params.item.id,
      _barcode: this.props.route.params.item.barCode,
      _name: this.props.route.params.item.itemName,
      _price: this.props.route.params.item.price,
      DATA: [],
    };
  }

  pressDone = () => {
    let new_Item = {id: this.state._id, barCode: this.state._barcode, itemName: this.state._name, price: this.state._price};
    if (new_Item.price == "" || new_Item.itemName == ""){
      Alert.alert(
        "Chưa nhập đủ thông tin",
        "Vui lòng điền đầy đủ thông tin sản phẩm.",
        [
          { text: "OK", onPress: () => {} }
        ],
        { cancelable: false }
      );
    }
    else{
      if (this.state.DATA == null){
        let updateDATA = [new_Item];
        AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
        showMessage({
          message: "Đã thêm một sản phẩm mới!",
          type: "success",
        });
      }
      else {
        // let _strDATA = JSON.stringify(this.state.DATA);
        // if (_strDATA.includes(JSON.stringify(new_Item.id)) == false){
        if (this.state.DATA.filter(item => (item.id==new_Item.id)).length == 0){
          let updateDATA = [...this.state.DATA,new_Item];
          AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
          showMessage({
            message: "Đã thêm một sản phẩm mới!",
            type: "success",
          });
        }
        else{
          if (new_Item.itemName == this.props.route.params.item.itemName && new_Item.price != this.props.route.params.item.price){
            let afterRemoveItem = this.state.DATA.filter((thisItem) => thisItem.id != this.props.route.params.item.id);
            let updateDATA = [...afterRemoveItem,new_Item];
            AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
            showMessage({
              message: `Thay đổi giá sản phẩm: ${this.props.route.params.item.itemName}`,
              type: "info",
            });
          }
          if (new_Item.itemName != this.props.route.params.item.itemName && new_Item.price == this.props.route.params.item.price){
            let afterRemoveItem = this.state.DATA.filter((thisItem) => thisItem.id != this.props.route.params.item.id);
            let updateDATA = [...afterRemoveItem,new_Item];
            AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
            showMessage({
              message: `Thay đổi tên sản phẩm: ${this.props.route.params.item.itemName} -> ${new_Item.itemName}`,
              type: "info",
            });
          }
          if (new_Item.itemName != this.props.route.params.item.itemName && new_Item.price != this.props.route.params.item.price){
            let afterRemoveItem = this.state.DATA.filter((thisItem) => thisItem.id != this.props.route.params.item.id);
            let updateDATA = [...afterRemoveItem,new_Item];
            AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
            showMessage({
              message: `Thay đổi tên và giá sản phẩm`,
              type: "info",
            });
          }
        }
      }
      let checkProductList = this.props.navigation.dangerouslyGetState().routes.filter(item => (item.name == "ProductList"));
      if(checkProductList.length){
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Home' },
              { name: 'ProductList' },
            ],
          })
        );
      }
      else{
        AsyncStorage.getItem('cart').then((datacart)=>{          
          // Check if cart is empty
          if (datacart == null){
            const cart  = [];
            let newCartItem = Object.assign({}, new_Item, {"quantity": 1});
            cart.push(newCartItem);
            AsyncStorage.setItem('cart',JSON.stringify(cart));
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'Home' },
                  { name: 'Cart' },
                ],
              })
            );        
          }          
          else{
            // Cart not empty
            const cart = JSON.parse(datacart);
            let newCartItem = Object.assign({}, new_Item, {"quantity": 1});
            cart.push(newCartItem);
            AsyncStorage.setItem('cart',JSON.stringify(cart));
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'Home' },
                  { name: 'Cart' },
                ],
              })
            );
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('DATA').then((theDATA)=>{
      if (theDATA){
        const data = JSON.parse(theDATA);
        this.setState({DATA:data});
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render(){
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
          <View>
            <View style={styles.contentCenter}>
              <Text style={styles.text}>Mã vạch:</Text>
              <Text style={styles.tBarcode}>{this.state._barcode}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>Tên sản phẩm:</Text>
              <TextInput
                style={styles.tInput}
                onChangeText={text => this.setState({_name: text})}
                defaultValue={this.state._name}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>Giá:</Text>
              <TextInputMask
                type={'money'}
                options={{
                  precision: 0,
                  separator: ' ',
                  delimiter: '.',
                  unit: '',
                  suffixUnit: ''
                }}
                value={this.state._price}
                onChangeText={text => {
                  this.setState({
                    _price: parseInt(text.replace(/[^0-9]/g, '')),
                  });
                }}
                style={styles.tInput}
              />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{backgroundColor: '#85CA55', borderRadius: 20}}
              onPress={()=>{this.pressDone()}}>
            <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold", color: "white"}}>Hoàn thành</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  content: {
    margin: 8,
  },
    contentCenter: {
    margin: 8,
    alignItems: "center",
  },
  text:{
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tInput: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    // backgroundColor: '#f3ffc6',
    borderRadius: 5,
    // color: "#1c5253",
    fontSize: 17,
    padding: 5,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  tBarcode: {
    fontSize: 20,
    fontWeight: "bold",
  },
});


