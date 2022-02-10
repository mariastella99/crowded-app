import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button, Alert, } from 'react-native';
import { navigation } from '@react-navigation/native'
import Firebase from '../../config/Firebase'
import * as geolib from 'geolib'
 
export default class MapLocation extends React.Component {
  //set properties
  constructor(props) {
    super(props);
    
     this.state = {
      region: 
      {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0
      },
      events: {},
      eventsKey: []
    };
    
    this.handleOnLongPress= this.handleOnLongPress.bind(this);
    console.log(props);
  }

  watchID: ?number = null;

  startMonitoring = async () => {
    const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'CROWDED Location Permission',
        message: 'CROWDED needs access to your location ' + 'to keep you safe.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
 
    //if granted, then:
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
      //getcurrentposition and set it to location prop
      Geolocation.getCurrentPosition((position) => {
        this.setState(
          {region: {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: 0.0921,
                longitudeDelta: 0.0421,
            }
          }
        );
        },
        (error) => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true},
      );

      const dis = 0;
      this.watchID = Geolocation.watchPosition(
        (newPosition) => {
            const array = Object.values(this.state.events);
            if(array) {
                for (var index=0; index<array.length; ++index)
                {
                    console.log('latitude', parseFloat(JSON.parse(array[index].koordinat).latitude));
                    var dis = geolib.getDistance(
                        {latitude: parseFloat(newPosition.coords.latitude), longitude: parseFloat(newPosition.coords.longitude)},
                        {latitude: parseFloat(JSON.parse(array[index].koordinat).latitude), 
                         longitude: parseFloat(JSON.parse(array[index].koordinat).longitude)}
                    );
                    
                    if (dis<=100)
                    {
                        Alert.alert("You're too close!", `Beware! You're ${dis} meters away from ${array[index].nama}`);
                    }
                }
            }
        },
        (error) => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, distanceFilter: 10},
      );
    }
    
    //if denied, ask again
    else {
      Alert.alert(
        'Warning!',
        'Please allow access to your location to use CROWDED',
        {
          text: "OK",
          onPress: () => this.startMonitoring()
        },
        { cancelable: false}
      );
    } 
  }
 
  getData = () => {
    Firebase.database()
      .ref('Event')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let eventItem = {...data};
 
        console.log('eventItem', eventItem);
        this.setState({
          events: eventItem,
          eventsKey: Object.keys(eventItem),
        });
      });
    };
 
  async componentDidMount() {
    await this.startMonitoring();
    this.getData();
  }

  //this.handleOnLongPress = this.handleOnLongPress.bind(this);
 
  handleOnLongPress(coordinate) {
      const { navigate } = this.props.navigation;
      navigate('AddEvent2', {lat: coordinate.latitude, long: coordinate.longitude});
  }
  onRegionChange = (region) => {
      this.setState({ region });
  }
 
  render() {
    const {events, eventsKey} = this.state;
    return (
      <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={styles.mapStyle}
            region={this.state.region}
            followUserLocation={true}
            onRegionChange={this.onRegionChange}
            onLongPress={(event) => this.handleOnLongPress(event.nativeEvent.coordinate)}
          >
          {console.log(events, eventsKey)}
          {Object.keys(events).length > 0 ? (
                    Object.keys(events).map((key) => (
                    <Marker
                        coordinate={{
                            latitude: parseFloat(JSON.parse(events[key].koordinat).latitude),
                            longitude: parseFloat(JSON.parse(events[key].koordinat).longitude)
                        }}
                        key={key}
                    />
                  ))
            ) : (
                <Marker
                  coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
                />
          )}
          </MapView>
      </View> 
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});