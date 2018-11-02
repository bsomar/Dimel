import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';

import { Icon } from 'react-native-elements';
import { colors } from '../styles/Colors';

class AboutScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'À propos',
      drawerIcon: () => (
        <Icon name='home' type='feather'/>
      ),
      headerStyle: {
        backgroundColor: colors.primaryColor,
      },
      headerTintColor: '#fff',
      headerLeft: (
        <View
          style={{margin: 13}}
        >
          <TouchableOpacity
            style={{padding: 3}}
            onPress={navigation.getParam('openDrawer')}
          >
            <Icon 
              type='feather'
              name='menu'
              size={24}
              color='white'
            />
          </TouchableOpacity>
            
        </View>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ openDrawer: this._openDrawer });
  }

  _openDrawer = () => {
    this.props.navigation.openDrawer();
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground style={styles.container}
        source={require('../assets/img/BG.png')}
      >
        <StatusBar
          hidden={false}
        />
        <Text style={styles.title}> App Infos</Text>
        <View style={{width: '80%', alignItems: 'center'}}>
          <Text style={styles.text}>DimelApp est une application pour calculer et mésurer les configutations et l'installation
            des panneaux sollaires dans vos habitas.
            Cette application est développée par Dimel Solaire  </Text>
          <Text>Version 1.0.0 - Beta </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  text: {
    marginBottom: 20,
  }
})

export default AboutScreen;
