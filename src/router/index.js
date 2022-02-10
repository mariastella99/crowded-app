import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, AddEvent, AddEvent2, DetailEvent, EditEvent, Maps, Splash } from '../pages'
import { BottomNavigator } from '../components/'
import { MapLocation } from '../location'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Maps" component={MapLocation} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} /> 
            <Stack.Screen name="MainApp" component={MainApp} options={{headerShown: false}} />
            <Stack.Screen name="AddEvent" component={AddEvent} options={{title: 'Add Event'}}/>
            <Stack.Screen name="DetailEvent" component={DetailEvent} options={{title: 'Detail Event'}}/>
            <Stack.Screen name="EditEvent" component={EditEvent} options={{title: 'Edit Event'}}/>
            <Stack.Screen name="MapLocation" component={MapLocation} />
            <Stack.Screen name="AddEvent2" component={AddEvent2} options={{title: 'Add Event'}}/>
            
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})
