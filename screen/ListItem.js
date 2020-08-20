import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlusIcon from '../icon/plus.png';
import MinusIcon from '../icon/minus.png';
import NumberFormat from 'react-number-format';


class ListItem extends React.Component {
  render(){
    const {item} = this.props;
    return (
      <View style={styles.item}>
        <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
          <View>
            <Text style={styles.title}>{item.itemName}</Text>
{/*            <Text style={styles.sub}>Đơn giá: {item.price}</Text>
            <Text style={{fontWeight: "bold"}}>Thành tiền: {item.price * item.quantity}</Text>*/}
            <NumberFormat
              value={item.price}
              displayType={'text'}
              thousandSeparator='.'
              decimalSeparator=","
              suffix={' đ'}
              renderText={formattedValue => <Text style ={styles.sub}>Đơn giá: {formattedValue}</Text>}
            />
            <NumberFormat
              value={item.price * item.quantity}
              displayType={'text'}
              thousandSeparator='.'
              decimalSeparator=","
              suffix={' đ'}
              renderText={formattedValue => <Text style ={{fontWeight: 'bold'}}>Thành tiền: {formattedValue}</Text>}
            />

          </View>
          <View style = {{flexDirection: "row", alignItems: 'center', justifyContent: "space-between", height: "100%"}}>
            <TouchableOpacity style= {{justifyContent: "center"}} onPress = {this.props.onSubtract}>
              <View style= {{paddingLeft:8}}><Image style = {{width: 32, height: 32}} source = {MinusIcon}/></View>
            </TouchableOpacity>
            <View style= {{width: 22, justifyContent: "center"}}>
              <Text style= {{textAlign: 'center'}}>{item.quantity}</Text>
            </View>
            <TouchableOpacity style= {{justifyContent: "center"}} onPress = {this.props.onAdd}>
              <View style= {{paddingright:8}}><Image style = {{width: 32, height: 32}} source = {PlusIcon}/></View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 4,
    shadowColor: "#D3D3CF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 20,
  },
  sub:{
    fontSize: 14
  }
});


export default ListItem;
