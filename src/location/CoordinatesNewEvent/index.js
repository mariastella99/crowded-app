//ADD NEW EVENT BY PRESSING
//Possible reference:
//https://reactnavigation.org/docs/params/
 
//dibagian MapView diganti:
{ <MapView
  provider={PROVIDER_GOOGLE}
  initialRegion={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  showsUserLocation={true}
  style={styles.mapStyle}
  onPress={(event) => {
    //ini nanti kalo user mencet mapnya, dia bakal ngembaliin koordinat
    //cara akses koordinat pake event.nativeEvent.coordinate
    //nah pokoknya gimana caranya pas onPress tu coordinate ini dibawa keluar dari tab maps dan
    //masuk ke tab add event (jadi user ga ngetik manual coordinatenya)
  }}
/>; }