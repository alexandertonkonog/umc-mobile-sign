import axios from 'axios';
import {setState, timeArrays, checkFields, createPostObject} from '../functions/functions';

const SET_CHANGED = 'SET_CHANGED';
const SET_ERROR = 'SET_ERROR';
const SET_INFO = 'SET_INFO';
const CLEAR_SEND = 'CLEAR_SEND';
const GET_CLINIC = 'GET_CLINIC';
const ADD_ACTIVE_FIELD = 'ADD_ACTIVE_FIELD';
const REMOVE_ACTIVE_FIELD = 'REMOVE_ACTIVE_FIELD';
const GET_ALL_OTHER_DATA = 'GET_ALL_OTHER_DATA';
const AFTER_SPEC_CHANGES = 'AFTER_SPEC_CHANGES';
const AFTER_MEDIC_CHANGES = 'AFTER_MEDIC_CHANGES';
const CHANGE_TEXT_INPUT = 'CHANGE_TEXT_INPUT';
const SET_APP_LOADING = 'SET_APP_LOADING';
const SET_EMPTY_INFO = 'SET_EMPTY_INFO';

let initial = {
    fields: [
        {
            id: 1,
            title: 'Клиника',
            name: 'clinic',
            required: true,
        },
        {
            id: 2,
            title: 'Специализация',
            name: 'spec',
            required: true,
        },
        {
            id: 3,
            title: 'Врач',
            name: 'medic',
            required: 'sign',
        },
        {
            id: 4,
            title: 'Время приема',
            name: 'dateTime',
            required: 'sign',
        }
    ],
    send: {
        name: '',
        surname: '',
        number: '',
        address: '',
        comment: '',
        clinic: null,
        spec: null,
        medic: null,
        dateTime: null
    },
    data: {
        clinic: null,
        medic: null,
        spec: null,
        dateTime: null,
    },
    text: [
        {
            id: 1,
            title: 'Имя',
            name: 'name',
            dataDetectorTypes: 'none',
            keyboardType: 'default',
            required: true,
        },
        {
            id: 2,
            title: 'Фамилия',
            name: 'surname',
            required: true,
            keyboardType: 'default',
            dataDetectorTypes: 'none',
        },
        {
            id: 3,
            title: 'Телефон',
            required: true,
            name: 'number',
            keyboardType: 'phone-pad',
            dataDetectorTypes: 'phoneNumber',
        },
        {
            id: 4,
            title: 'Адрес',
            name: 'address',
            required: false,
            keyboardType: 'default',
            dataDetectorTypes: 'address',
        },
        {
            id: 5,
            title: 'Комментарий',
            name: 'comment',
            required: false,
            keyboardType: 'default',
            dataDetectorTypes: 'none',
        },
    ], 
    all: {
        clinic: null,
        medic: null,
        spec: null,
        time: null,
    },
    activeFields: [],
    error: false,
    loading: false,
    empty: null,
    info: false
}

const getShedule = async (clinic) => {
    let d = new Date();
    let string = ( d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":00");
    return await axios.get(`http://10.5.199.29/send.php?type=time&clinicId=${clinic.id}&startDate=${string}`);
}

const setShedule = (res, dispatch) => {
    if ('success' in res) {
        dispatch({type: SET_ERROR, data: true});
    } else {
        let need = setState(res);
        dispatch({type: GET_ALL_OTHER_DATA, ...need});
        dispatch({type: ADD_ACTIVE_FIELD, data: [2]});
    }
}

export const setChangedField = (item, data) => (dispatch) => {
    dispatch({type: SET_CHANGED, data, item});
    dispatch({type: SET_EMPTY_INFO, data: null});
    if (item.name === 'spec') {
        dispatch({type: AFTER_SPEC_CHANGES, item, data});
        dispatch({type: ADD_ACTIVE_FIELD, data: [3,4]});
        dispatch({type: CLEAR_SEND, data: ['dateTime', 'medic']});
    } else if (item.name === 'medic') {
        dispatch({type: CLEAR_SEND, data: ['dateTime']});
        dispatch({type: AFTER_MEDIC_CHANGES});
    } else if (item.name === 'dateTime') {
        dispatch({type: SET_CHANGED, data: data.medic, item: {name: 'medic'}});
    }
}

export const getClinic = () => async (dispatch) => {
    dispatch({type: REMOVE_ACTIVE_FIELD, data: [2,3,4]});
    dispatch({type: CLEAR_SEND, data: ['dateTime', 'medic', 'spec']});
    dispatch({type: SET_APP_LOADING});
    try {
        let res = await axios.get('http://10.5.199.29/send.php?type=clinic');
        dispatch({type: GET_CLINIC, data: res.data});
        dispatch({type: ADD_ACTIVE_FIELD, data: [1]}); 
    } catch (e) {
        dispatch({type: SET_ERROR, data: true});
    } finally {
        dispatch({type: SET_APP_LOADING});
    }
}

export const getAllOtherData = (clinic) => async (dispatch) => {
    dispatch({type: REMOVE_ACTIVE_FIELD, data: [2,3,4]});
    dispatch({type: SET_APP_LOADING});
    try {
        let result = await getShedule(clinic);
        setShedule(result.data, dispatch);
    } catch (e) {
        dispatch({type: SET_ERROR, data: true});
    } finally {
        dispatch({type: SET_APP_LOADING});
    }
}

export const addActiveField = (arr) => (dispatch) => {
    dispatch({type: ADD_ACTIVE_FIELD, data: arr});
}

export const changeInputText = (text, item) => (dispatch) => {
    dispatch({type: CHANGE_TEXT_INPUT, text, item});
    dispatch({type: SET_EMPTY_INFO, data: null});
}

export const setAppLoading = () => (dispatch) => {
    dispatch({type: SET_APP_LOADING})
}

export const sendData = (fields, texts, send, type) => async (dispatch) => {
    dispatch({type: SET_APP_LOADING});
    try {
        let res = checkFields(fields, texts, send, type);
        if (!res) {
            let obj = createPostObject(send, type);
            let res = await axios.post('http://10.5.199.29/send.php', obj);
            if (res.data.success) {
                dispatch({type: SET_INFO, data: type});
            } else {
                dispatch({type: SET_ERROR, data: true})
            }
        } else {
            let data = {
                list: res.flat().map(item => item.title),
                type
            };
            dispatch({type: SET_EMPTY_INFO, data});
        }
    } catch {
        dispatch({type: SET_ERROR, data: true});
    } finally {
        dispatch({type: SET_APP_LOADING});
    }
}

export const returnToSign = (type) => (dispatch) => { 
    if (type === 'info') {
        dispatch({type: CLEAR_SEND, data: ['clinic', 'spec', 'medic', 'dateTime']});
        dispatch({type: REMOVE_ACTIVE_FIELD, data: [2,3,4]});
        dispatch({type: SET_INFO, data: false});
    } else {
        dispatch({type: SET_ERROR, data: false});
    }
}

export const mainReducer = (state = initial, action) => {
    switch (action.type) {
        case SET_CHANGED: {
            return {
                ...state,
                send: {
                    ...state.send,
                    [action.item.name]: action.data
                }
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.data
            }
        }
        case CLEAR_SEND: {
            let obj = {...state.send};
            action.data.forEach(item => {
                obj[item] = null;
            });
            return {
                ...state,
                send: obj
            }
        }
        case SET_INFO: {
            return {
                ...state,
                info: action.data,
            }
        }
        case GET_CLINIC: {
            return {
                ...state,
                data: {
                    ...state.data,
                    clinic: action.data
                },
                all: {
                    ...state.all,
                    clinic: action.data
                }
            }
        }
        case ADD_ACTIVE_FIELD: {
            return {
                ...state,
                activeFields: [...state.activeFields, ...action.data]
            }
        }
        case REMOVE_ACTIVE_FIELD: {
            return {
                ...state,
                activeFields: state.activeFields.filter(item => !action.data.includes(item)),
                fields: state.fields.map(item => {
                    if (action.data.includes(item.id)) {
                        return {
                            ...item,
                            value: null
                        }
                    }
                    return item;
                })
            }
        }
        case GET_ALL_OTHER_DATA: {
            let time = timeArrays(action.medic);
            return {
                ...state,
                data: {
                    ...state.data,
                    medic: action.medic,
                    spec: action.spec,
                    dateTime: time,
                },
                all: {
                    ...state.all,
                    medic: action.medic,
                    spec: action.spec,
                    dateTime: time,
                }
            }
        }
        case AFTER_SPEC_CHANGES: {
            let medics = state.all.medic.filter(elem => elem.spec === state.send.spec.name);
            let need = timeArrays(medics);
            return {
                ...state,
                data: {
                    ...state.data,
                    dateTime: need,
                    medic: medics
                },
            }
        }
        case AFTER_MEDIC_CHANGES: {
            let time = state.all.dateTime.filter(elem => elem.medic.id === state.send.medic.id);
            return {
                ...state,
                data: {
                    ...state.data,
                    dateTime: time,
                },
            }
        }
        case CHANGE_TEXT_INPUT: {
            return {
                ...state,
                send: {
                    ...state.send,
                    [action.item.name]: action.text
                }
            }
        }
        case SET_APP_LOADING: {
            return {
                ...state,
                loading: !state.loading
            }
        }
        case SET_EMPTY_INFO: {
            return {
                ...state,
                empty: action.data,  
            }
        }
        default: {
            return state;
        }
    } 
}