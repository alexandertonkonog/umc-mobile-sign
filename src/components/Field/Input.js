import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { theme } from '../../theme/theme';

const Input = (props) => {
    return (
        <TextInput
            blurOnSubmit={true}
            placeholder={props.item.title}
            placeholderTextColor={theme.usualText} 
            selectionColor='#fff' 
            keyboardType={props.item.keyboardType}
            dataDetectorTypes={props.item.dataDetectorTypes}
            style={{...s.text, width: props.width}}
            value={props.send[props.item.name]}
            onChangeText={text => props.changeInputText(text, props.item)}
        />
    )
}

const s = StyleSheet.create({
    text: {
        color: '#fff',
        backgroundColor: theme.inputColor,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 7,
        marginBottom: 20,
    }
})


export default Input;