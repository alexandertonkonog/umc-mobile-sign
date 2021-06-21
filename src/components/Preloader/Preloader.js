import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';

const Preloader = () => {

    return (
        <View style={s.preloader}>
            <ActivityIndicator color="white" />
        </View>
    )
}

const s = StyleSheet.create({
    preloader: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(30,30,30,0.7)'
    },
    image: {
        width: 100,
        height: 100,
    }
});

export default Preloader;