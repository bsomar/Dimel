import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import NavBottom from './NavBottom'

import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { colors } from '../../styles/Colors';

export let pumpFields = {
  power: 0,
  powerOfPanel: 250
}

class PumpField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: 0,
      powerOfPanel: 250,
    };
  }

  render() {
    powerOfPanelData = [{
      value: '250'
    }, {
      value: '300'
    }]

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding" enabled
          style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
        <View style={styles.textFieldContainer}>
          <Text style={styles.title}>Puissance en chevaux (HP)</Text>
          <TextField
            placeholder=''
            label=''
            labelHeight={0}
            tintColor={colors.primaryColor}
            keyboardType='numeric'
            onChangeText={(value) => {
              this.setState({
                power: value
              }, function() {
                pumpFields.power = this.state.power
              })
            }}
          />
        </View>
        <View style={styles.textFieldContainer}>
          <Text style={styles.title}>Puissance de panneau choiser (W)</Text>
          <Dropdown
            label=''
            labelHeight={0}
            data={powerOfPanelData}
            value={this.state.powerOfPanel}
            onChangeText={(value) => {
              powerOfPanel = Number(value);
              this.setState({
                powerOfPanel: powerOfPanel,
              }, function() {
                pumpFields.powerOfPanel = this.state.powerOfPanel
              })
            }}
          />
        </View>
        <NavBottom
          text='Valider'
          containerStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFieldContainer: {
    width: '70%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    color: colors.primaryColor,
    fontSize: 16,
    marginBottom: 10,
  },
})

export default PumpField;
