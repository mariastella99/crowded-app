import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import Firebase from '../../config/Firebase'

// const getEvent = async() => {
//     var events = [];
//     var ref = await Firebase.database().ref('Event');
//     return new Promise (
//         function (resolve, reject) {
//         ref.then(function(snapshot) {
//         if (snapshot.val()!==null) {
//           var eventItem = snapshot.val();
//           eventItem.key = snapshot.key;
//           events.push(eventItem);
//           resolve(events);
//         } else {
//           reject('Database is null');
//         }
//       });
//     }
//     );
// }

// const GetEvent = new getEvent()
// export default GetEvent;

export default async function getEvent(eventRetreived) {
    var events = [];
    var snapshot = await Firebase.database()
    .ref('Event')
    .child('koordinat')
    .get()
        
        snapshot.forEach((doc) => {
          const eventItem = doc.data();
          eventItem.id = doc.id;
          events.push(eventItem);
        });

        eventRetreived(events);
}

// export default async function getMarker(markerRetreived) {
//   var marker =[];

//   var snapshot = await Firebase.database()
//     .ref('Event')
//     .get()
  
//   return (
//   function() {
//   snapshot.then(function(doc) {
//   snapshot.forEach((doc) => {
//     const markerItem = doc.data();
//     markerItem.id = doc.id;
//     marker.push(markerItem);
//   });
//   });
//   })

//   markerRetreived(marker);

// }

// class GetData extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       events: {},
//       eventssKey: [],
//     };
//   }

//   getData() {
//     Firebase.database()
//       .ref('Event')
//       .once('value', (querySnapShot) => {
//         let data = querySnapShot.val() ? querySnapShot.val() : {};
//         let eventItem = {...data};

//         this.setState({
//           events: eventItem,
//           eventsKey: Object.keys(eventItem),
//         });
//       });
//   };

// }

// const getdata = new GetData();
// export default getdata;