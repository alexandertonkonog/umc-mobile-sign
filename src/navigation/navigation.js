import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from '../components/screens/Main';;
import {theme} from '../theme/theme';

const StackNavigator = createStackNavigator({
    Main: Main,    
}, {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: theme.backgroundColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: '#fff'
    }
});

export const Navigator = createAppContainer(StackNavigator);