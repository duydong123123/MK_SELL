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

// class ScanMore extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       hasPermission: null,
//       setHasPermission: null,
//       products: props.route.params.products,
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
//     console.log(this.props);
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
//               if (data == i.barCode && !this.state.products.include(i)) {
//                 navigation.goBack({i});
//                 route.params.onAddItem;
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


// export default ScanMore;



import React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo-barcode-scanner';

const DATA = [
{
  barCode: ']C1AMA00109KCO00W001000',
  itemName: 'First Item',
  price: 12000,
  quantity: 1
},
{
  barCode: '5901234123457',
  itemName: 'Second Item',
  price: 2000,
  quantity: 1
},
{
  barCode: '5012345678900',
  itemName: 'Third Item',
  price: 20000,
  quantity: 1
},
];

class ScanMore extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      setHasPermission: null,
      numberCompare: 0,
      scanned: false,
    };
  }
  componentDidMount() {
    async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPermission: status === 'granted',
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
          this.props.navigation.navigate("SetPrice");
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
                // this.setState({
                //   scanned: true
                //  });
                // () => this.setScannedTrue;
                const cart  = [];
                cart.push(i);
                AsyncStorage.setItem('cart',JSON.stringify(cart));
                // navigation.goBack();

                // navigation.dispatch(state => {
                //   // Remove the home route from the stack
                //   const routes = state.routes.filter(r => r.name !== 'Cart');

                //   return CommonActions.reset({
                //     ...state,
                //     routes,
                //     index: routes.length - 1,
                //   });
                // });

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
                navigation.navigate("Cart");

              }
              else if (datacart.includes(data) == false) {
                // We have data!!
                // this.setState({
                //   scanned: true
                //  });
                // () => this.setScannedTrue;
                const cart = JSON.parse(datacart);
                cart.push(i);
                AsyncStorage.setItem('cart',JSON.stringify(cart));
                // navigation.goBack();

                // navigation.dispatch(state => {
                //   // Remove the home route from the stack
                //   const routes = state.routes.filter(r => r.name !== 'Cart');
                //   console.log(routes);
                //   return CommonActions.reset({
                //     ...state,
                //     routes,
                //     index: routes.length - 1,
                //   });
                // });

                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
                navigation.navigate("Cart");

              }
              else {
                // this.setState({
                //   scanned: true
                //  });
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

export default ScanMore;

