import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import { returnToSign } from '../../redux/mainReducer';

const Success = (props) => {

    return (
        <ScrollView contentContainerStyle={s.container}>
            <AntDesign name="checkcircleo" size={200} color="white" />
            <Text style={[s.text, s.title]}>Заявка отправлена!</Text>
            {props.info === 'sign'
                ?   <Text style={[s.text]}>
                        {props.send.name} {props.send.surname} записан (а) на прием к доктору {props.send.medic.name} на {props.send.dateTime.time}
                    </Text>
                :   <Text style={[s.text]}>
                        Вам перезвонят в ближайшее время
                    </Text>
            }
            <TouchableOpacity 
                style={s.button}
                activeOpacity={0.8}
                onPress={() => props.returnToSign('info')}
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
    send: state.main.send,
    info: state.main.info
})

export default connect(mapStateToProps, {returnToSign})(Success);