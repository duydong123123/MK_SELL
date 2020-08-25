import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';
import NumberFormat from 'react-number-format';
import BackgroundImg from '../img/bg.jpg';
import { TextInputMask } from 'react-native-masked-text';
import { CommonActions } from '@react-navigation/native';

export default class CheckOut extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      exchange: '-',
      pressOK: false,
    };
  }

  _getInput = () => {
    let getPrice = parseInt(this.state.value.replace(/[^0-9]/g, ''));
    this.setState({pressOK: true, exchange: getPrice - this.props.route.params.totalPrice});
  }
  render(){
    const { navigation, route } = this.props;
    const totalPrice = route.params.totalPrice;
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <View style={styles.container}>
					<View>
						<View style={styles.content}>
						 	<Text style={styles.text}>Số tiền nhận từ khách: </Text>
						 	<View style={styles.inputAndGet}>
								<View style={{flexDirection: 'row'}}>
									<TextInputMask
				            type={'money'}
				            options={{
		              		precision: 0,
				              separator: ' ',
				              delimiter: '.',
				              unit: '',
				              suffixUnit: ''
				            }}
				            value={this.state.value}
				            onChangeText={text => {
				              this.setState({
				                value: text
				              })
				            }}
				            style={styles.textInput}
				          />
				          <Text style={{marginLeft: 2, fontSize: 20, textAlignVertical: "center"}}>đ</Text>
								</View>
						   	<TouchableOpacity style={styles.buttonOK} onPress={()=>{this._getInput()}}>
						     	<Text style={{color: "white", fontSize: 20}}>OK</Text>
						   	</TouchableOpacity>
						 	</View>
						</View>
						<View style={styles.content}>
						 	<Text style={styles.text}>Tổng số tiền cần thanh toán:</Text>
						 	<NumberFormat
						    value={totalPrice}
						    displayType={'text'}
						    thousandSeparator='.'
						    decimalSeparator=","
						    suffix={' đ'}
						    renderText={formattedValue => <Text style ={styles.moneyRightBlack}>{formattedValue}</Text>}
						 	/>
						         	</View>
						         	<View style = {styles.phancach}></View>
						         	<View style={styles.exchangeContent}>
						 	<Text style={styles.text}>Tiền bù lại khách:</Text>
						 	<NumberFormat
						    value={this.state.exchange}
						    displayType={'text'}
						  	thousandSeparator='.'
						  	decimalSeparator=","
						    suffix={' đ'}
						    renderText={formattedValue => <Text style ={styles.moneyRightOrange}>{formattedValue}</Text>}
						 	/>
						</View>
					</View>
					{this.state.pressOK && (
						<View style={{justifyContent: 'center', alignItems: 'center'}}>
							<TouchableOpacity
								style={{backgroundColor: '#85CA55', borderRadius: 20}}
								onPress={()=>{
	                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'Home' },
                      ],
                    })
                  );
								}}
	            >
							<Text style={{ padding: 20, fontSize: 20, fontWeight: "bold", color: "white"}}>Hoàn thành</Text>
							</TouchableOpacity>
						</View>
					)}
      	</View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bgimg: {
    flex: 1,
    resizeMode: "cover",
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
  	marginTop: 20,
  	marginHorizontal: 10,
  },
  phancach: {
  	margin: 30,
  	backgroundColor: "#999",
  	height: 1,
  	width: "80%",
  },
  exchangeContent: {
  	marginTop: 20,
  	marginHorizontal: 10,
  },
  inputAndGet: {
  	marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
  	height: 50,
  	borderColor: 'gray',
  	borderWidth: 1,
  	width: "70%",
  	borderRadius: 5,
  	fontSize: 20,
  	paddingHorizontal: 5,
  	color: "#28A745",
  	fontWeight: "bold",
  },
  text: {
  	fontSize: 18,
  },
  moneyRightBlack: {
  	fontSize: 20,
    fontWeight: "bold",
    textAlign: 'right',
  },
  moneyRightOrange: {
  	color: "#ee4d2d",
  	fontSize: 20,
    fontWeight: "bold",
    textAlign: 'right',
  },
  buttonOK: {
  	width: "25%",
  	justifyContent: "center",
  	alignItems: "center",
  	backgroundColor: "#2196F3",
  	borderRadius: 5,
  },
});


