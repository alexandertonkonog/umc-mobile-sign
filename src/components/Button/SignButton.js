import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform, Text } from 'react-native';
import { theme } from '../../theme/theme';

const SignButton = (props) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <Wrapper style={s.wrapper} onPress={props.item.callback}>
            <View style={{...s.button, width: props.width}}>
                <Text style={s.text}>{props.item.title}</Text>
            </View>
        </Wrapper>
    )
}

const s = StyleSheet.create({
    wrapper: {
        borderRadius: 30,
        
    },
    button: {
        marginTop: 10,
        paddingVertical: 15,
        backgroundColor: theme.buttonColor,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 40
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'roboto-light',
        textAlign: 'center',
    }
})


export default SignButton;