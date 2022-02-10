import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Firebase from '../../config/Firebase';

export default class DetailEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
    };
  }

  componentDidMount() {
    Firebase.database()
      .ref('Event/'+ this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let eventItem = {...data};

        this.setState({
          event: eventItem,
        });
      });
  }

  render() {
    const {event} = this.state;
    return (
      <View style={styles.pages}>
        <Text>Nama Kejadian : </Text>
        <Text style={styles.text}>{event.nama} </Text>

        <Text>Deskripsi Kejadian : </Text>
        <Text style={styles.text}>{event.deskripsi} </Text>

        <Text>Koordinat : </Text>
        <Text style={styles.text}>{event.koordinat} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    pages : {
        margin: 30,
        padding: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10   
    }
});