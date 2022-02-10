import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import { InputData } from '../../components';
import Firebase from '../../config/Firebase';
import { navigation } from '@react-navigation/native'


export default class AddEvent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      deskripsi: '',
      koordinat: {
        latitude: null,
        longitude: null,
      },
    };
    console.log(props);
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    })
  }

  onSubmit = () => {
    if(this.state.nama && this.state.deskripsi && this.state.koordinat) {
      
      const eventReferensi = Firebase.database().ref('Event');
      const event = {
        nama: this.state.nama,
        deskripsi: this.state.deskripsi,
        koordinat: this.state.koordinat,
      }

      eventReferensi
        .push(event)
        .then((data) => {
          Alert.alert('Sukses', 'Event Tersimpan');
          this.props.navigation.replace('MainApp');
        })
        .catch((error) => {
          console.log("Error : ", error);
        })


    }else {
      Alert.alert('Error', 'Nama, Deskripsi, dan Koordinat wajib diisi');
    }
    
  }
  // componentDidMount() {
  //   const {lat, long} = this.props.route.params;
  //   if (lat !== null) {this.setState({koordinat: {latitude:lat, longitude:long}});}
  // }

  render() {
    return (
      <View style={styles.pages}>
        <InputData
          label="Nama Kejadian"
          placeholder="Masukkan Nama Kejadian"
          onChangeText={this.onChangeText}
          value={this.state.nama}
          namaState="nama"
        />
        <InputData
          label="Deskripsi Kejadian"
          placeholder="Masukkan Deskripsi Kejadian"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={this.state.deskripsi}
          namaState="deskripsi"
        />
        <TouchableOpacity style={styles.tombol} onPress={() => this.props.navigation.navigate('MapLocation')}>
          <Text style={styles.textTombol}>Koordinat</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  tombol: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
