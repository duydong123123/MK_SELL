import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, AsyncStorage, KeyboardAvoidingView, Platform } from 'react-native';
import BackgroundImg from '../img/bg.jpg';
import { TextInputMask } from 'react-native-masked-text';
import { showMessage, hideMessage } from "react-native-flash-message";

export default class EditItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      _barcode: this.props.route.params.item.barCode,
      _name: this.props.route.params.item.itemName,
      _price: this.props.route.params.item.price,
      DATA: [],
    };
  }

  pressDone = () => {
    let new_Item = {barCode: this.state._barcode, itemName: this.state._name, price: this.state._price, quantity: 1};
    let _strDATA = JSON.stringify(this.state.DATA);
    if (_strDATA.includes(JSON.stringify(new_Item)) == false){
      let updateDATA = [...this.state.DATA,new_Item];
      AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
      showMessage({
        message: "Đã thêm một sản phẩm mới!",
        type: "success",
      });
    }
    if (new_Item.barCode == this.props.route.params.item.barCode && new_Item.itemName == this.props.route.params.item.itemName && new_Item.price != this.props.route.params.item.price){
      let afterRemoveItem = this.state.DATA.filter((thisItem) => thisItem.barCode != this.props.route.params.item.barCode);
      let updateDATA = [...afterRemoveItem,new_Item];
      AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
      showMessage({
        message: `Thay đổi giá sản phẩm: ${this.props.route.params.item.itemName}`,
        type: "info",
      });
    }
    if (new_Item.barCode == this.props.route.params.item.barCode && new_Item.itemName != this.props.route.params.item.itemName && new_Item.price == this.props.route.params.item.price){
      let afterRemoveItem = this.state.DATA.filter((thisItem) => thisItem.barCode != this.props.route.params.item.barCode);
      let updateDATA = [...afterRemoveItem,new_Item];
      AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
      showMessage({
        message: `Thay đổi tên sản phẩm: ${this.props.route.params.item.itemName} -> ${new_Item.itemName}`,
        type: "info",
      });
    }
    if (new_Item.barCode == this.props.route.params.item.barCode && new_Item.itemName != this.props.route.params.item.itemName && new_Item.price != this.props.route.params.item.price){
      let afterRemoveItem = this.state.DATA.filter((thisItem) => thisItem.barCode != this.props.route.params.item.barCode);
      let updateDATA = [...afterRemoveItem,new_Item];
      AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
      showMessage({
        message: `Thay đổi tên và giá sản phẩm`,
        type: "info",
      });
    }
    if (new_Item.barCode != this.props.route.params.item.barCode && new_Item.itemName == this.props.route.params.item.itemName && new_Item.price == this.props.route.params.item.price){
      this.state.DATA.splice(this.props.route.params.index, 1);
      let updateDATA = [...this.state.DATA,new_Item];
      console.log(this.state.DATA);
      AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
      showMessage({
        message: `Thay đổi mã vạch sản phẩm: ${this.props.route.params.item.itemName}`,
        type: "info",
      });
    }
    if (new_Item.barCode != this.props.route.params.item.barCode && new_Item.itemName == this.props.route.params.item.itemName && new_Item.price != this.props.route.params.item.price){
      this.state.DATA.splice(this.props.route.params.index, 1);
      let updateDATA = [...this.state.DATA,new_Item];
      AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
      showMessage({
        message: `Thay đổi mã vạch và giá sản phẩm: ${this.props.route.params.item.itemName}`,
        type: "info",
      });
    }
    if (new_Item.barCode != this.props.route.params.item.barCode && new_Item.itemName != this.props.route.params.item.itemName && new_Item.price == this.props.route.params.item.price){
      this.state.DATA.splice(this.props.route.params.index, 1);
      let updateDATA = [...this.state.DATA,new_Item];
      AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
      showMessage({
        message: `Thay đổi mã vạch và tên sản phẩm: ${this.props.route.params.item.itemName}`,
        type: "info",
      });
    }
    this.props.navigation.reset({
      index: 1,
      routes: [{ name: 'Home' }, {name: "ProductList"}],
    });
  }

  componentDidMount() {
    AsyncStorage.getItem('DATA').then((theDATA)=>{
      const data = JSON.parse(theDATA);
      this.setState({DATA:data});
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
          <View>
            <View style={styles.content}>
              <Text style={styles.text}>Mã vạch:</Text>
              <TextInput
                style={styles.tInput}
                onChangeText={text => this.setState({_barcode: text})}
                defaultValue={this.state._barcode}
              />
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
                    _price: text,
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
});


