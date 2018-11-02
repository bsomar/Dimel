import React, { Component } from 'react';
import { 
  StyleSheet,
  View, 
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import { TextField } from 'react-native-material-textfield';
import { colors } from '../styles/Colors';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCYz3zBY4e38DE9AC5draW4L7NcmZ58wWE",
  authDomain: "dimel-solaire.firebaseapp.com",
  databaseURL: "https://dimel-solaire.firebaseio.com",
  projectId: "dimel-solaire",
  storageBucket: "dimel-solaire.appspot.com",
};

firebase.initializeApp(firebaseConfig);

class RegisterScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '123456',
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  SignUpUser = (email, password) => {
    try {
      
      if(this.validateEmail(email)) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() =>this.props.navigation.navigate('DrawerScreens'))
          ;
      } else {
        alert('Email invalide !');
      }
      
    } catch (error) {
      
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: '80%'}}>
        <KeyboardAvoidingView
          behavior="padding" enabled
          style={{width: '100%'}}
        >
          <Image
            source={require('../assets/img/logo.png')}
            style={styles.logo}
          />
          <View style={styles.textFieldContainer}>
            <TextField
              placeholder=''
              label='Email'
              tintColor={colors.primaryColor}
              onChangeText={(email) => {
                this.setState({
                  email: email
                })
              }}
            />
            <Text style={styles.helperText}>On va vous envoyer la nouveauté de nos produits</Text>
          </View>
          <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => this.SignUpUser(this.state.email, this.state.password)}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
          
        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    marginBottom: 40,
    width: '100%',
    resizeMode: 'contain'
  },
  textFieldContainer: {
    width: '100%',
    marginBottom: 30,
  },
  helperText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.36)'
  },
  buttonContainer: {
    width: '100%',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  }
})

export default RegisterScreen;
