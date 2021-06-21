import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {theme} from '../../theme/theme';

const InfoText = (props) => {
    if (props.empty.type === 'sign') {
        return (
            <Text style={[s.container, {width: props.width}]} >
                Для записи на прием заполните обязательные поля {props.empty.list.join(', ')}
            </Text>
        )
    } else {
        return (
            <Text style={[s.container, {width: props.width}]} >
                Чтобы оставить заявку на запись, заполните обязательные поля {props.empty.list.join(', ')}
            </Text>
        )
    }
}

const s = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
        lineHeight: 23,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 7,
        marginBottom: 10
    }
})

export default InfoText;