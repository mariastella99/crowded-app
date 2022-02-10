// //UPDATE LOCATION -> UKUR JARAK+ALERT
 
// //di bawah constructor ditambahin
//   watchID: ?number = null;
 
// //di startMonitoring hbs getCurrentLocation ditambahin
//       //onLocationChanged basically
//       this.watchID = Geolocation.watchPosition(
//         (newPosition) => {
//           //for every coordinates stored in database
//             var dis = getDistance(
//                 //latlng start
//                 //latlng dest
//             );
//             if (dis <= 100) {
//                 //do notifs and stufffs
//             }
//           //end for
//         },
//         (error) => Alert.alert('Error', JSON.stringify(error)),
//         {enableHighAccuracy: 'true', distanceFilter: 10},
//       );