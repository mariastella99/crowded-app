import React from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native'


const InputData = ({label, placeholder, isTextArea, onChangeText, namaState, value}) => {
    if(isTextArea) {
        return (
            <>
                <Text style={styles.label}>{label} :</Text>
                    <TextInput 
                    placeholder={placeholder} 
                    style={styles.texInputArea} 
                    multiline={true}
                    numberOfLines={5}
                    value={value}
                    onChangeText={(text) => onChangeText(namaState, text) }
                />
            </>
        )
    }
    return (
        <>
            <Text style={styles.label}>{label} :</Text>
                <TextInput 
                placeholder={placeholder} 
                style={styles.texInput} 
                value={value}
                onChangeText={(text) => onChangeText(namaState, text) }
                />
        </>
    )
}

export default InputData

const styles = StyleSheet.create({
    label : {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10
    },
    texInput: {
        borderWidth : 1,
        borderColor : 'gray',
        borderRadius: 5,
        padding: 10
    },
    texInputArea: {
        borderWidth : 1,
        borderColor : 'gray',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top'
    }
})
