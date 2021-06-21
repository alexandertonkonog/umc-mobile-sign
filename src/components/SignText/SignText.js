import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

const SignText = (props) => {
   
    return (
        <View style={s.wrapper} width={props.width}>
            <View style={s.hrWrapper}>
                <View style={s.hr}></View>
                <Text style={[s.text, s.highText]}>или</Text>
            </View>
            <Text style={s.text}>вы можете оставить заявку для записи на ближайшее время, оператор свяжется с вами для уточнения удобной даты и времени, в этом случае ввод врача и времени приема необязателен</Text>
        </View>
    )
}

const s = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    text: {
        fontFamily: 'roboto-light',
        color: theme.usualText,
        textAlign: 'center'
    },
    highText: {
        marginTop: -18,
        backgroundColor: theme.backgroundColor,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    hr: {
        width: '50%',
        height: 2,
        backgroundColor: theme.usualText
    },
    hrWrapper: {
        alignItems: 'center',
    }
})


export default SignText;