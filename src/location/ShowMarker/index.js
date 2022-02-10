// //SHOW MARKER FROM DB
// //referensi:
// //https://www.youtube.com/watch?v=4qq0GQPkfjI&t=673s
 
// //bikin store
// import {observable, action} from 'mobx';
// import axios from 'axios';
 
// let UrlMap = '______';
 
// class AppStore {
//   apiMap = axios.create({UrlMap});
 
//   @observable features = [];
 
//   constructor() {
//     this.apiMap.get().then(({data}) => {
//       this.features = data.features;
//     });
//   }
// }
 
// //show marker on map
// //di MapView ditambah
//             <MapView>
//                 {this.props.store.features.map((feature,index) => <Marker
//                     key={index}
//                     coordinate={{
//                         latitude:,
//                         longitude:
//                     }}
//                 >
//                     <Callout>
//                         //Details for each events
//                     </Callout>
//                 </Marker>)}
//             </MapView>