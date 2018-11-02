import React, { Component } from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';

import SplashScreen from './SplashScreen';
import RegisterScreen from './RegisterScreen';

import HomeScreen from './HomeScreen';
import DomesticScreen from './DomesticScreen';
import DomesticResultsScreen from './DomesticResultsScreen';
import PumpScreen from './PumpScreen';
import PumpResultScreen from './PumpResultScreen'

import ContactScreen from './ContactScreen';
import AboutScreen from './AboutScreen';

import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';

const HomeNavigator = createStackNavigator({
  HomeScreen: HomeScreen,
  DomesticScreen: DomesticScreen,
  DomesticResultsScreen: DomesticResultsScreen,
  PumpScreen: PumpScreen,
  PumpResultScreen: PumpResultScreen
}, {
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    drawerLabel: 'Acceuil',
    headerStyle: {
      backgroundColor: colors.primaryColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
})

const AboutNavigator = createStackNavigator({
  AboutScreen: AboutScreen,
})

const ContactNavigator = createStackNavigator({
  ContactScreen: ContactScreen
})

const CustomDrawerComponent = (props) => (
  <ScrollView style={{flex: 1}}>
    <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: 200, height: 150}}>
        <Image
          source={require('../assets/img/logo.png')}
          style={{flex: 1, width: '100%', resizeMode: 'contain'}}
        />
      </View>
    </View>
    <DrawerItems {...props}/>
  </ScrollView>
)

const DrawerScreens = createDrawerNavigator({
  Home: HomeNavigator,
  About: AboutNavigator,
  Contact: ContactNavigator,
}, {
  initialRouteName: 'Home',
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: colors.primaryColor
  }
})

export const MainScreen = createStackNavigator({
  SplashScreen: SplashScreen,
  RegisterScreen: RegisterScreen,
  DrawerScreens: DrawerScreens,
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none',
}) 
