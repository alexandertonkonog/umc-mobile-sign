import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { theme } from '../../theme/theme';
import { returnToSign } from '../../redux/mainReducer';

const Error = (props) => {
    return (
        <ScrollView contentContainerStyle={s.container}>
            <AntDesign name="exclamationcircleo" size={200} color="white" />
            <Text style={[s.text, s.title]}>Что-то пошло не так!</Text>
            <Text style={[s.text]}>Попробуйте перезагрузить приложение или зайдите позднее!</Text>
            <TouchableOpacity
                onPress={() => props.returnToSign('error')}
                style={s.button}
                activeOpacity={0.8}
            >
                <Text style={[s.buttonText]}>Вернуться назад</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        color: 'white',
        marginTop: 20,
        textAlign: "center",
        lineHeight: 22
    },
    title: {
        fontSize: 22,
    },
    button: {
        marginTop: 30,
        padding: 20,
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
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: "center"
    }
})

let mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {returnToSign})(Error);