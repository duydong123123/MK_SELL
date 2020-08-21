// import React from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner, Permissions } from 'expo-barcode-scanner';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const DATA = [
//   {
//     barCode: '08934804025773',
//     itemName: 'First Item',
//     price: 12000,
//     quantity: 1
//   },
//   {
//     barCode: '5901234123457',
//     itemName: 'Second Item',
//     price: 2000,
//     quantity: 1
//   },
//   {
//     barCode: '5012345678900',
//     itemName: 'Third Item',
//     price: 20000,
//     quantity: 1
//   },
// ];

// class AppScan extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       hasPermission: null,
//       setHasPermission: null,
//       products: props.route.params.products,
//       scanned: props.route.params.scanned,
//       setScanned: props.route.params.setScanned,
//     };
//   }

//   // _updateCart = (item) => {
//   //   // this.setState({products: [...this.state.products,item]});
//   //   this.setState({this.state.products.concat(item)});
//   //   console.log(item);
//   // }

//   componentDidMount() {
//     async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({
//       hasCameraPermission: status === 'granted',
//     });
//     };
//   }

//   // _updateScanState(key){
//   //   this.setState({

//   //   });
//   // }

//   render(){
//     const { navigation, route } = this.props;
//     // console.log(this.state.setScanned);
//     return (
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'column',
//           justifyContent: 'flex-end',
//         }}>
//         <BarCodeScanner
//           onBarCodeScanned={this.state.scanned ? undefined : ({ data }) => {
//             for(let i of DATA){
//               if (data == i.barCode) {
//                 this.setState({
//                   setScanned: true,
//                   scanned: true,
//                  });
//                 // this._updateCart(i);

//                 this.props.onAddItem;
//                 navigation.navigate("Cart", {i});
//               }
//             }
//           }}
//           style={StyleSheet.absoluteFillObject}
//         >
//         </BarCodeScanner>
//       </View>
//     );
//   }
// }


// const Stack = createStackNavigator();


// export default AppScan;






// import React from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner, Permissions } from 'expo-barcode-scanner';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const DATA = [
//   {
//     barCode: '08934804025773',
//     itemName: 'First Item',
//     price: 12000,
//     quantity: 1
//   },
//   {
//     barCode: '5901234123457',
//     itemName: 'Second Item',
//     price: 2000,
//     quantity: 1
//   },
//   {
//     barCode: '5012345678900',
//     itemName: 'Third Item',
//     price: 20000,
//     quantity: 1
//   },
// ];

// class AppScan extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       hasPermission: null,
//       setHasPermission: null,
//       products: [],
//     };
//   }

//   componentDidMount() {
//     async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({
//       hasCameraPermission: status === 'granted',
//     });
//     };
//   }

//   render(){
//     const { navigation, route } = this.props;
//     return (
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'column',
//           justifyContent: 'flex-end',
//         }}>
//         <BarCodeScanner
//           onBarCodeScanned={({ data }) => {
//             for(let i of DATA){
//               if (data == i.barCode) {
//                 navigation.navigate("Cart", {products: this.state.products, i});
//               }
//             }
//           }}
//           style={StyleSheet.absoluteFillObject}
//         >
//         </BarCodeScanner>
//       </View>
//     );
//   }
// }


// const Stack = createStackNavigator();


// export default AppScan;




import React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo-barcode-scanner';

const DATA = [
{
  barCode: '640509040147',
  itemName: 'First Item',
  price: 12000,
  quantity: 1
},
{
  barCode: '5901234123457',
  itemName: 'Second Item',
  price: 200000,
  quantity: 1
},
{
  barCode: '5012345678900',
  itemName: 'Third Item',
  price: 20000,
  quantity: 1
},
{
  barCode: '725272730706',
  itemName: 'Fourth Item',
  price: 40000,
  quantity: 1
},
{
  barCode: '3033710076789',
  itemName: 'Fifth Item',
  price: 50000,
  quantity: 1
},

];

export default class AppScan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      numberCompare: 0,
      scanned: false,
    };
  }

  componentDidMount() {
    async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasPermission: status === 'granted',
      });
    };
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
      `Barcode ${barcode} chưa có trong danh sách, cập nhật giá ngay?`,
      [
        { text: "Cập nhật", onPress: () => {
          this.props.navigation.replace("SetPrice");
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
        let _strDATA = JSON.stringify(DATA);
        if (_strDATA.includes(data) == false){
          this._alertNoData(data);
        }
        for(let i of DATA){
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
      }}
      style={StyleSheet.absoluteFillObject}
      >
      </BarCodeScanner>
      </View>
      );
  }
}


