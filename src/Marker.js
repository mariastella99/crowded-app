// export async function getMarker(markerRetreived) {
//   var marker = [];

//   var snapshot = await firebase.database()
//     .collection('Events')
//     .orderBy('createdAt')
//     .get()

//   snapshot.forEach((doc) => {
//     const markerItem = doc.data();
//     markerItem.id = doc.id;
//     marker.push(markerItem);
//   });

//    markerRetreived(marker);
// }

// class FocusOnMarkers extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       marker: []
//     }
//   }

//   onMarkerReceived = (marker) => {
//     this.setState(prevState => ({
//       marker: prevState.marker = marker
//     }));
//   }
  
//   componentDidMount() {

//   getMarker(this.onMarkerReceived);

// }


// render() {
//   return (
//   <SafeAreaView style={styles.container}>
//     <FlatList style={styles.container}
//         data={this.state.marker}
//         renderItem={({ item }) => {
//           return (
//             <ListItem
//               containerStyle={styles.listItem}
//               title={`lat: ${item.geopoint.latitude}`}
//               subtitle={`lng: ${item.geopoint.longitude}`}
//               titleStyle={styles.titleStyle}
//               subtitleStyle={styles.subtitleStyle}
//               leftAvatar={{
//                 size: 'large',
//                 rounded: false,
//                 source: item.image && { uri: item.image }
//               }}
//               />
//           )
//           }
//           }
//         />
//     </SafeAreaView> 
//   )
//   }
// }

// render() {
//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <View style={{ flex: 1 }}>
//                     <MapView 
//                         provider={PROVIDER_GOOGLE} 
//                         mapType='hybrid'   
//                         showsUserLocation style={{flex: 1}}>
//                     {this.state.marker.map(item     => (
//                     <MapView.Marker        
//                         coordinate={{latitude: item.geopoint.latitude,                         
//                         longitude: item.geopoint.longitude}}
//                         title={("Test")}
//                         description={("Test")} 
//                     /> 
//                     )}
//                     </MapView>
//                 </View>
//             </SafeAreaView>
//         );
//     }
// }