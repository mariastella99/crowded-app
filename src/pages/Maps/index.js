import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MapLocation } from '../../location'

export default class Maps extends Component {
    render() {
    return (
            <MapLocation />
    )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor : '#fff'
    }
})
