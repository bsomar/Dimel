import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PumpResult from '../components/pump/PumpResult';

class PumpResultScreen extends Component {
  static navigationOptions = {
    title: 'Résultats - Pompage Solaire',
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <PumpResult/>
    );
  }
}

export default PumpResultScreen;
