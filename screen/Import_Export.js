import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native';
import BackgroundImg from '../img/bg.jpg';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import { showMessage } from "react-native-flash-message";

export default class Import_Export extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      DATA: []
    };
  }

  importDATA = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      DocumentPicker.getDocumentAsync().then(prom=>{
        let fileUri = prom.uri;
        FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 }).then(text=>{
          AsyncStorage.setItem("DATA", text);
        });
      });
    }
    showMessage({
      message: "Nhập dữ liệu thành công!",
      type: "success",
    });
  }

  exportDATA = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let fileUri = FileSystem.documentDirectory + "DATA.txt";
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(this.state.DATA), { encoding: FileSystem.EncodingType.UTF8 });
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("MK_SELL", asset, false);
    }
    showMessage({
      message: "Xuất dữ liệu ra MK_SELL/DATA.txt...",
      type: "success",
    });
  }

  componentDidMount() {
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

  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.item} onPress={()=>this.importDATA()}>
            <Text style={styles.text}>Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={this.exportDATA}>
            <Text style={styles.text}>Xuất</Text>
          </TouchableOpacity>
        </View>
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
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 50,
  },
  item: {
    alignItems: "center",
    backgroundColor: '#0099ff',
    padding: 10,
    marginVertical: 8,
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
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
  }
});


