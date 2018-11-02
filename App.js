import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DomesticScreen from './src/screens/DomesticScreen';
import DomesticResultsScreen from './src/screens/DomesticResultsScreen';
import { MainScreen  } from './src/screens/MainScreen';

import { colors } from './src/styles/Colors';

export default class App extends React.Component {
  render() {
    return (
      <MainScreen/>
    )
  }
}


/*
export default createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    App: App,
  },
  {
    initialRouteName: 'SplashScreen'
  }
)
*/
