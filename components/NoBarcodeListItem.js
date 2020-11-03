import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import NumberFormat from 'react-number-format';

const windowWidth = Dimensions.get('window').width;

export default class ListItem extends React.Component {
  render(){
    const {item} = this.props;
    return (
      <TouchableOpacity style={styles.item} onPress={this.props.addNoBarcodeItemToCart}>
        <Text style={styles.textName}>{item.itemName}</Text>
        <NumberFormat
          value={item.price}
          displayType={'text'}
          thousandSeparator='.'
          decimalSeparator=","
          suffix={' đ'}
          renderText={formattedValue => <Text style ={styles.textPrice}>{formattedValue}</Text>}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: (windowWidth-30)/2,
    height: 120,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
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
  textName: {
    fontSize: 18,
  },
  textPrice: {
    paddingTop: 8,
    alignSelf: "flex-end",
    fontSize: 14,
    color: "#ee4d2d",
  }
});

