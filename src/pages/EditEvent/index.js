import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { InputData } from '../../components';
import Firebase from '../../config/Firebase'

export default class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      deskripsi: '',
      koordinat: '',
    };
  }

  componentDidMount() {
    Firebase.database()
      .ref('Event/'+ this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let eventItem = {...data};

        this.setState({
          nama: eventItem.nama,
          deskripsi: eventItem.deskripsi,
          koordinat: eventItem.koordinat
        });
      });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if(this.state.nama && this.state.deskripsi && this.state.koordinat) {
      
      const eventReferensi = Firebase.database().ref('Event/'+ this.props.route.params.id);

      const event = {
        nama: this.state.nama,
        deskripsi: this.state.deskripsi,
        koordinat: this.state.koordinat
      }

      eventReferensi
        .update(event)
        .then((data) => {
          Alert.alert('Sukses', 'Event Terupdate');
          this.props.navigation.replace('MainApp');
        })
        .catch((error) => {
          console.log("Error : ", error);
        })


    }else {
      Alert.alert('Error', 'Nama, Deskripsi, dan Koordinat wajib diisi');
    }
    
  };

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

        <InputData
          label="Koordinat"
          placeholder="LongPress pada Peta"
          onChangeText={this.onChangeText}
          value={this.state.koordinat}
          namaState="koordinat"
        />

        <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
          <Text style={styles.textTombol}>SUBMIT</Text>
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