import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Sign from './Sign';
import Error from './Error';
import Success from './Success';
import Preloader from '../Preloader/Preloader';
import { theme } from '../../theme/theme';

const Main = (props) => {
    return (
        <SafeAreaView 
            style={s.container}
            activeOpacity={0.8}
        >   
            {props.loading ? <Preloader /> : null}
            {props.error && <Error />}
            {props.info && <Success />}
            {!props.info && !props.error && <Sign />}
        </SafeAreaView>
    )
}

Main.navigationOptions = {
    headerTitle: 'Бит.Мед'
}

const s = StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        flex: 1,
        alignItems: 'center',
    }
})

let mapStateToProps = (state) => ({
    error: state.main.error,
    loading: state.main.loading,
    info: state.main.info
})

export default connect(mapStateToProps, {})(Main);