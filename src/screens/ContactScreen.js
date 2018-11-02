import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, StatusBar, ImageBackground } from 'react-native';

import { Icon } from 'react-native-elements';
import { colors } from '../styles/Colors';

class ContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Contact',
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
        <View style={styles.infosContainer}>
          <TouchableOpacity 
            style={styles.infoContainer}
            onPress={() => {Linking.openURL('http://facebook.com/DimelSolaire.dz')}}
          >
            <Icon
              type='font-awesome'
              name='facebook-square'
              size={20}
            />
            
            <Text style={styles.infoText}>/DimelSolaire.dz</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoContainer}
            onPress={() => {Linking.openURL('http://dimel-dz.com')}}
          >
            <Icon
              type='font-awesome'
              name='globe'
              size={20}
            />
            <Text style={styles.infoText}>dimel-dz.com</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoContainer}
            onPress={() => {Linking.openURL('mailto:solaire@dimel-dz.com')}}
          >
            <Icon
              type='font-awesome'
              name='envelope'
              size={20}
            />
            <Text style={styles.infoText}>solaire@dimel-dz.com</Text>
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.infoContainer}
              onPress={() => {Linking.openURL('tel:0560957773')}}
            >
              <Icon
                type='font-awesome'
                name='phone'
                size={20}
              />
              <Text style={styles.infoText}>+213 560 957 773</Text> 
          </TouchableOpacity>
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
  logoContainer: {
    flex: 3,
    marginVertical: 40,
    width: 150,
  },
  infosContainer: {
    flex: 7,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20,
  }
})

export default ContactScreen;
