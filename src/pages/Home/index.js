import React, { Component } from 'react'
import { Alert, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { Header, Text1, Check } from '../../assets'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Firebase from '../../config/Firebase'
import CardEvent from '../../components/CardEvent'

export default class Home extends Component {

    constructor(props) {
    super(props);

    this.state = {
      events: {},
      eventssKey: [],
    };
    console.log(props);
    }

    componentDidMount() {
    this.getData();
    }

    getData = () => {
    Firebase.database()
      .ref('Event')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let eventItem = {...data};

        this.setState({
          events: eventItem,
          eventsKey: Object.keys(eventItem),
        });
      });
    };

    removeData = (id) => {
    Alert.alert(
      'Info',
      'Anda yakin akan menghapus Data Event ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Firebase.database()
              .ref('Event/' + id)
              .remove();
            this.getData();
            Alert.alert('Hapus', 'Sukses Hapus Data');
          },
        },
      ],
      {cancelable: false},
    );
  };
    
    render() {
    const {events, eventsKey} = this.state;
    return (
        <View style={styles.page}>
            <View>
                <ImageBackground source={Header} style={styles.header}>
                    <Image source={Text1} style={styles.text1} />
                    <TouchableOpacity 
                      onPress={() => this.props.navigation.navigate('Maps')}>
                      <Image source={Check} style={styles.check} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            <ScrollView style={styles.listEvent}>
                {Object.keys(events).length > 0 ? (
                    Object.keys(events).map((key) => (
                    <CardEvent
                        key={key}
                        eventItem={events[key]}
                        id={key}
                        {...this.props}
                        removeData={this.removeData}
                    />
                ))
            ) : (
                <Text>Daftar Kosong</Text>
            )}
            </ScrollView>

            <View style={styles.wrapperButton}>
                <TouchableOpacity 
                    style={styles.btnTambah} 
                    onPress={() => this.props.navigation.navigate('AddEvent')}>
                    <FontAwesomeIcon icon={faPlus} size={20} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>
    );
    }
}

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        width: windowsWidth,
        height: windowsHeight * 0.3,
        paddingHorizontal: 30,
        paddingTop: 25,
    },
    text1: {
      top: 0,
      margin: 20,
    },
    check: {
      top: 0,
      margin: 12,
    },
    wrapperButton: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: 160,
        margin: 10
    },
    btnTambah: {
        padding: 20,
        backgroundColor: 'orange',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
      paddingTop: 20,
      fontSize: 16,
      fontWeight: 'normal',
    },
    listEvent: {
      paddingHorizontal: 17,
      marginTop: 20,
    },
})
