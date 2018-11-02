import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';

import { Icon } from 'react-native-elements';
import { colors } from '../../styles/Colors';

export default class DomesticElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      quantity: 0,
      watt: 0,
      duration: 0,
      whDay: 'Wh/J',
      pt: 0,
      title: 'Lampes'
    }

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {

    let state = {
      id,
      quantity,
      watt,
      duration,
      whDay,
    } = this.state;

    let data = [{
      value: 'Lampes'
    }, {
      value: 'Réfrigirateur'
    }, {
      value: 'Télé + Démo'
    }, {
      value: 'Ordinateur'
    }, {
      value: 'Impriment'
    }, {
      value: 'Micro onde'
    }, {
      value: 'Radio-réveil'
    }, {
      value: 'Machine à laver'
    }, {
      value: 'Ventilateur'
    }, {
      value: 'Autre'
    }]

    return (
      <Animatable.View 
        animation="zoomIn" easing="ease-in-out-back" iterationCount={1}
        duration={255} delay={0}
        style={styles.container}
      >
        <View style={styles.topContainer}>
          <View style={{flex: 5}}>
            <Dropdown
              label=''
              labelHeight={0}
              value={this.state.title}
              data={data}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={[styles.textInputContainer, {flex: 1}]}>
            <TextField
              placeholder='Qte'
              label=''
              maxLength={2}
              labelHeight={0}
              inputContainerStyle={styles.inputContainerStyle}
              tintColor={colors.primaryColor}
              keyboardType='numeric'
              blurOnSubmit={false}
              onChangeText={(text) => {
                quantity = text;
                whDay = quantity*watt*duration;
                pt = quantity*watt;
                this.setState({
                  quantity: quantity,
                  whDay: whDay,
                  pt: pt,
                })
              }}
              ref={input => {
                this.inputs['quantity'] = input;
              }}
              onSubmitEditing={() => {
                this.props.saveDomesticElement(state);
                this.focusNextField('watt');
              }}
              returnKeyType={ "next" }
            />
          </View>
          <View style={[styles.textInputContainer, {flex: 1}]}>
            <TextField
              placeholder='Watt'
              label=''
              maxLength={4}
              labelHeight={0}
              inputContainerStyle={styles.inputContainerStyle}
              tintColor={colors.primaryColor}
              keyboardType='numeric'
              blurOnSubmit={false}
              onChangeText={(text) => {
                watt = text;
                whDay = quantity*watt*duration;
                pt = quantity*watt;
                this.setState({
                  watt: watt,
                  whDay: whDay,
                  pt: pt,
                })
              }}
              ref={input => {
                this.inputs['watt'] = input;
              }}
              onSubmitEditing={() => {
                this.props.saveDomesticElement(state);
                this.focusNextField('duration');
              }}
              returnKeyType={ "next" }
            />
          </View>
          <View style={[styles.textInputContainer, {flex: 1}]}>
            <TextField
            placeholder='Hr/J'
              label=''
              maxLength={2}
              labelHeight={0}
              inputContainerStyle={styles.inputContainerStyle}
              tintColor={colors.primaryColor}
              keyboardType='numeric'
              blurOnSubmit={true}
              onChangeText={(text) => {
                duration = text;
                whDay = quantity*watt*duration;
                pt = quantity*watt;
                this.setState({
                  duration: duration,
                  whDay: whDay,
                  pt: pt,
                })
              }}
              ref={input => {
                this.inputs['duration'] = input;
              }}
              onSubmitEditing={() => {
                this.props.saveDomesticElement(state);
              }}
              returnKeyType={ "done" }
            />
          </View> 
          <View style={[styles.textContainer, {flex: 1, alignItems: 'flex-end'}]}>
              <Text>{whDay}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => {
              this.props.deleteDomesticElement(state)
            }}
            style={styles.button}
          >
            <Icon
              name='trash-2'
              type='feather'
              color={colors.primaryColor}
              size={16}
            />
            <Text style={styles.textButton}>SUPPRIMER</Text>
          </TouchableOpacity>
        </View>
        
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderRadius: 4, 
    borderColor: '#ddd',
    elevation: 1,
  },

  topContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  buttonContainer: {
    alignItems: 'flex-start'
  },

  button: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textButton: {
    color: colors.primaryColor,
    fontWeight: '500',
    marginLeft: 5
  },

  listCategory: {
    height: 30,
  },

  categoryItem: {
    fontSize: 12,
  },

  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
  },

  textInputContainer: {
    paddingHorizontal: 3,
  },

  inputContainerStyle: {
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 3,
  },

  textContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
