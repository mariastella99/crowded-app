import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { WARNA_UTAMA, WARNA_DISABLE } from '../../utils/constant'
import Icons from 'react-native-vector-icons/Ionicons';

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
      const Icon = () => {
        let iconName;
        if(label === "Home") {
        iconName = isFocused ? 'ios-home' : 'ios-home-outline' ;
        } else if(label === "Maps") {
        iconName = isFocused ? 'ios-map' : 'ios-map-outline' ;
        }
        return (
          <Icons 
              size={24}
              name={iconName}
              style={styles.color(isFocused)}
          />
        )
      }
          return (
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.container}>
            <Icon />
            <Text style={styles.text(isFocused)}>{label}</Text>
            </TouchableOpacity> 
          )
}

export default TabItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  color: (isFocused) => ({
    color: isFocused ? WARNA_UTAMA : WARNA_DISABLE, 
  }),
  text: (isFocused) => ({
    fontSize: 11,
    color: isFocused ? WARNA_UTAMA : WARNA_DISABLE,
    marginTop: 1
  })
});
