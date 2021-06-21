import React, {useState} from 'react';
import {Navigator} from './src/navigation/navigation';
import { Provider } from 'react-redux';
import store from './src/redux/redux';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

let loadFont = async () => {
  await Font.loadAsync({
    'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
  })
}

const App = () => {

  let [load, setLoad] = useState(true);
  if (load) {
    return <AppLoading
      startAsync={loadFont}
      onError={err => console.log(err)}
      onFinish={() => setLoad(false)}
    />
  }
  
  return (
    <Provider store={store}> 
      <Navigator />
    </Provider>
  )

}

export default App;