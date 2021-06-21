import React from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import { AntDesign } from '@expo/vector-icons';

const Field = (props) => {
    return (
        <View style={{
                ...s.wrapper, 
                width: props.width,
                paddingBottom: props.open === props.item.id ? 20 : null
            }}
        >
            <TouchableOpacity 
                onPress={() => { 
                    props.setOpen(props.item.id);
                }}
                style={
                    props.open === props.item.id 
                    ? {
                        ...s.title,
                        ...s.titleOpen
                    }
                    : s.title}
            >
                <Text 
                    style={
                        props.send[props.item.name]
                            ? {...s.textChanged, width: props.textWidth}
                            : {...s.textTitle, width: props.textWidth}
                    }
                >
                    {
                        props.send[props.item.name]
                            ? 
                                (typeof props.send[props.item.name] === 'object'
                                    ? props.send[props.item.name].name
                                    : props.send[props.item.name]
                                )
                            : props.item.title
                    }
                </Text>
                <AntDesign size={16} name="down" style={{flexShrink: 0}} color={theme.usualText} />
            </TouchableOpacity>
            {props.open === props.item.id 
                && <FlatList
                    data={props.data[props.item.name]}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    props.selectCallback(item);
                                    props.setChangedField(props.item, item);
                                    props.setOpen(props.item.id);
                                }} 
                                style={s.item}
                            >
                                <Text style={s.text}>{item.name}</Text>
                            </TouchableOpacity> 
                        )              
                    }}
                    keyExtractor={(item) => item.id.toString()}
            />}
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        justifyContent: 'space-between'
    },
    wrapper: {
        backgroundColor: theme.inputColor,
        marginBottom: 20,
        borderRadius: 7,
        height: 'auto',
    },
    title: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    textChanged: {
        color: 'white',
    },
    text: {
        color: theme.usualText,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomColor: theme.usualText,
        borderBottomWidth: 1
    },
    textTitle: {
        color: theme.usualText,
        flexShrink: 0,
    },
    titleOpen: {
        borderBottomColor: theme.usualText,
        borderBottomWidth: 1,
    },
    open: {
        height: 'auto',
    }
})


export default Field;