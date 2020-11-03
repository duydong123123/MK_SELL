import React from 'react';
import { View, StyleSheet, Alert, Dimensions, Animated, Text, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CommonActions } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import NoBarcodeListItem from '../components/NoBarcodeListItem';
import { log } from 'react-native-reanimated';


const windowHeight = Dimensions.get('window').height;
const heightOfPopup = 4/5*windowHeight;

export default class AppScan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      numberCompare: 0,
      scanned: false,
      DATA: [],
      showItemNoBarcode: false,
      marginAnim: new Animated.Value(-heightOfPopup),
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
          let newItem = {id: new Date().getTime(), barCode: barcode, itemName: "", price: ""};
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

  showSelectNoBarcode = () => {    
    this.setState({showItemNoBarcode: true, scanned: true});
    this.state.marginAnim.setValue(-heightOfPopup);
    Animated.spring(this.state.marginAnim, {
      toValue: 0,
    }).start();
  }

  hideSelectNoBarcode = () => {
    this.setState({showItemNoBarcode: false, scanned: false});
    this.state.marginAnim.setValue(0);
    Animated.spring(this.state.marginAnim, {
      toValue: -heightOfPopup,
    }).start();
  }

  render(){
    const { navigation } = this.props;
    const noBarcodeDATA = this.state.DATA.filter(({ barCode }) => barCode == "");
    // Sap xep ten noBarcodeDATA a-z
    noBarcodeDATA.sort(function(a, b) {
      var nameA = a.itemName.toUpperCase(); // bỏ qua hoa thường
      var nameB = b.itemName.toUpperCase(); // bỏ qua hoa thường
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // name trùng nhau
      return 0;
    });
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={{flex: 1}} onPress={this.hideSelectNoBarcode}>
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
        </TouchableOpacity> 

        <TouchableOpacity style={styles.btnShow} onPress={this.showSelectNoBarcode}>
          <Entypo name="chevron-thin-up" size={24} color="black" />
          <Text style={styles.textBtn}>Sản phẩm không có mã vạch</Text>
        </TouchableOpacity> 


        {/* View for select no barcode item */}
        <Animated.View style={[styles.container, {marginBottom: this.state.marginAnim}]}>
          <FlatList style={{marginVertical: 10}}
            numColumns={2}
            data={noBarcodeDATA}
            renderItem={({item, index}) => <NoBarcodeListItem
                                             item = {item}
                                             addNoBarcodeItemToCart = {()=>{
                                              AsyncStorage.getItem('cart').then((datacart)=>{
                                                // Check if cart is empty
                                                if (datacart == null){
                                                  const cart  = [];
                                                  let newCartItem = Object.assign({}, noBarcodeDATA[index], {"quantity": 1});
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
                                                else if (JSON.parse(datacart).filter(item => (item.id == noBarcodeDATA[index].id)).length == 0) {
                                                  const cart = JSON.parse(datacart);
                                                  let newCartItem = Object.assign({}, noBarcodeDATA[index], {"quantity": 1});
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
                                                  this._alertSame(noBarcodeDATA[index].itemName);
                                                }
                                              })
                                              .catch((err)=>{
                                                console.log(err);
                                              })
                
  
                                             }
                                             }
                                            />
                        }
            keyExtractor={item => item.name}
          />
        </Animated.View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    height: heightOfPopup,
    width: "100%",
    alignItems: "center", 
    position: "absolute", 
    bottom: 0, 
    right: 0, 
    zIndex: 3, 
    elevation: 3,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,  
  },
  btnShow: {
    backgroundColor: '#F5F5F5',
    paddingBottom: 20,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  textBtn: {
    fontSize: 18,
    color: "#ee4d2d"
  }

});


