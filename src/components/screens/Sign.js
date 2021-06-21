import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import Field from '../Field/Field';
import Input from '../Field/Input';
import SignButton from '../Button/SignButton';
import SignText from '../SignText/SignText';
import InfoText from '../InfoText/InfoText';
import {
    setChangedField, 
    getClinic, 
    getAllOtherData, 
    changeInputText,
    sendData
} from '../../redux/mainReducer';
import {filterArray} from '../../functions/functions';

const Sign = (props) => {
    
    useEffect(() => {
        if (!props.data.clinic) {
            props.getClinic();
        }
    }, [])

    useEffect(() => {
        let updateWidth = () => {
            setWidth(Dimensions.get('window').width - 50);
            setTextWidth(Dimensions.get('window').width - 100);
            setMobileWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change', updateWidth);
        return () => Dimensions.removeEventListener('change', updateWidth);
    }, [])
    
    let [mobileWidth, setMobileWidth] = useState(Dimensions.get('window').width);
    let [width, setWidth] = useState(Dimensions.get('window').width - 50);
    let [textWidth, setTextWidth] = useState(Dimensions.get('window').width - 100);
    let [open, setOpen] = useState(null);
    let buttons = [
        {
            id: 1,
            title: 'ЗАПИСАТЬСЯ НА ПРИЕМ',
            callback: () => props.sendData(props.fields, props.text, props.send, 'sign')
        },
        {
            id: 2,
            title: 'ОСТАВИТЬ ЗАЯВКУ',
            callback: () => props.sendData(props.fields, props.text, props.send, 'call')
        }
    ]

    let fields = filterArray(props.fields, props.active);
    
    let selectCallback = (item) => {
        if (item.name === 'clinic') return props.getAllOtherData;
        else return () => {};
    }

    let setOpenOnTitle = (id) => {
        id === open ? setOpen(null) : setOpen(id);
    }
    debugger
    return (
        <ScrollView contentContainerStyle={[s.container, {width: mobileWidth}]}>
            {fields.map(item => (
                <Field
                    key={item.id.toString()}
                    width={width}
                    textWidth={textWidth}
                    data={props.data} 
                    open={open}
                    setOpen={setOpenOnTitle}
                    item={item}
                    send={props.send}
                    setChangedField={props.setChangedField}
                    selectCallback={selectCallback(item)}
                />
            ))}
            {props.text.map(item => (
                <Input
                    key={item.id.toString()}
                    item={item}
                    width={width}
                    send={props.send}
                    changeInputText={props.changeInputText}
                />
            ))}
            {props.empty 
                && <InfoText 
                        empty={props.empty}
                        width={width} 
                    />
            }
            <SignButton 
                width={width}
                item={buttons[0]}
            />
            <SignText width={width} />
            <SignButton 
                width={width}
                item={buttons[1]}
            />
        </ScrollView>
    )
}

const s = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: 'center'
    }
})

let mapStateToProps = (state) => ({
    fields: state.main.fields,
    data: state.main.data,
    active: state.main.activeFields,
    text: state.main.text,
    send: state.main.send,
    empty: state.main.empty
})

export default connect(
    mapStateToProps, {
        setChangedField, 
        getClinic, 
        getAllOtherData,
        changeInputText,
        sendData})(Sign);