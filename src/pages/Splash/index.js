import React, { useEffect} from 'react'
import { ImageBackground, StyleSheet, Image, Text, View } from 'react-native'
import { Logo1, SplashBackground } from '../../assets'


const Splash = ({ navigation }) => {
    
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('MainApp');
        }, 3000)
    }, [navigation]);

    return (
        <ImageBackground source={ SplashBackground } style={styles.background}>
            <Image source={ Logo1 } style={styles.logo1}/>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo1: {
        justifyContent: 'center'
    }
})
