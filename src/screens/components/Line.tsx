import React from 'react';
import { View, StyleSheet } from 'react-native';


export default function Line(){
    return(
        <View style={styles.lineStyle}></View>
    )
}

const styles = StyleSheet.create({
    lineStyle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1.5,
        marginVertical: 10,
        width: '90%'
    }
})
