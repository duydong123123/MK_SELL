import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, FlatList, AsyncStorage, ImageBackground } from 'react-native';
import ListItem from './ListItem';
import ScanMoreIcon from '../icon/view_add.png';
import NumberFormat from 'react-number-format';
import BackgroundImg from '../img/bg.jpg';


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // products: [...props.route.params.products, props.route.params.i],
      // products: [props.route.params.i],
      products: [],
      number: 1,
    };
  }

  onSubtract = (item, index) => {
    const products = [...this.state.products];
    products[index].quantity -= 1;
    if (products[index].quantity == 0){
      products.splice(index, 1);
    }
    this.setState({ products });
  };

  onAdd = (item, index) => {
    const products = [...this.state.products];
    products[index].quantity += 1;
    this.setState({ products });
  };

  componentDidMount(){
    AsyncStorage.getItem('cart').then((cart)=>{
      const products = JSON.parse(cart);
      this.setState({products:products});
    })
    .catch((err)=>{
      console.log(err);
    });
  }


  render(){
    const { navigation } = this.props;
    let totalPrice = 0;
    this.state.products.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <View style={{flex:1, justifyContent:"space-between"}}>
          <FlatList style={{marginVertical: 10}}
            data={this.state.products.filter(({ quantity }) => quantity)}
            renderItem={({item, index}) => <ListItem
                                             item = {item}
                                             onSubtract={() => this.onSubtract(item, index)}
                                             onAdd={() => this.onAdd(item, index)}
                                            />
                        }
            keyExtractor={item => item.barCode}
          />
          <View style = {styles.bot}>
            <View style={styles.left_bot}>
              <Text style ={{color: 'white', fontSize: 16, textAlignVertical: "center", textAlign: "center", fontWeight: 'bold'}}>Tổng cộng:</Text>
              <NumberFormat
                value={totalPrice}
                displayType={'text'}
                thousandSeparator='.'
                decimalSeparator=","
                suffix={' đ'}
                renderText={formattedValue => <Text style ={styles.ttPriceText}>{formattedValue}</Text>}
              />
            </View>
            <TouchableOpacity onPress={() => {AsyncStorage.setItem('cart',JSON.stringify(this.state.products)); navigation.navigate('CheckOut', {totalPrice: totalPrice})}} >
              <View style={styles.mid_bot}>
                <Text style ={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Thanh toán</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {AsyncStorage.setItem('cart',JSON.stringify(this.state.products)); navigation.navigate('AppScan')}} >
              <View style={styles.right_bot}>
                <Image style = {{width: 40, height: 40}} source = {ScanMoreIcon}/>
                <Text style ={{color: 'white', fontSize: 18}}>Mua thêm</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  ttPriceText: {
    color: 'white',
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: 'bold'
  },
  bot: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left_bot: {
    backgroundColor: '#FC5B31',
    padding: 15,
    borderTopRightRadius: 22,
    height: '100%',
  },
  mid_bot: {
    marginHorizontal: 2,
    flex: 1,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor: '#44cf69',
    padding: 5,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  right_bot: {
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:"#0194FE",
    padding: 15,
    borderTopLeftRadius: 22
  },
  bgimg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Cart;
